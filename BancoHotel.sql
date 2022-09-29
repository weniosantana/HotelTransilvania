CREATE TABLE TB_HOSPEDE(
    CPF VARCHAR2(11),
    NOME VARCHAR2(50) CONSTRAINT TB_HOSPEDE_NOME_NN NOT NULL,
    EMAIL VARCHAR2(50) CONSTRAINT TB_HOSPEDE_EMAIL_UN UNIQUE,
    TELEFONE VARCHAR2(11) CONSTRAINT TB_HOSPEDE_TELEFONE_NN NOT NULL,
    USUARIO VARCHAR2(50) CONSTRAINT TB_HOSPEDE_USUARIO_UN UNIQUE,
    DATA_NASC VARCHAR2(10) CONSTRAINT TB_HOSPEDE_DATA_NASC_NN NOT NULL,
    SENHA VARCHAR2(16) CONSTRAINT TB_HOSPEDE_SENHA_NN NOT NULL, 
    CONSTRAINT TB_HOSPEDE_CPF_PK PRIMARY KEY (CPF)
);

CREATE TABLE TB_QUARTO(
    NUM_QUARTO VARCHAR2(5),
    DISPONIBILIDADE CHAR DEFAULT (1) CHECK(DISPONIBILIDADE in ( '1', '0' )),/* 1 para disponivel e 0 para indisponivel*/
    TIPO_QUARTO VARCHAR2(15) CONSTRAINT TB_QUARTO_TIPO_QUARTO_NN NOT NULL,
    DESCRICAO_QUARTO VARCHAR2(200) CONSTRAINT TB_QUARTO_DESCRICAO_QUARTO_NN NOT NULL,
    IMG_QUARTO VARCHAR2(100) CONSTRAINT TB_QUARTO_IMG_QUARTO_NN NOT NULL,
    PRECO_QUARTO VARCHAR2(5) CONSTRAINT TB_QUARTO_PRECO_QUARTO_NN NOT NULL,
    CONSTRAINT TB_QUARTO_NUM_QUARTO_PK PRIMARY KEY (NUM_QUARTO)
);

CREATE TABLE TB_RESERVA(
    CPF VARCHAR2(11),
    NUM_QUARTO VARCHAR2(5),
    DATA_CHECKIN VARCHAR2(10) CONSTRAINT TB_RESERVA_DATA_CHECKIN_NN NOT NULL,
    HORA_CHECKIN VARCHAR2(5) CONSTRAINT TB_RESERVA_HORA_CHECKIN_NN NOT NULL,
    DATA_CHECKOUT VARCHAR2(10) CONSTRAINT TB_RESERVA_DATA_CHECKOUT_NN NOT NULL,
    HORA_CHECKOUT VARCHAR2(5) CONSTRAINT TB_RESERVA_HORA_CHECKOUT_NN NOT NULL,
    CONSTRAINT TB_RESERVA_RESERVANDO_PK PRIMARY KEY (CPF, NUM_QUARTO),
    CONSTRAINT TB_RESERVA_CPF_FK FOREIGN KEY (CPF) REFERENCES TB_HOSPEDE (CPF),
    CONSTRAINT TB_RESERVA_NUM_QUARTO_FK FOREIGN KEY (NUM_QUARTO) REFERENCES TB_QUARTO (NUM_QUARTO)
);