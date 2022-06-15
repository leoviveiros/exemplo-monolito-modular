import { Sequelize } from 'sequelize-typescript';
import Id from '../../shared/domain/value-object/id.value-object';
import Transaction from '../domain/transaction';
import TransactionModel from './transaction.model';
import TransactionRepository from './transaction.repository';

describe('transaction repository test', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([
            TransactionModel
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a transaction', async () => {
        const transaction = new Transaction({
            id: new Id('1'),
            amount: 100,
            orderId: '1',
        });

        transaction.approve();

        const transactionRepository = new TransactionRepository();

        const result = await transactionRepository.save(transaction);

        expect(result.id).toBeDefined();
        expect(result.amount).toBe(transaction.amount);
        expect(result.orderId).toBe(transaction.orderId);
        expect(result.status).toBe('approved');
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    });

});