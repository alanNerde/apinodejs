import { supabase } from './supabase';

async function seedDatabase() {
  try {
    console.log('Iniciando inserção dos dados de teste...')

    // Inserir cidades
    const { error: citiesError } = await supabase
      .from('city')
      .insert([
        { name: 'São Paulo', uf: 'SP' },
        { name: 'Rio de Janeiro', uf: 'RJ' },
        { name: 'Belo Horizonte', uf: 'MG' }
      ]);

    if (citiesError) throw new Error(`Erro ao inserir cidades: ${citiesError.message}`);
    console.log('✅ Cidades inseridas');

    // Inserir clientes
    const { error: customersError } = await supabase
      .from('customer')
      .insert([
        {
          name: 'João Silva',
          cpf_cnpj: '123.456.789-00',
          phone: '(11) 98765-4321',
          email: 'joao@email.com',
          birth_date: '1990-01-15',
          status: 'A'
        },
        {
          name: 'Maria Santos',
          cpf_cnpj: '987.654.321-00',
          phone: '(21) 98765-4321',
          email: 'maria@email.com',
          birth_date: '1985-06-22',
          status: 'A'
        },
        {
          name: 'Empresa XYZ Ltda',
          cpf_cnpj: '12.345.678/0001-90',
          phone: '(31) 3333-4444',
          email: 'contato@xyz.com',
          status: 'A'
        }
      ]);

    if (customersError) throw new Error(`Erro ao inserir clientes: ${customersError.message}`);
    console.log('✅ Clientes inseridos');

    // Inserir endereços
    const { error: addressError } = await supabase
      .from('address')
      .insert([
        {
          customer_id: 1,
          street: 'Rua das Flores',
          neighborhood: 'Centro',
          number: '123',
          postal_code: '01234-567',
          city_id: 1,
          complement: 'Apto 101',
          type: 'RESIDENCIAL',
          status: 'A'
        },
        {
          customer_id: 2,
          street: 'Av. Atlântica',
          neighborhood: 'Copacabana',
          number: '456',
          postal_code: '22000-000',
          city_id: 2,
          type: 'RESIDENCIAL',
          status: 'A'
        },
        {
          customer_id: 3,
          street: 'Rua dos Negócios',
          neighborhood: 'Centro Comercial',
          number: '789',
          postal_code: '30123-000',
          city_id: 3,
          complement: 'Sala 505',
          type: 'COMERCIAL',
          status: 'A'
        }
      ]);

    if (addressError) throw new Error(`Erro ao inserir endereços: ${addressError.message}`);
    console.log('✅ Endereços inseridos');

    // Inserir produtos
    const { error: productsError } = await supabase
      .from('product')
      .insert([
        {
          name: 'Notebook Pro',
          description: 'Notebook com processador i7, 16GB RAM',
          price: 4999.99,
          status: 'A'
        },
        {
          name: 'Smartphone X',
          description: 'Smartphone último modelo, 128GB',
          price: 2999.99,
          status: 'A'
        },
        {
          name: 'Mouse Gamer',
          description: 'Mouse com 6 botões e LED RGB',
          price: 199.99,
          status: 'A'
        },
        {
          name: 'Teclado Mecânico',
          description: 'Teclado mecânico com switches blue',
          price: 299.99,
          status: 'A'
        },
        {
          name: 'Monitor 24"',
          description: 'Monitor Full HD IPS 24 polegadas',
          price: 899.99,
          status: 'A'
        }
      ]);

    if (productsError) throw new Error(`Erro ao inserir produtos: ${productsError.message}`);
    console.log('✅ Produtos inseridos');

    // Inserir pedidos
    const { error: ordersError } = await supabase
      .from('order')
      .insert([
        {
          customer_id: 1,
          total_amount: 5199.98,
          date: '2023-09-24',
          status: 'COMPLETED',
          address_id: 1
        },
        {
          customer_id: 2,
          total_amount: 3299.98,
          date: '2023-09-23',
          status: 'PROCESSING',
          address_id: 2
        },
        {
          customer_id: 3,
          total_amount: 2099.97,
          date: '2023-09-22',
          status: 'PENDING',
          address_id: 3
        }
      ]);

    if (ordersError) throw new Error(`Erro ao inserir pedidos: ${ordersError.message}`);
    console.log('✅ Pedidos inseridos');

    // Inserir itens dos pedidos
    const { error: orderItemsError } = await supabase
      .from('order_item')
      .insert([
        { order_id: 1, product_id: 1, amount: 1, unit_price: 4999.99, status: 'A' },
        { order_id: 1, product_id: 3, amount: 1, unit_price: 199.99, status: 'A' },
        { order_id: 2, product_id: 2, amount: 1, unit_price: 2999.99, status: 'A' },
        { order_id: 2, product_id: 3, amount: 1, unit_price: 299.99, status: 'A' },
        { order_id: 3, product_id: 5, amount: 1, unit_price: 899.99, status: 'A' },
        { order_id: 3, product_id: 4, amount: 1, unit_price: 299.99, status: 'A' },
        { order_id: 3, product_id: 3, amount: 1, unit_price: 199.99, status: 'A' }
      ]);

    if (orderItemsError) throw new Error(`Erro ao inserir itens dos pedidos: ${orderItemsError.message}`);
    console.log('✅ Itens dos pedidos inseridos');

    console.log('✅ Todos os dados de teste foram inseridos com sucesso!');

    // Verifica os dados inseridos
    const tables = ['city', 'customer', 'address', 'product', 'order', 'order_item']

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')

      if (error) {
        console.error(`Erro ao verificar tabela ${table}:`, error.message)
      } else {
        console.log(`📊 Registros em ${table}: ${data.length}`)
      }
    }

  } catch (error: any) {
    console.error('❌ Erro ao inserir dados de teste:', error.message)
  }
}

seedDatabase()
