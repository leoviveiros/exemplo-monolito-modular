import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import InvoiceModel from './invoice.model';
import ProductModel from './product.model';

@Table({
    tableName: 'invoice_product',
    timestamps: false
})
export default class InvoiceProductModel extends Model {

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoiceId: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare productId: string;

    @Column({ allowNull: false })
    declare price: number;

}