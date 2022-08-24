import { PlaceOrderInputDto } from './place-order.dto';
import PlaceOrderUseCase from './place-order.usecase';

describe('PlaceOrderUseCase unit test', () => {

    describe('execute method', () => {
        const mockClientFacade = {
            find: jest.fn(),
            add: jest.fn()
        }

        it('shoul throw an error when client not found', async () => {
            mockClientFacade.find.mockResolvedValue(null);

            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: mockClientFacade
            });

            const inputDto: PlaceOrderInputDto = {
                clientId: '0',
                products: []
            };

            await expect(placeOrderUseCase.execute(inputDto))
                .rejects.toThrow(new Error('Client not found'));
            
        });

        it('should throw an error when products are not valid', async () => {
            mockClientFacade.find.mockResolvedValue(true);

            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: mockClientFacade
            });

            // @ts-expect-error - spy on private method
            const mockValidateProducts = jest.spyOn(placeOrderUseCase, 'validateProducts')
                // @ts-expect-error - never return
                .mockRejectedValue(new Error('No products selected'))

            const inputDto: PlaceOrderInputDto = {
                clientId: '0',
                products: []
            };

            await expect(placeOrderUseCase.execute(inputDto))
                .rejects.toThrow(new Error('No products selected'));
            
            expect(mockValidateProducts).toHaveBeenCalled();
        });
    });

});