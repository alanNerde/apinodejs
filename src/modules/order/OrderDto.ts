export interface OrderItemDto {
  product: number;
  amount: number;
  unit_price: number;
  status: string;
}

export interface OrderDto {
  customer: number;
  total_amount: number;
  date: string;
  status: string;
  address: number;
  itens: OrderItemDto[];
}

export interface OrderDtoWithoutId {
  customer: number;
  total_amount: number;
  date: string;
  status: string;
  address: number;
}
