import { Sequelize } from 'sequelize-typescript';
import Id from '../../shared/domain/value-object/id.value-object';
import ClientModel from './client.model';
import ClientRepository from './client.repository';
import Client from '../domain/client.entity';

describe('Client Repository Tests', () => {

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

    it('should find a client', async () => {
        const client = await ClientModel.create({
            id: '1',
            name: 'Client 1',
            email: 'x@x.com',     
            document: '123456789',
            street: 'Street 1',
            number: 1,
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345678',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const repository = new ClientRepository();

        const result = await repository.find(client.id);

        expect(result).toBeDefined();
        expect(result.id.id).toBe('1');
        expect(result.name).toBe('Client 1');
        expect(result.email).toBe('x@x.com');
        expect(result.document).toBe('123456789');
        expect(result.street).toBe('Street 1');
        expect(result.number).toBe(1);
        expect(result.complement).toBe('Complement 1');
        expect(result.city).toBe('City 1');
        expect(result.state).toBe('State 1');
        expect(result.zipCode).toBe('12345678');
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    });

    it('should create a client', async () => {
        const client = new Client({
            id: new Id('1'),
            name: 'Client 1',
            email: 'x@x.com',
            document: '123456789',
            street: 'Street 1',
            number: 1,
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: '12345678'
        });

        const repository = new ClientRepository();

        await repository.add(client);

        const result = await ClientModel.findOne({ where: { id: '1' } });

        expect(result).toBeDefined();
        expect(result.id).toBe(client.id.id);
        expect(result.name).toBe(client.name);        
        expect(result.email).toBe(client.email);
        expect(result.document).toBe(client.document);
        expect(result.street).toBe(client.street);
        expect(result.number).toBe(client.number);
        expect(result.complement).toBe(client.complement);
        expect(result.city).toBe(client.city);
        expect(result.state).toBe(client.state);
        expect(result.zipCode).toBe(client.zipCode);        
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
    });

});