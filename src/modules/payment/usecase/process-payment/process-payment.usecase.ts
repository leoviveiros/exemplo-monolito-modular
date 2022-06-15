import Transaction from '../../domain/transaction';
import TransactionGateway from '../../gateway/transaction.gateway';
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from './process-payment.dto';

export default class ProcessPaymentUseCase {
    constructor(private readonly transactionRepository: TransactionGateway) { }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        });

        transaction.process();

        const persistedTransaction = await this.transactionRepository.save(transaction);

        return {
            transactionId: persistedTransaction.id.id,
            orderId: persistedTransaction.orderId,
            amount: persistedTransaction.amount,
            status: persistedTransaction.status,
            createdAt: persistedTransaction.createdAt,
            updatedAt: persistedTransaction.updatedAt
        };
    }

};
