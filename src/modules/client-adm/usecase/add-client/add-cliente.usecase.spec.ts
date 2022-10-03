import AddClientUseCase from './add-cliente.usecase';

describe('Add Client UseCase Test', () => {

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn()
        };
    }

    it('should add a client', async () => {
        const clientRepository = MockRepository();
        const usecase = new AddClientUseCase(clientRepository);

        const input = {
            name: 'Cliente Teste',
            email: 'cliente@teste.com',
            document: '123456789',
            street: 'Street 1',
            number: 1,
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345678'
        };


        const output = await usecase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.email).toBe(input.email);
        expect(output.document).toBe(input.document);
    });

});