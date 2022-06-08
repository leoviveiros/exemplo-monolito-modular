import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from './product-adm.dto';

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
}