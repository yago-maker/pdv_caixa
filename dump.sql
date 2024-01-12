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