import Id from '../../../shared/domain/value-object/id.value-object';
import Client from '../../domain/client.entity';
import FindClientUseCase from './find-client.usecase';

describe('find client usecase test', () => {

    const client = new Client({
        id: new Id('1'),
        name: 'Client 1',
        email: 'x@x.com',
        document: '123456789',
        street: 'Street 1',
        number: 1,
        complement: 'Complement 1',
        city: 'City 1',
        state: 'State 1',
        zipCode: '12345678'
    })

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockResolvedValue(client)
        };
    }

    it('should find a client', async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
            id: '1'
        };

        const output = await usecase.execute(input);

        expect(output).toBeDefined();
        expect(output.id).toBe('1');
        expect(output.name).toBe('Client 1');
        expect(output.email).toBe('x@x.com');
        expect(output.document).toBe('123456789');
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });
    
});