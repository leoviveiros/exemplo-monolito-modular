import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import InvoiceProductModel from './invoice-product.model';
import ProductModel from './product.model';

type InvoiceProduct = InvoiceProductModel & { product: ProductModel };

@Table({
    tableName: 'invoices',
    timestamps: false
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: number;

    @Column({ allowNull: true })
    declare complement: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare zipCode: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    @HasMany(() => InvoiceProductModel, 'invoiceId')
    declare items: InvoiceProduct[];

}