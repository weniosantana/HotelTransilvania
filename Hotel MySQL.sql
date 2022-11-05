create database hotel;
use hotel;

create table tb_hospede(
	cpf varchar(14) primary key,
    nome varchar(100) not null,
    email varchar(100)  not null,
    telefone varchar(11) not null,
    usuario varchar(50) unique,
	data_nasc date not null,
    senha varchar(20) not null
);

create table tb_garagem(
	num_garagem int not null auto_increment,
    tipo_garagem varchar(20) not null,
    primary key (num_garagem)
);

create table tb_visitante (
	cpf_visitante varchar(14),
    nome_visitante varchar(100) not null,
    hora_entrada varchar(5) null,
    hora_saida varchar(5) null,
    primary key (cpf_visitante)
);

create table tb_quarto (
	num_quarto int not null auto_increment,
    tipo_quarto varchar(100) not null,
    descricao_quarto varchar(1000) not null,
    preco_quarto varchar (10) not null,
    primary key (num_quarto)
);

create table tb_demonstrativo (
	servicos_hotel varchar(30) primary key
);

create table tb_reserva(
	cpf varchar(14),
    num_quarto int not null,
    cpf_visitante varchar(14) null,
    num_garagem  int null,
    data_checkin date not null,
    hora_checkin varchar(5) not null,
    data_checkout date null,
    hora_checkout varchar(5) null,
    primary key (cpf, num_quarto),
    foreign key (cpf) references tb_hospede (cpf),
    foreign key (num_quarto) references tb_quarto (num_quarto),
    foreign key (cpf_visitante) references tb_visitante (cpf_visitante),
    foreign key (num_garagem) references tb_garagem (num_garagem)
);

-- Informacoes tabela hospede
insert into tb_hospede values ('111.222.333-44', 'admin', 'admin@gmail.com', '4002-8922', 'admin','2022-10-30','admin');

-- Informacoes tabela demonstrativo
insert into tb_demonstrativo values ('Bar');
insert into tb_demonstrativo values ('Restaurante');
insert into tb_demonstrativo values ('Serviço de Quarto');
insert into tb_demonstrativo values ('Area de jogos');
insert into tb_demonstrativo values ('Piscina');
insert into tb_demonstrativo values ('Quadra de esportes');
insert into tb_demonstrativo values ('Eventos');