import PaymentFacade from '../facade/payment.facade';
import PaymentFacadeInterface from '../facade/payment.facade.interface';
import TransactionRepository from '../repository/transaction.repository';
import ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase';

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repository = new TransactionRepository();
        const usecase = new ProcessPaymentUseCase(repository);
        
        return new PaymentFacade(usecase);
    }
};
