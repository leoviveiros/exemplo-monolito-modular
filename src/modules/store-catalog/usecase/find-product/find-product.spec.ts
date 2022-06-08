import Id from '../../../shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';
import FindProductUseCase from './find-product.usecase';

describe('find product usecase test', () => {
    const product = new Product({
        id: new Id('1'),
        name: 'Product 1',
        description: 'Product 1 description',
        salesPrice: 100
    });

    const MockRepository = () => {
        return {            
            findAll: jest.fn(),
            find: jest.fn().mockReturnValue(product)
        };
    }
    
    it('should find product', async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = { id: '1' };
        const output = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output).toBeDefined();
        expect(output.id).toBe('1');
        expect(output.name).toBe('Product 1');
        expect(output.description).toBe('Product 1 description');
        expect(output.salesPrice).toBe(100);
    });

});