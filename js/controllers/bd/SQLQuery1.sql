--BANCO DE DADOS PROJETO


--CRIA��O DO BANCO
CREATE DATABASE MaridoDeAluguel;
GO
USE MaridoDeAluguel;

--TABELA DO USUARIOS
CREATE TABLE Usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador �nico
    nome VARCHAR(100) NOT NULL,  -- Nome do usu�rio
    email VARCHAR(100) UNIQUE NOT NULL,  -- E-mail (deve ser �nico)
    telefone VARCHAR(20),  -- Telefone de contato
    cpf CHAR(11) UNIQUE NOT NULL,  -- CPF �nico para cada usu�rio
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('Cliente', 'Profissional')),  -- Cliente ou Profissional
    senha_hash VARCHAR(255) NOT NULL  -- Senha (armazenada com hash)
);
GO

--Tabela de Servi�os

CREATE TABLE Servicos (
    id_servico INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador �nico do servi�o
    nome_servico VARCHAR(100) NOT NULL,  -- Nome do servi�o (ex: "Reparo El�trico")
    descricao TEXT,  -- Descri��o do servi�o
    preco_base DECIMAL(10,2) NOT NULL  -- Pre�o inicial do servi�o
);
GO
select * from Servicos

--TABELA DE Ordens DE Servi�o

CREATE TABLE OrdensServico (
    id_ordem INT IDENTITY(1,1) PRIMARY KEY,  -- N�mero �nico para cada ordem de servi�o
    id_cliente INT NOT NULL,  -- Cliente que pediu o servi�o
    id_profissional INT NOT NULL,  -- Profissional que far� o servi�o
    id_servico INT NOT NULL,  -- Tipo de servi�o solicitado
    data_solicitacao DATETIME DEFAULT GETDATE(),  -- Data e hora do pedido
    status VARCHAR(20) NOT NULL CHECK (status IN 
        ('Pendente', 'Em andamento', 'Conclu�do', 'Cancelado')  
    ),  -- Status do servi�o
    descricao TEXT,  -- Informa��es extras sobre o servi�o

    -- Relacionamento com outras tabelas:
    FOREIGN KEY (id_cliente) REFERENCES Usuarios(id_usuario),  
    FOREIGN KEY (id_profissional) REFERENCES Usuarios(id_usuario),  
    FOREIGN KEY (id_servico) REFERENCES Servicos(id_servico)  
);
GO
select * from OrdensServico






--TABELA DE AVALIA��O

CREATE TABLE Avaliacoes (
    id_avaliacao INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador �nico da avalia��o
    id_ordem INT NOT NULL,  -- Ordem de servi�o avaliada
    id_cliente INT NOT NULL,  -- Cliente que fez a avalia��o
    nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),  -- Nota de 1 a 5
    comentario TEXT,  -- Coment�rio opcional
    FOREIGN KEY (id_ordem) REFERENCES OrdensServico(id_ordem),  -- Relacionamento com Ordens de Servi�o
    FOREIGN KEY (id_cliente) REFERENCES Usuarios(id_usuario)
);
GO
select * from Avaliacoes

--TABELA DE PAGAMENTO

CREATE TABLE Pagamentos (
    id_pagamento INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador �nico do pagamento
    id_ordem INT NOT NULL,  -- Ordem de servi�o paga
    valor DECIMAL(10,2) NOT NULL,  -- Valor pago
    metodo_pagamento VARCHAR(50) NOT NULL CHECK (metodo_pagamento IN ('Cart�o de Cr�dito', 'Boleto', 'Pix')),  -- M�todo de pagamento
    data_pagamento DATETIME DEFAULT GETDATE(),  -- Data do pagamento
    FOREIGN KEY (id_ordem) REFERENCES OrdensServico(id_ordem)  -- Relacionamento com Ordens de Servi�o
);
GO
select * from Pagamentos




