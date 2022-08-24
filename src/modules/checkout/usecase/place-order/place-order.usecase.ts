import UseCaseInterface from '@shared/usecase/usecase.interface';
import ClientAdmFacadeInterface from '../../../client-adm/facade/client-adm.facade.interface';
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place-order.dto';

type PlaceOrderUseCaseProps = {
    clientFacade: ClientAdmFacadeInterface
}

export default class PlaceOrderUseCase implements UseCaseInterface<PlaceOrderInputDto, PlaceOrderOutputDto> {

    private _clientFacade: ClientAdmFacadeInterface;

    constructor(props: PlaceOrderUseCaseProps) {
        this._clientFacade = props.clientFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        // buscar cliente
        const client = await this._clientFacade.find({ id: input.clientId });

        if (!client) {
            throw new Error('Client not found');
        }

        await this.validateProducts(input);

        // validar produtos
        // recuperar produtos
        
        // criar order
        // processar pagamento

        // caso seja aprovado, gerar invoice
        // mudar status da order para approved
        // retornar dto

        throw new Error('Method not implemented.');
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected");
        }
    }
}