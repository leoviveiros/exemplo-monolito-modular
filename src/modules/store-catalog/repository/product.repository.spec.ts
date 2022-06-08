import { Sequelize } from 'sequelize-typescript';
import ProductModel from './product.model';
import ProductRepository from './product.repository';

describe('product repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([
            ProductModel
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find all products', async () => {
        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            description: 'Product 1 description',
            salesPrice: 100
        });

        await ProductModel.create({
            id: '2',
            name: 'Product 2',
            description: 'Product 2 description',
            salesPrice: 200
        });

        const productRepository = new ProductRepository();

        const products = await productRepository.findAll();

        expect(products).toBeDefined();
        expect(products).toHaveLength(2);

        expect(products[0].id.id).toBe('1');
        expect(products[0].name).toBe('Product 1');
        expect(products[0].description).toBe('Product 1 description');
        expect(products[0].salesPrice).toBe(100);

        expect(products[1].id.id).toBe('2');
        expect(products[1].name).toBe('Product 2');
        expect(products[1].description).toBe('Product 2 description');
        expect(products[1].salesPrice).toBe(200);
    });

});