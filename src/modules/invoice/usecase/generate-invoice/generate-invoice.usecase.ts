import Invoice from '../../domain/invoice.entity';
import InvoiceGateway from '../../gateway/invoice.gateway';
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from './generate-invoice.dto';


export default class GenerateInvoiceUseCase {

    constructor(private invoiceRepository: InvoiceGateway) { }

    async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            },
            items: input.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
        });

        await this.invoiceRepository.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.total,            
        };
    }

}