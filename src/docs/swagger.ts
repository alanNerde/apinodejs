import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';

const getYamlPath = (filename: string) => {
  // Na Vercel, os arquivos estarão em /var/task
  const possiblePaths = [
    path.join(process.cwd(), 'src', 'docs', filename),
    path.join(process.cwd(), 'dist', 'docs', filename),
    path.join('/var/task', 'src', 'docs', filename),
    path.join('/var/task', 'dist', 'docs', filename)
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  throw new Error(`YAML file not found: ${filename}`);
};

export function getSwaggerSpec() {
  try {
    // Carrega os documentos YAML com tratamento de erro
    const loadYamlDocument = (filename: string) => {
      try {
        const yamlPath = getYamlPath(filename);
        console.log(`Loading YAML from: ${yamlPath}`);
        const content = fs.readFileSync(yamlPath, 'utf8');
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
