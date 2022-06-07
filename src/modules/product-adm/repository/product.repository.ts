import Id from '../../shared/domain/value-object/id.value-object';
import Product from '../domain/entity/product.entity';
import ProductGateway from '../gateway/product.gateway';
import ProductModel from './product.model';

export default class ProductRepository implements ProductGateway {

    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        })
    }
     
    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({
            where: { id: id }
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });
    }
    
};
