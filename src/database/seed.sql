-- Inserir cidades
INSERT INTO city (name, uf) VALUES
('São Paulo', 'SP'),
('Rio de Janeiro', 'RJ'),
('Belo Horizonte', 'MG');

-- Inserir clientes
INSERT INTO customer (name, cpf_cnpj, phone, email, birth_date, status) VALUES
('João Silva', '123.456.789-00', '(11) 98765-4321', 'joao@email.com', '1990-01-15', 'A'),
('Maria Santos', '987.654.321-00', '(21) 98765-4321', 'maria@email.com', '1985-06-22', 'A'),
('Empresa XYZ Ltda', '12.345.678/0001-90', '(31) 3333-4444', 'contato@xyz.com', NULL, 'A');

-- Inserir endereços
INSERT INTO address (customer_id, street, neighborhood, number, postal_code, city_id, complement, type, status) VALUES
(1, 'Rua das Flores', 'Centro', '123', '01234-567', 1, 'Apto 101', 'RESIDENCIAL', 'A'),
(2, 'Av. Atlântica', 'Copacabana', '456', '22000-000', 2, NULL, 'RESIDENCIAL', 'A'),
(3, 'Rua dos Negócios', 'Centro Comercial', '789', '30123-000', 3, 'Sala 505', 'COMERCIAL', 'A');

-- Inserir produtos
INSERT INTO product (name, description, price, status) VALUES
('Notebook Pro', 'Notebook com processador i7, 16GB RAM', 4999.99, 'A'),
('Smartphone X', 'Smartphone último modelo, 128GB', 2999.99, 'A'),
('Mouse Gamer', 'Mouse com 6 botões e LED RGB', 199.99, 'A'),
('Teclado Mecânico', 'Teclado mecânico com switches blue', 299.99, 'A'),
('Monitor 24"', 'Monitor Full HD IPS 24 polegadas', 899.99, 'A');

-- Inserir pedidos
INSERT INTO "order" (customer_id, total_amount, date, status, address_id) VALUES
(1, 5199.98, '2023-09-24', 'COMPLETED', 1),
(2, 3299.98, '2023-09-23', 'PROCESSING', 2),
(3, 2099.97, '2023-09-22', 'PENDING', 3);

-- Inserir itens dos pedidos
INSERT INTO order_item (order_id, product_id, amount, unit_price, status) VALUES
-- Pedido 1: Notebook Pro + Mouse Gamer
(1, 1, 1, 4999.99, 'A'),
(1, 3, 1, 199.99, 'A'),

-- Pedido 2: Smartphone X + Mouse Gamer
(2, 2, 1, 2999.99, 'A'),
(2, 3, 1, 299.99, 'A'),

-- Pedido 3: Monitor + Teclado + Mouse
(3, 5, 1, 899.99, 'A'),
(3, 4, 1, 299.99, 'A'),
(3, 3, 1, 199.99, 'A');
