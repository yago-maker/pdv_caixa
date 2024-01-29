create table usuarios (
	id serial primary key,
	nome varchar(255) not null,
	email varchar(255) not null unique,
	senha varchar(255) not null
)

create table categorias (
	id serial primary key,
	descricao varchar(255) not null
)


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

create table produtos3 (
    id serial primary key,
    descricao varchar(255),
    quantidade_estoque int,
    valor int,
    categoria_id int, 
  	foreign key(categoria_id) references categorias(id)
)

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
)