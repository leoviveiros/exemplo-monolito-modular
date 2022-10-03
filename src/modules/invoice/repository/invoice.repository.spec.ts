import { Sequelize } from 'sequelize-typescript';
import Invoice from '../domain/invoice.entity';
import InvoiceProductModel from './invoice-product.model';
import InvoiceModel from './invoice.model';
import InvoiceRepository from './invoice.repository';
import ProductModel from './product.model';

describe('invoice repository test', () => {

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

    it('shoud find an invoice', async () => {
        const invoiceRepository = new InvoiceRepository();

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
            items: [ { invoiceId: '1', productId: '1', price: 100, } ]
        });

        InvoiceProductModel.create({
            invoiceId: '1',
            productId: '1',
            price: 100
        });

        const invoice = await invoiceRepository.find('1');

        expect(invoice).toBeDefined();
        expect(invoice.id.id).toBe('1');
        expect(invoice.name).toBe('Client 1');
        expect(invoice.document).toBe('12345678901');

        expect(invoice.address.street).toBe('Street 1');
        expect(invoice.address.number).toBe(1);
        expect(invoice.address.complement).toBe('Complement 1');
        expect(invoice.address.city).toBe('City 1');
        expect(invoice.address.state).toBe('State 1');
        expect(invoice.address.zipCode).toBe('12345678');        
        
        expect(invoice.items.length).toBe(1);
        expect(invoice.items[0].id.id).toBe('1');
        expect(invoice.items[0].name).toBe('Product 1');
        expect(invoice.items[0].price).toBe(100);
    });

    it('shoud create an invoice', async () => {
        const invoiceRepository = new InvoiceRepository();

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

        const invoice = new Invoice({
            id: '1',
            name: 'Client 1',
            document: '12345678901',
            address: {
                street: 'Street 1',
                number: 1,
                complement: 'Complement 1',
                city: 'City 1',
                state: 'State 1',
                zipCode: '12345678'
            },
            items: [
                { id: '1', name: 'Product 1', price: 100 },
                { id: '2', name: 'Product 2', price: 200 }
            ]
        })

        await invoiceRepository.generate(invoice);

        const createdInvoice = await invoiceRepository.find(invoice.id.id);

        expect(createdInvoice).toBeDefined();
        expect(createdInvoice.id.id).toBe('1');
        expect(createdInvoice.name).toBe('Client 1');
        expect(createdInvoice.document).toBe('12345678901');

        expect(createdInvoice.address.street).toBe('Street 1');
        expect(createdInvoice.address.number).toBe(1);
        expect(createdInvoice.address.complement).toBe('Complement 1');
        expect(createdInvoice.address.city).toBe('City 1');
        expect(createdInvoice.address.state).toBe('State 1');
        expect(createdInvoice.address.zipCode).toBe('12345678');
        
        expect(createdInvoice.items.length).toBe(2);

        expect(createdInvoice.items[0].id.id).toBe('1');
        expect(createdInvoice.items[0].name).toBe('Product 1');
        expect(createdInvoice.items[0].price).toBe(100);

        expect(createdInvoice.items[1].id.id).toBe('2');
        expect(createdInvoice.items[1].name).toBe('Product 2');
        expect(createdInvoice.items[1].price).toBe(200);
    });

});