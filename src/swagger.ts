import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TESTE SWAGGER',
      version: '1.0.0',
      description: 'DESCRICAO DENTRO DE SWAGGER.TS',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // ajuste a porta conforme seu server.ts
      },
    ],
  },
  apis: ['./src/modules/customer/*.ts'], // caminho dos arquivos com anotações Swagger
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
