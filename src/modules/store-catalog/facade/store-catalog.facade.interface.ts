import { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from './store-catalog.facade.dto';

export default interface StoreCatalogFacadeInterface {
    find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>
}