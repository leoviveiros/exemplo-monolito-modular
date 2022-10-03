import ClientGateway from '../../gateway/client.gateway';
import { FindClientInputDto, FindClientOutputDto } from './find-client.dto';

export default class FindClientUseCase {
    constructor(private readonly clientRepository: ClientGateway) { }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this.clientRepository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }

}