import Id from '@shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';
import FindAllProductsUseCase from './find-all-products.usecase';

describe('Find all products usecase test', () => {

    const product1 = new Product({
        id: new Id('1'),
        name: 'Product 1',
        description: 'Product 1 description',
        salesPrice: 100
    });

    const product2 = new Product({
        id: new Id('2'),
        name: 'Product 2',
        description: 'Product 2 description',
        salesPrice: 200
    });

    const MockRepository = () => {
        return {
            findAll: jest.fn().mockReturnValue([product1, product2]),
            find: jest.fn().mockReturnValue(product1)
        };
    }

    it('should find all products', async () => {
        const producRepository = MockRepository();
        const usecase = new FindAllProductsUseCase(producRepository);

        const output = await usecase.execute();

        expect(producRepository.findAll).toHaveBeenCalled();
        expect(output).toBeDefined();
        expect(output.products).toHaveLength(2);
        expect(output.products[0].id).toBe(product1.id.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].description).toBe(product1.description);
        expect(output.products[0].salesPrice).toBe(product1.salesPrice);

        expect(output.products[1].id).toBe(product2.id.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].description).toBe(product2.description);
        expect(output.products[1].salesPrice).toBe(product2.salesPrice);
    });

});