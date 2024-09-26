export class Cliente {
    id: string;
    nome: string;
    dataNascimento: string;
    status: boolean;
    enderecos: string[];
    contatos: { email: string, telefone: string, principal: boolean }[];

    constructor(
        id: string,
        nome: string,
        dataNascimento: string,
        status: boolean,
        enderecos: string[],
        contatos: { email: string, telefone: string, principal: boolean }[]
    ) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.status = status;
        this.enderecos = enderecos;
        this.contatos = contatos;
    }
}
