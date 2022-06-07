import { Sequelize } from 'sequelize-typescript';
import Id from '../../shared/domain/value-object/id.value-object';
import Product from '../domain/entity/product.entity';
import ProductModel from './product.model';
import ProductRepository from './product.repository';

describe('Product Repository Tests', () => {

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

    it('should create a product', async () => {
        const productRepository = new ProductRepository();

        const props = {
            id: new Id('1'),
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 100,
            stock: 10
        };

        const product = new Product(props);

        await productRepository.add(product);

        const productFound = await ProductModel.findOne({
            where: { id: props.id.id }
        });

        expect(productFound).toBeDefined();
        expect(productFound.id).toBe(props.id.id);
        expect(productFound.name).toBe(props.name);
        expect(productFound.description).toBe(props.description);
        expect(productFound.purchasePrice).toBe(props.purchasePrice);
        expect(productFound.stock).toBe(props.stock);
        expect(productFound.createdAt).toBeDefined();
        expect(productFound.updatedAt).toBeDefined();
    });

    it('should find a product', async () => {
        const productRepository = new ProductRepository();

        ProductModel.create({
            id: '1',
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const productFound = await productRepository.find('1');

        expect(productFound).toBeDefined();
        expect(productFound.id.id).toBe('1');
        expect(productFound.name).toBe('Product 1');
        expect(productFound.description).toBe('Product 1 description');
        expect(productFound.purchasePrice).toBe(100);
        expect(productFound.stock).toBe(10);
        expect(productFound.createdAt).toBeDefined();
        expect(productFound.updatedAt).toBeDefined();
    });
});