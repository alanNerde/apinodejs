import path from 'path';
import YAML from 'yamljs';

export function getSwaggerSpec() {
  const productDocument = YAML.load(path.join(__dirname, './product.yaml'));
  const customerDocument = YAML.load(path.join(__dirname, './customer.yaml'));
  return {
    openapi: '3.0.0',
    info: {
      title: 'TESTE SWAGGER',
      version: '1.0.0',
      description: 'DESCRICAO DENTRO DE SWAGGER.TS',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    tags: [
      ...(productDocument.tags || []),
      ...(customerDocument.tags || [])
    ],
    paths: {
      ...productDocument.paths,
      ...customerDocument.paths,
    },
    components: {
      schemas: {
        ...productDocument.components.schemas,
        ...customerDocument.components.schemas,
      },
    },
  };
}
