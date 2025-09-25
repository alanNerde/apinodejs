import { supabase } from './supabase';

interface City {
  name: string;
  uf: string;
}

interface Address {
  street: string;
  number: string;
  neighborhood: string;
  postal_code: string;
  complement?: string;
  type: string;
  city: City;
}

interface Customer {
  name: string;
  cpf_cnpj: string;
  email: string;
  phone: string;
  status: string;
  addresses: Address[];
}

async function listCustomers() {
  try {
    console.log('Buscando todos os clientes...\n')

    const { data, error } = await supabase
      .from('customer')
      .select(`
        *,
        addresses:address(
          *,
          city:city_id(
            name,
            uf
          )
        )
      `)

    if (error) {
      throw new Error(error.message)
    }

    console.log('📋 Lista de Clientes:')
    console.log('====================\n')

    data.forEach((customer: Customer) => {
      console.log(`🧑 Cliente: ${customer.name}`)
      console.log(`   CPF/CNPJ: ${customer.cpf_cnpj}`)
      console.log(`   Email: ${customer.email}`)
      console.log(`   Telefone: ${customer.phone}`)
      console.log(`   Status: ${customer.status}`)
      console.log('\n   📍 Endereços:')

      customer.addresses.forEach(address => {
        console.log(`      • ${address.street}, ${address.number}`)
        console.log(`        ${address.neighborhood}`)
        console.log(`        ${address.city.name} - ${address.city.uf}`)
        console.log(`        CEP: ${address.postal_code}`)
        if (address.complement) {
          console.log(`        Complemento: ${address.complement}`)
        }
        console.log(`        Tipo: ${address.type}\n`)
      })

      console.log('--------------------\n')
    })

  } catch (error: any) {
    console.error('❌ Erro ao buscar clientes:', error.message)
    console.error('Por favor, verifique suas variáveis de ambiente e conexão com internet.')
  }
}

listCustomers()
