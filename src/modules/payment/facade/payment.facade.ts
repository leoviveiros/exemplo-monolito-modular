import ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase';
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from './payment.facade.interface';

export default class PaymentFacade implements PaymentFacadeInterface {

    constructor(private processPaymentUseCase: ProcessPaymentUseCase) {}

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this.processPaymentUseCase.execute(input);
    }

};
