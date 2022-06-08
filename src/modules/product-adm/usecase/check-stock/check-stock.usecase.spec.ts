import Id from '@shared/domain/value-object/id.value-object';
import Product from '../../domain/entity/product.entity';
import CheckStockUseCase from './check-stock.usecase';

describe('CheckStock UseCase Test', () => {
    
    const product = new Product({
        id: new Id('1'),
        name: 'Product 1',
        description: 'Product 1 description',
        purchasePrice: 100,
        stock: 10
    })

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockResolvedValue(product)
        };
    }

    it('should check stock of a product', async () => {
        const productRepository = MockRepository();
        
        const usecase = new CheckStockUseCase(productRepository);

        const input = {
            productId: '1'
        };

        const output = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.productId).toBe('1');
        expect(output.stock).toBe(10);
    });

});