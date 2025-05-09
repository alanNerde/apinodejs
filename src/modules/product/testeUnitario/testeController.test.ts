import request from 'supertest';
import app from '../../../app';
import productService from '../ProductService';

// 1) Configure Jest para MOCKAR o módulo productService:
jest.mock('../productService');

describe('ProductController', () => {
  // 2) Dados de exemplo
  const sample = [
    {
      id: 1,
      name: 'Monitor LG',
      description: 'Monitor 2k vsync',
      price: 878.0,
      status: 'A',
    },
  ];

  // 3) Antes de CADA teste, resetar todos os mocks:
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // 4) Primeiro caso de teste: GET /products
  it('GET /products → deve retornar lista de produtos', async () => {
    (productService.listAllProduct as jest.Mock).mockResolvedValue(sample);

    const res = await request(app).get('/api/product');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(sample);
  });

  // … você pode adicionar mais testes para outras rotas …
});
