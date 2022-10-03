import UseCaseInterface from '@shared/usecase/usecase.interface';
import ClientAdmFacadeInterface from '../../../client-adm/facade/client-adm.facade.interface';
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-adm.facade.interface';
import Id from '../../../shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface';
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place-order.dto';
import Client from '../../domain/client.entity';
import Order from '../../domain/order.entity';
import CheckoutGateway from '../../gateway/checkout.gateway';
import PaymentFacadeInterface from '../../../payment/facade/payment.facade.interface';
import InvoiceFacadeInterface from '../../../invoice/facade/invoice.facade.interface';

type PlaceOrderUseCaseProps = {
    catalogFacade: StoreCatalogFacadeInterface,
    clientFacade: ClientAdmFacadeInterface,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    repository: CheckoutGateway,
}

export default class PlaceOrderUseCase implements UseCaseInterface<PlaceOrderInputDto, PlaceOrderOutputDto> {

    private _catalogFacade: StoreCatalogFacadeInterface;
    private _clientFacade: ClientAdmFacadeInterface;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _repository: CheckoutGateway;

    constructor(props: PlaceOrderUseCaseProps) {
        this._catalogFacade = props.catalogFacade;
        this._clientFacade = props.clientFacade;
        this._invoiceFacade = props.invoiceFacade;
        this._paymentFacade = props.paymentFacade;
        this._productFacade = props.productFacade;
        this._repository = props.repository;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        // buscar cliente
        const clientDto = await this._clientFacade.find({ id: input.clientId });

        if (!clientDto) {
            throw new Error('Client not found');
        }

        await this.validateProducts(input);

        const products = await Promise.all(input.products.map(item => this.getProduct(item.productId)));

        const client = new Client({
            id: new Id(clientDto.id),
            name: clientDto.name,
            address: clientDto.address,
            email: clientDto.email
        })

        const order = new Order({
            client: client,
            products: products, 
        })
        
        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total
        });

        let invoice = null;

        if (payment.status === 'approved') {
            invoice = await this._invoiceFacade.generate({
                name: client.name,
                address: client.address,
                items: products.map(prod => ({
                    id: prod.id.id,
                    name: prod.name,
                    price: prod.salesPrice
                }))
            });

            order.approved();
        }

        await this._repository.addOrder(order);

        return {
            id: order.id.id,
            invoiceId: invoice ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map(prod => ({ productId: prod.id.id }))
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected");
        }

        for (const item of input.products) {
            const product = await this._productFacade.checkStock({
                productId: item.productId
            });

            if (product.stock <= 0) {
                throw new Error(`Product ${item.productId} is not available in stock`);
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.find({ id: productId });

        if (!product) {
            throw new Error('Product not found');
        }

        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }

        return new Product(productProps);
    }

}