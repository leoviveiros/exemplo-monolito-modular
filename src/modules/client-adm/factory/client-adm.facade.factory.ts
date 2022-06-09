import ClientAdmFacade from '../facade/client-adm.facade';
import ClientAdmFacadeInterface from '../facade/client-adm.facade.interface';
import ClientRepository from '../repository/client.repository';
import AddClientUseCase from '../usecase/add-client/add-cliente.usecase';
import FindClientUseCase from '../usecase/find-client/find-client.usecase';

export default class ClientAdmFacadeFactory {
    
    static create(): ClientAdmFacadeInterface {
        const repository = new ClientRepository();
        const addUseCase = new AddClientUseCase(repository);
        const findUseCase = new FindClientUseCase(repository);
        
        return new ClientAdmFacade({
            addUseCase: addUseCase,
            findUseCase: findUseCase
        });
    }

};
