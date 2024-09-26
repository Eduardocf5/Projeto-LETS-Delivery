import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";

const clienteRepository = new ClienteRepository();

export class ClienteService {
    async criarCliente(cliente: Cliente): Promise<void> {
        await clienteRepository.salvar(cliente);
    }

    async buscarCliente(id: string): Promise<Cliente | null> {
        return await clienteRepository.buscar(id);
    }

    async atualizarCliente(id: string, cliente: Partial<Cliente>): Promise<Cliente | null> {
        return await clienteRepository.atualizar(id, cliente);
    }

    async deletarCliente(id: string): Promise<boolean> {
        return await clienteRepository.deletar(id);
    }
}
