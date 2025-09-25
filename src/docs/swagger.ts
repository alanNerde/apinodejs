import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';

// Log para debug do ambiente
const debugInfo: Record<string, any> = {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  CWD: process.cwd(),
};

try {
  debugInfo.DIR_CONTENT = fs.readdirSync(process.cwd());
  const docsPath = path.join(process.cwd(), 'src', 'docs');
  console.log('Checking docs path:', docsPath);
  console.log('Docs path exists:', fs.existsSync(docsPath));
  if (fs.existsSync(docsPath)) {
    debugInfo.DOCS_CONTENT = fs.readdirSync(docsPath);
  }
} catch (error) {
  console.error('Error reading directory:', error);
}

console.log('Environment Debug:', debugInfo);

// Função para carregar YAML embutido como string
const getEmbeddedYaml = (filename: string) => {
  // Se estiver em produção, use o YAML embutido
  if (process.env.NODE_ENV === 'production') {
    if (filename === 'product.yaml') {
      return `
tags:
  - name: Products
    description: Operations related to products
paths:
  /product:
    get:
      tags: [Products]
      summary: Get all products
      responses:
        200:
          description: Success
    post:
      tags: [Products]
      summary: Create a product
      responses:
        201:
          description: Created`;
    }
    if (filename === 'customer.yaml') {
      return `
tags:
  - name: Customers
    description: Operations related to customers
paths:
  /customer:
    get:
      tags: [Customers]
      summary: Get all customers
      responses:
        200:
          description: Success`;
    }
    if (filename === 'order.yaml') {
      return `
tags:
  - name: Orders
    description: Operations related to orders
paths:
  /order:
    get:
      tags: [Orders]
      summary: Get all orders
      responses:
        200:
          description: Success`;
    }
  }

  // Em desenvolvimento, tenta carregar do arquivo
  const yamlPath = path.join(process.cwd(), 'src', 'docs', filename);
  if (!fs.existsSync(yamlPath)) {
    throw new Error(`YAML file not found: ${yamlPath}`);
  }
  return fs.readFileSync(yamlPath, 'utf8');
};

export function getSwaggerSpec() {
  try {
    // Carrega os documentos YAML com tratamento de erro
    const loadYamlDocument = (filename: string) => {
      try {
        console.log(`Loading YAML: ${filename}`);
        const content = getEmbeddedYaml(filename);
        return YAML.parse(content);
      } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return { tags: [], paths: {}, components: { schemas: {} } };
      }
    };

    const productDocument = loadYamlDocument('./product.yaml');
    const customerDocument = loadYamlDocument('./customer.yaml');
    const orderDocument = loadYamlDocument('./order.yaml');

    // Determina a URL base do servidor
    const getBaseUrl = () => {
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      return process.env.API_URL || 'http://localhost:3000';
    };

    return {
    openapi: '3.0.0',
    info: {
      title: 'TESTE SWAGGER',
      version: '1.0.0',
      description: 'DESCRICAO DENTRO DE SWAGGER.TS',
    },
    servers: [
      {
        url: `${getBaseUrl()}/api`,
        description: 'API Server'
      }
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
  } catch (error) {
    console.error('Error generating Swagger spec:', error);
    // Retorna uma configuração mínima em caso de erro
    return {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Error loading full documentation'
      },
      paths: {},
      components: { schemas: {} }
    };
  }
}
