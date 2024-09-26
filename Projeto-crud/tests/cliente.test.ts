import { ClienteService } from "../src/services/ClienteService";
import { ClienteRepository } from "../src/repositories/ClienteRepository";
jest.mock("../src/repositories/ClienteRepository");

describe("Testes ClienteService", () => {
    it("Deve criar um cliente", async () => {
        const service = new ClienteService();
        const cliente = { id: "1", nome: "Teste", dataNascimento: "1990-01-01", status: true, enderecos: [], contatos: [] };
        await service.criarCliente(cliente as any);
        expect(ClienteRepository.prototype.salvar).toHaveBeenCalled();
    });

    it("Deve buscar um cliente", async () => {
        const service = new ClienteService();
        const mockCliente = { id: "1", nome: "Teste", dataNascimento: "1990-01-01", status: true, enderecos: [], contatos: [] };
        (ClienteRepository.prototype.buscar as jest.Mock).mockResolvedValue(mockCliente);

        const result = await service.buscarCliente("1");
        expect(result).toEqual(mockCliente);
    });

    it("Deve atualizar um cliente", async () => {
        const service = new ClienteService();
        const mockCliente = { id: "1", nome: "Teste", dataNascimento: "1990-01-01", status: true, enderecos: [], contatos: [] };
        (ClienteRepository.prototype.atualizar as jest.Mock).mockResolvedValue(mockCliente);

        const result = await service.atualizarCliente("1", mockCliente);
        expect(result).toEqual(mockCliente);
    });

    it("Deve deletar um cliente", async () => {
        const service = new ClienteService();
        (ClienteRepository.prototype.deletar as jest.Mock).mockResolvedValue(true);

        const result = await service.deletarCliente("1");
        expect(result).toEqual(true);
    });
});
