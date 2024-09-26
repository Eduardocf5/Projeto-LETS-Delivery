import { ClienteService } from "../services/ClienteService";

const clienteService = new ClienteService();

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const clienteDeletado = await clienteService.deletarCliente(id);

    if (!clienteDeletado) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Cliente não encontrado" })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Cliente deletado com sucesso" })
    };
};
