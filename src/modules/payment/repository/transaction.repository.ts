import Transaction from '../domain/transaction';
import TransactionGateway from '../gateway/transaction.gateway';
import TransactionModel from './transaction.model';

export default class TransactionRepository implements TransactionGateway {

    async save(transaction: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: transaction.id.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        });

        return new Transaction({
            id: transaction.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        });
    }

};
