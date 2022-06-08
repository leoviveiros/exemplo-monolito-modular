import { FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto, FindAllStoreCatalogFacadeOutputDto } from './store-catalog.facade.dto';

import FindAllProductsUseCase from '../usecase/find-all-products/find-all-products.usecase';
import FindProductUseCase from '../usecase/find-product/find-product.usecase';
import StoreCatalogFacadeInterface from './store-catalog.facade.interface';

export interface UseCaseProps {
    findUseCase: FindProductUseCase,
    findAllUseCase: FindAllProductsUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: FindProductUseCase;
    private _findAllUseCase: FindAllProductsUseCase;

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._findAllUseCase = props.findAllUseCase;
    }

    async find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute(input);
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute();
    }
    
};
