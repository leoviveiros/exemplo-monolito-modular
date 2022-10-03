import Invoice from '../../domain/invoice.entity';
import GenerateInvoiceUseCase from './generate-invoice.usecase';

describe('generate invoice usecase test', () => {

    it('should generate an invoice', async () => {
        const invoice = new Invoice({
            id: '1',
            name: 'Client 1',
            document: '123456789',
            address: {
                street: 'Street 1',
                number: 123,
                complement: 'Complement 1',
                city: 'City 1',
                state: 'State 1',
                zipCode: '12345678'
            },
            items: [
                { id: '1', name: 'Product 1', price: 100 },
                { id: '2', name: 'Product 2', price: 200 }
            ]
        });

        const MockRepository = () => {
            return {
                generate: jest.fn().mockResolvedValue(invoice),
                find: jest.fn()
            };
        }

        const invoiceRepository = MockRepository();

        const usecase = new GenerateInvoiceUseCase(invoiceRepository);

        const input = {
            name: 'Client 1',
            document: '123456789',
            street: 'Street 1',
            number: 123,
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345678',
            items: [ 
                { id: '1', name: 'Product 1', price: 100 },
                { id: '2', name: 'Product 2', price: 200 }
            ]
        };

        const output = await usecase.execute(input);

        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe('Client 1');
        expect(output.document).toBe('123456789');
        expect(output.street).toBe('Street 1');
        expect(output.number).toBe(123);
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

});