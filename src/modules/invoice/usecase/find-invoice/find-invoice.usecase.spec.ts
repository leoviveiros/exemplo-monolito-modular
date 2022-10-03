import Invoice from '../../domain/invoice.entity';
import FindInvoiceUseCase from './find-invoice.usecase';

describe('find invoice usecase test', () => {

    it('should find an invoice', async () => {
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
            items: [ { id: '1', name: 'Product 1', price: 100 } ]
        });

        const MockRepository = () => {
            return {
                find: jest.fn().mockResolvedValue(invoice)
            };
        }

        const invoiceRepository = MockRepository();

        const usecase = new FindInvoiceUseCase(invoiceRepository);

        const input = { id: '1' };
        const output = await usecase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(output.id).toBe('1');
        expect(output.name).toBe('Client 1');
        expect(output.document).toBe('123456789');
        expect(output.address.street).toBe('Street 1');

        expect(output.items.length).toBe(1);
        expect(output.items[0].id).toBe('1');
        expect(output.items[0].name).toBe('Product 1');
        expect(output.items[0].price).toBe(100);
    });

});