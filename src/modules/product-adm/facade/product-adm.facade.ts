import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from './product-adm.dto';

import ProductAdmFacadeInterface from './product-adm.facade.interface';
import AddProductUseCase from '../usecase/add-product/add-product.usecase';
import CheckStockUseCase from '../usecase/check-stock/check-stock.usecase';

export interface UseCasesProps {
    addUseCase: AddProductUseCase;
    checkStockUseCase: CheckStockUseCase;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: AddProductUseCase;
    private _checkStockUseCase: CheckStockUseCase;

    constructor(props: UseCasesProps) {
        this._addUseCase = props.addUseCase;
        this._checkStockUseCase = props.checkStockUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        await this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
    
};
