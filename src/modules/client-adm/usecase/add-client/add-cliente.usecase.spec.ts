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
            address: 'Address 1'
        };


        const output = await usecase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.email).toBe(input.email);
        expect(output.address).toBe(input.address);
    });

});