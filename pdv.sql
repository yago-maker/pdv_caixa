create table usuarios (
	id serial primary key,
	nome varchar(255) not null,
	email varchar(255) not null unique,
	senha varchar(255) not null
);

create table categorias (
	id serial primary key,
	descricao varchar(255) not null
);

insert into categorias (descricao)
values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games')

create table produtos (
    id serial primary key,
    descricao varchar(255),
    quantidade_estoque int,
    valor int,
    categoria_id int, 
  	foreign key(categoria_id) references categorias(id)
);

create table cliente (
    id serial primary key,
    nome varchar(255),
    email varchar(255),
    cpf varchar(255),
    cep int,
    rua varchar(255),
    numero int,
    bairro varchar(255),
    cidade varchar(255),
    estado varchar(255)
);

create table pedidos (
    id serial primary key,
    cliente_id int,
    foreign key (cliente_id) references cliente(id),
    observacao varchar(255),
    valor_total int
);
  
  
create table pedido_produtos(
	id serial primary key,
  pedido_id int,
  foreign key (pedido_id) references pedidos(id),
  produto_id int,
  foreign key (produto_id) references produtos(id),
  quantidade_produto int,
  valor_produto int
);

alter table produtos add column produto_imagem varchar(255);
