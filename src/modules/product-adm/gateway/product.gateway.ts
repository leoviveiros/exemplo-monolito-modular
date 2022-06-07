import Product from '../domain/entity/product.entity';

export default interface ProductGateway {
    add(product: Product): Promise<void>;
    find(id: string): Promise<Product>;
};
