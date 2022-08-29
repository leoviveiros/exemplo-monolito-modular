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

            // @ts-expect-error
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

            // @ts-expect-error
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

    describe('validateProducts method', () => {
        it('should throw when no products are selected', async () => {
            // @ts-expect-error
            const placeOrderUseCase = new PlaceOrderUseCase({});

            const inputDto: PlaceOrderInputDto = {
                clientId: '0',
                products: []
            };

            await expect(placeOrderUseCase['validateProducts'](inputDto))
                .rejects.toThrow(new Error('No products selected'));
        });

        it('should throw when a product is out of stock', async () => {
            const mockProductFacade = {
                checkStock: jest.fn((input: {productId: string}) => {
                    return Promise.resolve({
                        productId: input.productId,
                        stock: input.productId === '0' ? 0 : 1,
                    })
                })
            };
            
            const placeOrderUseCase = new PlaceOrderUseCase({
                // @ts-expect-error
                productFacade: mockProductFacade
            });

            let input: PlaceOrderInputDto = {
                clientId: '0',
                products: [{ productId: '0' }]
            }

            await expect(placeOrderUseCase['validateProducts'](input))
                .rejects.toThrow(new Error('Product 0 is not available in stock'));
            
            input = {
                clientId: '0',
                products: [{ productId: '1' }, { productId: '0' }]
            }

            await expect(placeOrderUseCase['validateProducts'](input))
                .rejects.toThrow(new Error('Product 0 is not available in stock'));
            
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
        });
        
    });
});