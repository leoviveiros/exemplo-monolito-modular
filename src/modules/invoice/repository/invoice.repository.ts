import Invoice from '../domain/invoice.entity';
import InvoiceGateway from '../gateway/invoice.gateway';
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

}