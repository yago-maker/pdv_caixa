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

-- Tabela produtos
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    categoria_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cep VARCHAR(10),
    rua VARCHAR(255),
    numero VARCHAR(10),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(2)
);









