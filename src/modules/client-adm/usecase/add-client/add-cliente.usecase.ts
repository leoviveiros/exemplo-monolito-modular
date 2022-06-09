import Client from '../../domain/client.entity';
import ClientGateway from '../../gateway/client.gateway';
import { AddClientInputDto, AddClientOutputDto } from './add-client.dto';

export default class AddClientUseCase {
    
    constructor(private clientRepository: ClientGateway) { }
    
    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props = {
            name: input.name,
            email: input.email,
            address: input.address
        }

        const client = new Client(props);

        await this.clientRepository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }
};
