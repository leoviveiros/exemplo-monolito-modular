// TODO refatorar usando generics para output e input
export default interface UseCaseInterface {
    execute(input: any): Promise<any>;
}