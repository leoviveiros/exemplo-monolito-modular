import { Sequelize } from 'sequelize-typescript';
import Invoice from '../domain/invoice.entity';
import InvoiceFactory from '../factory/invoice.factory';
import InvoiceProductModel from '../repository/invoice-product.model';
import InvoiceModel from '../repository/invoice.model';
import ProductModel from '../repository/product.model';

describe('invoice facade tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([
            InvoiceModel,
            InvoiceProductModel,
            ProductModel
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it('should create invoice',  async () => {
        ProductModel.create({
            id: '1',
            name: 'Product 1',
            price: 100
        });

        ProductModel.create({
            id: '2',
            name: 'Product 2',
            price: 200
        });

        const invoiceFacade = InvoiceFactory.create();

        const input = {
            name: 'Client 1',
            document: '12345678901',
            street: 'Street 1',
            number: 1,
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345678',
            items: [
                { id: '1', name: 'Product 1', price: 100 },
                { id: '2', name: 'Product 2', price: 200 }
            ]
        };

        const output = await invoiceFacade.generate(input);

        expect(output.id).toBeDefined();
        expect(output.name).toBe('Client 1');
        expect(output.document).toBe('12345678901');
        expect(output.street).toBe('Street 1');
        expect(output.number).toBe(1);
        expect(output.complement).toBe('Complement 1');
        expect(output.city).toBe('City 1');
        expect(output.state).toBe('State 1');
        expect(output.zipCode).toBe('12345678');

        expect(output.items.length).toBe(2);
        expect(output.items[0].id).toBe('1');
        expect(output.items[0].name).toBe('Product 1');
        expect(output.items[0].price).toBe(100);

        expect(output.items[1].id).toBe('2');
        expect(output.items[1].name).toBe('Product 2');
        expect(output.items[1].price).toBe(200);

        expect(output.total).toBe(300);
    });
    
    it('should find invoice', async () => {
        ProductModel.create({
            id: '1',
            name: 'Product 1',
            price: 100
        });

        InvoiceModel.create({
            id: '1',
            name: 'Client 1',
            document: '12345678901',
            street: 'Street 1',
            number: 1,
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345678',
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [{ invoiceId: '1', productId: '1', price: 100, }]
        });

        InvoiceProductModel.create({
            invoiceId: '1',
            productId: '1',
            price: 100
        });

        const invoiceFacade = InvoiceFactory.create();

        const invoice = await invoiceFacade.find({ id: '1' });

        expect(invoice).toBeDefined();
        expect(invoice.id).toBe('1');
        expect(invoice.name).toBe('Client 1');
        expect(invoice.document).toBe('12345678901');

        expect(invoice.address.street).toBe('Street 1');
        expect(invoice.address.number).toBe(1);
        expect(invoice.address.complement).toBe('Complement 1');
        expect(invoice.address.city).toBe('City 1');
        expect(invoice.address.state).toBe('State 1');
        expect(invoice.address.zipCode).toBe('12345678');

        expect(invoice.items.length).toBe(1);
        expect(invoice.items[0].id).toBe('1');
        expect(invoice.items[0].name).toBe('Product 1');
        expect(invoice.items[0].price).toBe(100);
    });
    
});