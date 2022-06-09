import AddClientUseCase from '../usecase/add-client/add-cliente.usecase';
import FindClientUseCase from '../usecase/find-client/find-client.usecase';
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from './client-adm.facade.interface';

type FacadeProps = {
    addUseCase: AddClientUseCase;
    findUseCase: FindClientUseCase;
};

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private readonly _addUseCase: AddClientUseCase;
    private readonly _findUseCase: FindClientUseCase;

    constructor(props: FacadeProps) {
        this._addUseCase = props.addUseCase;
        this._findUseCase = props.findUseCase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUseCase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUseCase.execute(input);
    }

};
