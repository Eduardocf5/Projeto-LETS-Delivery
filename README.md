# Projeto CRUD de Clientes - Node.js + AWS (Lambda, DynamoDB, API Gateway)

Este projeto implementa um sistema de cadastro de clientes (CRUD) utilizando arquitetura serverless com **AWS Lambda**, **API Gateway** e **DynamoDB**. O projeto é escrito em **Node.js v20.x** e **TypeScript**, com testes unitários utilizando **Jest**.

## Recursos usados:

- **Node.js v20.x**
- **TypeScript**
- **AWS Lambda**
- **API Gateway**
- **DynamoDB**
- **AWS SDK v3**

### Como rodar o projeto

1. **Instalar dependências**

- Instale as dependências necessárias com:

*bash
npm install


2. **Compilar o código TypeScript**

- Compile o código TypeScript para JavaScript:

*bash
npm run build


3. **Testar localmente com DynamoDB Local**

- Para rodar o DynamoDB localmente, siga as instruções da AWS. Depois de iniciar o DynamoDB local, você pode rodar os testes:

*bash
npm test


4. **Subir o código das Lambdas para o S3**

- Faça o upload do código compilado para um bucket S3, que será referenciado no CloudFormation:

*bash
aws s3 cp dist/ s3://YOUR_S3_BUCKET_NAME --recursive


5. **Criar stack CloudFormation**

- Use o template CloudFormation para provisionar os recursos:

*bash
aws cloudformation create-stack --stack-name ClienteCrudStack --template-body file://cloudformation-template.yaml --capabilities CAPABILITY_IAM


6. **Testar a API**

- Após o provisionamento, os endpoints da API Gateway estarão disponíveis. Teste as funções CRUD via API REST usando os métodos POST, GET, PUT, e DELETE nos endpoints fornecidos.


📝 Conclusão
Seguindo essas etapas, você configurará e testará o sistema CRUD de clientes usando AWS Lambda, API Gateway, e DynamoDB. Para resolução de erros, verifique os logs no CloudWatch e garanta que todos os recursos foram provisionados corretamente.
