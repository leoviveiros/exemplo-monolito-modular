import { Sequelize } from 'sequelize-typescript';
import StoreCatalogFacaeFactory from '../factory/store-catalog.factory';
import ProductModel from '../repository/product.model';

describe('store catalog facade test', () => {   
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

    it('should find a product', async () => {
        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            description: 'Product 1 description',
            salesPrice: 100
        });

        const facade = StoreCatalogFacaeFactory.create();

        const output = await facade.find({ id: '1' });

        expect(output).toBeDefined();
        expect(output.id).toBe('1');
        expect(output.name).toBe('Product 1');
        expect(output.description).toBe('Product 1 description');
        expect(output.salesPrice).toBe(100);
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

        const facade = StoreCatalogFacaeFactory.create();

        const output = await facade.findAll();

        expect(output).toBeDefined();
        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe('1');
        expect(output.products[0].name).toBe('Product 1');
        expect(output.products[0].description).toBe('Product 1 description');
        expect(output.products[0].salesPrice).toBe(100);

        expect(output.products[1].id).toBe('2');
        expect(output.products[1].name).toBe('Product 2');
        expect(output.products[1].description).toBe('Product 2 description');
        expect(output.products[1].salesPrice).toBe(200);
    });

});