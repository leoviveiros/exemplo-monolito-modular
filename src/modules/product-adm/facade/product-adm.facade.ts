import UseCaseInterface from '@shared/usecase/usecase.interface';
import ProductAdmFacadeInterface from './product-adm.facade.interface';

import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from './product-adm.dto';

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(props: UseCasesProps) {
        this._addUseCase = props.addUseCase;
        this._checkStockUseCase = props.checkStockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
    
};
