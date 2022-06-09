import { Sequelize } from 'sequelize-typescript';
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';
import ClientModel from '../repository/client.model';

describe('client adm facade test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([
            ClientModel
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should add a client', async () => {
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: 'Client 1',
            email: 'x@x.com',
            address: 'Address 1'
        };

        await facade.add(input);

        const result = await ClientModel.findOne({ where: { id: '1' } });

        expect(result).toBeDefined();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    });

    it('should find a client', async () => {
        const client = await ClientModel.create({
            id: '1',
            name: 'Client 1',
            email: 'x@x.com',
            address: 'Address 1',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: client.id
        };

        const result = await facade.find(input);

        expect(result).toBeDefined();
        expect(result.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
    });

});