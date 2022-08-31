import UseCaseInterface from '@shared/usecase/usecase.interface';
import ClientAdmFacadeInterface from '../../../client-adm/facade/client-adm.facade.interface';
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-adm.facade.interface';
import Id from '../../../shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface';
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place-order.dto';
import Client from '../../domain/client.entity';
import Order from '../../domain/order.entity';

type PlaceOrderUseCaseProps = {
    catalogFacade: StoreCatalogFacadeInterface,
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface
}

export default class PlaceOrderUseCase implements UseCaseInterface<PlaceOrderInputDto, PlaceOrderOutputDto> {

    private _catalogFacade: StoreCatalogFacadeInterface;
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;

    constructor(props: PlaceOrderUseCaseProps) {
        this._catalogFacade = props.catalogFacade;
        this._clientFacade = props.clientFacade;
        this._productFacade = props.productFacade;
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
        
        // criar order
        // processar pagamento

        // caso seja aprovado, gerar invoice
        // mudar status da order para approved
        // retornar dto

        throw new Error('Method not implemented.');
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