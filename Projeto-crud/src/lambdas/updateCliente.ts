import { ClienteService } from "../services/ClienteService";

const clienteService = new ClienteService();

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const { nome, dataNascimento, status, enderecos, contatos } = JSON.parse(event.body);

    const clienteAtualizado = await clienteService.atualizarCliente(id, { nome, dataNascimento, status, enderecos, contatos });

    if (!clienteAtualizado) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Cliente não encontrado" })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(clienteAtualizado)
    };
};
