import UseCaseInterface from '@shared/usecase/usecase.interface';
import ProductGateway from '../../gateway/product.gateway';

import { CheckStockInputDto, CheckStockOutputDto } from './check-stock.dto';

export default class CheckStockUseCase implements UseCaseInterface {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) { 
        this._productRepository = productRepository;
    }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this._productRepository.find(input.productId);
        
        return {
            productId: product.id.id,
            stock: product.stock
        };
    }
    
};
