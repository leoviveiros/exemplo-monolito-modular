import Transaction from '../domain/transaction';

export default interface TransactionGateway {
    save(transaction: Transaction): Promise<Transaction>;
}