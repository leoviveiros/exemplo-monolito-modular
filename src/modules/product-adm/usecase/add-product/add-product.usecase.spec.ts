import AddProductUseCase from './add-product.usecase';

describe('Add Product Usecase Unit Test', () => {

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn()
        };
    }

    it('should add a product', async () => {
        const productRepository = MockRepository();
        const usecase = new AddProductUseCase(productRepository);

        const input = {
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 100,
            stock: 10,
        };

        const output = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.purchasePrice).toBe(input.purchasePrice);
        expect(output.stock).toBe(input.stock);
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });

});