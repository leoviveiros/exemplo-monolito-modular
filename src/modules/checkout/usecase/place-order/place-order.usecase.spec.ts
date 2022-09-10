import Id from '../../../shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';
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

        describe('place an order', () => {
            const mockDate = new Date(2000, 1, 1);

            const clientProps = {
                id: '1c',
                name: 'Cliente 1',                
                email: 'cliente@email.com',
                address: 'Street 01'
            }

            const mockPaymentFacade = {
                process: jest.fn()
            }

            const mockCheckoutRepo = {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }

            const mockInvoiceFacade = {
                create: jest.fn().mockResolvedValue({ id: '1i' })
            }

            // @ts-expect-error
            const placeOrderUseCase = new PlaceOrderUseCase({
                clientFacade: mockClientFacade,
                repository: mockCheckoutRepo,
                invoiceFacade: mockInvoiceFacade,
                paymentFacade:  mockPaymentFacade
            });

            const products = {
                '1': new Product({
                    id: new Id('1'),
                    name: 'Product 1',
                    description: 'Some description',
                    salesPrice: 10
                }),
                '2': new Product({
                    id: new Id('2'),
                    name: 'Product 2',
                    description: 'Some description',
                    salesPrice: 20
                }),
            }
            
            const mockGetProduct = jest
                //@ts-expect-error
                .spyOn(placeOrderUseCase, 'getProduct')
                //@ts-expect-error
                .mockImplementation((productId: keyof typeof products) => products[productId]);
            
            const mockValidateProducts = jest
                //@ts-expect-error
                .spyOn(placeOrderUseCase, 'validateProducts')
                //@ts-expect-error
                .mockResolvedValue(null);

            beforeAll(() => {
                jest.useFakeTimers('modern');
                jest.setSystemTime(mockDate);
            });

            beforeEach(() => {
                mockClientFacade.find
                    .mockResolvedValue(clientProps);
            });

            afterAll(() => {
                jest.useRealTimers();
            }); 

            it('should not be approved', async () => {
                mockPaymentFacade.process.mockResolvedValue({
                    transactionId: '1t',
                    orderId: '1o',
                    amount: 30,
                    status: 'error',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })

                const input: PlaceOrderInputDto = {
                    clientId: '1c',
                    products: [{ productId: '1' }, { productId: '2' }]
                };

                const output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(30);
                expect(output.products).toEqual([{ productId: '1' }, { productId: '2' }]);

                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });

                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);

                expect(mockGetProduct).toHaveBeenCalledTimes(2);

                expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);

                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                });

                expect(mockInvoiceFacade.create).not.toHaveBeenCalled();
            });

            it('should be approved', async () => {
                mockPaymentFacade.process.mockResolvedValue({
                    transactionId: '1t',
                    orderId: '1o',
                    amount: 30,
                    status: 'approved',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })

                const input: PlaceOrderInputDto = {
                    clientId: '1c',
                    products: [{ productId: '1' }, { productId: '2' }]
                };

                const output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBe('1i');
                expect(output.total).toBe(30);
                expect(output.products).toEqual([{ productId: '1' }, { productId: '2' }]);

                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });

                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);

                expect(mockGetProduct).toHaveBeenCalledTimes(2);

                expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);

                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                });

                expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(1);
                expect(mockInvoiceFacade.create).toHaveBeenCalledWith({
                    name: clientProps.name,
                    address: clientProps.address,
                    items: Object.values(products).map(prod => ({
                        id: prod.id.id,
                        name: prod.name,
                        price: prod.salesPrice
                    })),
                });
            });
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

    describe('getProduct method', () => {
        const mockDate = new Date(2000, 1, 1);
        beforeAll(() => {
            jest.useFakeTimers('modern');
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it('should throw when product not found', async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            };
            
            const placeOrderUseCase = new PlaceOrderUseCase({
                // @ts-expect-error
                catalogFacade: mockCatalogFacade
            });

            await expect(placeOrderUseCase['getProduct']('0'))
                .rejects.toThrow(new Error('Product not found'))
        });

        it('should return a product', async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({
                    id: '0',
                    name: 'Product 0',
                    description: 'Zero',
                    salesPrice: 10
                })
            };

            const placeOrderUseCase = new PlaceOrderUseCase({
                // @ts-expect-error
                catalogFacade: mockCatalogFacade
            });

            const product = await placeOrderUseCase['getProduct']('0');
            const expectedProduct = new Product({
                id: new Id('0'),
                name: 'Product 0',
                description: 'Zero',
                salesPrice: 10
            });

            expect(product).toEqual(expectedProduct);
            expect(mockCatalogFacade.find).toHaveBeenCalled();
        });
    });
});