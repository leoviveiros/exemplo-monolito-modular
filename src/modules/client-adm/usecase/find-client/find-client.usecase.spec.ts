import Id from '../../../shared/domain/value-object/id.value-object';
import Client from '../../domain/client.entity';
import FindClientUseCase from './find-client.usecase';

describe('find client usecase test', () => {

    const client = new Client({
        id: new Id('1'),
        name: 'Client 1',
        email: 'x@x.com',
        address: 'Address 1'
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
        expect(output.address).toBe('Address 1');
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });
    
});