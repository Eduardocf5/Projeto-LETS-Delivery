import { ClienteService } from "../services/ClienteService";
import { Cliente } from "../models/Cliente";
import { v4 as uuidv4 } from "uuid";

const clienteService = new ClienteService();

export const handler = async (event: any) => {
    const { nome, dataNascimento, status, enderecos, contatos } = JSON.parse(event.body);
    const cliente = new Cliente(uuidv4(), nome, dataNascimento, status, enderecos, contatos);
    await clienteService.criarCliente(cliente);

    return {
        statusCode: 201,
        body: JSON.stringify({ message: "Cliente criado com sucesso!", cliente })
    };
};
