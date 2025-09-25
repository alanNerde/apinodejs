# Documentação das Rotas da API

Base URL: https://apinodejs-gamma.vercel.app/api

## Autenticação 🔐

Todas as rotas (exceto login) requerem um token JWT no header:
```
Authorization: Bearer seu_token_jwt
```

### Login
```
POST /api/login
Content-Type: application/json

Body:
{
    "email": "seu_email",
    "password": "sua_senha"
}

Resposta:
{
    "token": "jwt_token"
}
```

## Produtos 📦

### Listar todos os produtos
```
GET /api/product
```

### Buscar produto por ID
```
GET /api/product/:id
```

### Criar novo produto
```
POST /api/product
Content-Type: application/json

Body:
{
    "name": "Nome do Produto",
    "description": "Descrição do produto",
    "price": 99.99,
    "unit": "UN"
}
```

### Atualizar produto
```
PUT /api/product/:id
Content-Type: application/json

Body:
{
    "name": "Novo Nome",
    "description": "Nova descrição",
    "price": 129.99,
    "unit": "UN"
}
```

### Excluir produto
```
DELETE /api/product/:id
```

## Clientes 👥

### Listar todos os clientes
```
GET /api/customer
```

### Buscar cliente por ID
```
GET /api/customer/:id
```

### Criar novo cliente
```
POST /api/customer
Content-Type: application/json

Body:
{
    "name": "Nome do Cliente",
    "document": "123.456.789-00",
    "email": "cliente@email.com",
    "phone": "(11) 98765-4321"
}
```

### Atualizar cliente
```
PUT /api/customer/:id
Content-Type: application/json

Body:
{
    "name": "Novo Nome",
    "document": "123.456.789-00",
    "email": "novo@email.com",
    "phone": "(11) 98765-4321"
}
```

### Excluir cliente
```
DELETE /api/customer/:id
```

## Pedidos 🛍️

### Listar todos os pedidos
```
GET /api/order
```

### Buscar pedido por ID
```
GET /api/order/:id
```

### Criar novo pedido
```
POST /api/order
Content-Type: application/json

Body:
{
    "customerId": 1,
    "items": [
        {
            "productId": 1,
            "quantity": 2,
            "price": 99.99
        },
        {
            "productId": 2,
            "quantity": 1,
            "price": 149.99
        }
    ]
}
```

### Atualizar pedido
```
PUT /api/order/:id
Content-Type: application/json

Body:
{
    "customerId": 1,
    "items": [
        {
            "productId": 1,
            "quantity": 3,
            "price": 99.99
        }
    ]
}
```

### Excluir pedido
```
DELETE /api/order/:id
```

## Endereços 📍

### Listar endereços do cliente
```
GET /api/address/customer/:customerId
```

### Adicionar endereço ao cliente
```
POST /api/address
Content-Type: application/json

Body:
{
    "customerId": 1,
    "street": "Nome da Rua",
    "number": "123",
    "complement": "Apto 45",
    "neighborhood": "Bairro",
    "city": "Cidade",
    "state": "Estado",
    "zipCode": "12345-678"
}
```

### Atualizar endereço
```
PUT /api/address/:id
Content-Type: application/json

Body:
{
    "street": "Nova Rua",
    "number": "456",
    "complement": "Casa",
    "neighborhood": "Novo Bairro",
    "city": "Nova Cidade",
    "state": "Novo Estado",
    "zipCode": "87654-321"
}
```

### Excluir endereço
```
DELETE /api/address/:id
```

## Status da API 🟢

### Verificar status
```
GET /health

Resposta:
{
    "status": "ok",
    "timestamp": "2025-09-25T12:00:00.000Z",
    "environment": "production",
    "version": "1.0.0"
}
```

## Notas Importantes 📝

1. Todos os endpoints retornam status HTTP apropriados:
   - 200: Sucesso
   - 201: Criado com sucesso
   - 400: Erro de validação
   - 401: Não autorizado
   - 404: Não encontrado
   - 500: Erro interno

2. Em caso de erro, a resposta seguirá o formato:
```json
{
    "error": "Tipo do Erro",
    "message": "Descrição detalhada do erro"
}
```

3. Os IDs nas URLs são sempre números inteiros positivos

4. Todas as datas são retornadas no formato ISO 8601

5. Para testar no Postman:
   - Faça login primeiro para obter o token
   - Configure o token no header de todas as outras requisições
   - Use a URL base correta
