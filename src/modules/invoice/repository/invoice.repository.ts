import Invoice from '../domain/invoice.entity';
import InvoiceGateway from '../gateway/invoice.gateway';
import InvoiceProductModel from './invoice-product.model';
import InvoiceModel from './invoice.model';
import ProductModel from './product.model';

export default class InvoiceRepository implements InvoiceGateway {

    public async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ where: { id }, include: [ProductModel] });

        if (!invoice) {
            throw new Error('Invoice not found');
        }

        return new Invoice({
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode
            },
            items: invoice.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.InvoiceProductModel.price
            })),
        });
    }

    public async generate(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            createdAt: new Date(),
            updatedAt: new Date(),            
        });        

        invoice.items.forEach(async item => {
            await InvoiceProductModel.create({
                invoiceId: invoice.id.id,
                productId: item.id.id,
                price: item.price
            });
        });
    }
}