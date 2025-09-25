import path from 'path';
import YAML from 'yamljs';

export function getSwaggerSpec() {
  const productDocument = YAML.load(path.join(__dirname, './product.yaml'));
  const customerDocument = YAML.load(path.join(__dirname, './customer.yaml'));
  const orderDocument = YAML.load(path.join(__dirname, './order.yaml'));
  return {
    openapi: '3.0.0',
    info: {
      title: 'TESTE SWAGGER',
      version: '1.0.0',
      description: 'DESCRICAO DENTRO DE SWAGGER.TS',
    },
    servers: [
      { url: '/api', description: 'Current environment' },
      { url: 'http://localhost:3000/api', description: 'Local development' }
    ],
    tags: [
      ...(productDocument.tags || []),
      ...(customerDocument.tags || []),
      ...(orderDocument.tags || [])
    ],
    paths: {
      ...productDocument.paths,
      ...customerDocument.paths,
      ...orderDocument.paths,
    },
    components: {
      schemas: {
        ...productDocument.components.schemas,
        ...customerDocument.components.schemas,
        ...orderDocument.components.schemas,
      },
    },
  };
}
