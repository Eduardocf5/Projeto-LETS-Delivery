import { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
    private client = new DynamoDBClient({ region: "us-east-1" });
    private tableName = "Clientes";

    async salvar(cliente: Cliente): Promise<void> {
        const command = new PutItemCommand({
            TableName: this.tableName,
            Item: {
                id: { S: cliente.id },
                nome: { S: cliente.nome },
                dataNascimento: { S: cliente.dataNascimento },
                status: { BOOL: cliente.status },
                enderecos: { L: cliente.enderecos.map(e => ({ S: e })) },
                contatos: {
                    L: cliente.contatos.map(c => ({
                        M: {
                            email: { S: c.email },
                            telefone: { S: c.telefone },
                            principal: { BOOL: c.principal }
                        }
                    }))
                }
            }
        });
        await this.client.send(command);
    }

    async buscar(id: string): Promise<Cliente | null> {
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: { id: { S: id } }
        });
        const result = await this.client.send(command);
        if (!result.Item) return null;

        return {
            id: result.Item.id.S!,
            nome: result.Item.nome.S!,
            dataNascimento: result.Item.dataNascimento.S!,
            status: result.Item.status.BOOL!,
            enderecos: result.Item.enderecos.L?.map(e => e.S!) || [],
            contatos: result.Item.contatos.L?.map(c => ({
                email: c.M!.email.S!,
                telefone: c.M!.telefone.S!,
                principal: c.M!.principal.BOOL!
            })) || []
        };
    }

    async atualizar(id: string, cliente: Partial<Cliente>): Promise<Cliente | null> {
        const updateExpression = [];
        const expressionAttributeValues: any = {};

        if (cliente.nome) {
            updateExpression.push("nome = :nome");
            expressionAttributeValues[":nome"] = { S: cliente.nome };
        }

        if (cliente.dataNascimento) {
            updateExpression.push("dataNascimento = :dataNascimento");
            expressionAttributeValues[":dataNascimento"] = { S: cliente.dataNascimento };
        }

        if (typeof cliente.status !== "undefined") {
            updateExpression.push("status = :status");
            expressionAttributeValues[":status"] = { BOOL: cliente.status };
        }

        const command = new UpdateItemCommand({
            TableName: this.tableName,
            Key: { id: { S: id } },
            UpdateExpression: `SET ${updateExpression.join(", ")}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW"
        });

        const result = await this.client.send(command);
        if (!result.Attributes) return null;

        return {
            id: result.Attributes.id.S!,
            nome: result.Attributes.nome.S!,
            dataNascimento: result.Attributes.dataNascimento.S!,
            status: result.Attributes.status.BOOL!,
            enderecos: result.Attributes.enderecos?.L?.map(e => e.S!) || [],
            contatos: result.Attributes.contatos?.L?.map(c => ({
                email: c.M!.email.S!,
                telefone: c.M!.telefone.S!,
                principal: c.M!.principal.BOOL!
            })) || []
        };
    }

    async deletar(id: string): Promise<boolean> {
        const command = new DeleteItemCommand({
            TableName: this.tableName,
            Key: { id: { S: id } }
        });
        await this.client.send(command);
        return true;
    }
}

