import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../repository/product.model';
import ProductRepository from '../repository/product.repository';
import AddProductUseCase from '../usecase/add-product/add-product.usecase';
import ProductAdmFacade from './product-adm.facade';

describe('ProductAdmFacade Test', () => {
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
        const addProductUsecase = new AddProductUseCase(productRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUsecase,
            checkStockUseCase: undefined
        });

        const input = {
            id: '1',
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 100,
            stock: 10
        }

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({ where: { id: input.id } });

        expect(product).toBeDefined();
        expect(product.id).toBe(input.id);
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
    })
});