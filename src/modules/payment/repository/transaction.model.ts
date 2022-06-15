import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: 'transactions',
    timestamps: false
})
export default class TransactionModel extends Model  {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare orderId: string;

    @Column({ allowNull: false })
    declare amount: number;

    @Column({ allowNull: false })
    declare status: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

};
