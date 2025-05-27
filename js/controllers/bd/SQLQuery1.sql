--BANCO DE DADOS PROJETO


--CRIAÇÃO DO BANCO
CREATE DATABASE MaridoDeAluguel;
GO
USE MaridoDeAluguel;

--TABELA DO USUARIOS

CREATE TABLE Usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador único
    nome VARCHAR(100) NOT NULL,  -- Nome do usuário
    email VARCHAR(100) UNIQUE NOT NULL,  -- E-mail (deve ser único)
    telefone VARCHAR(20),  -- Telefone de contato
    cpf CHAR(11) UNIQUE NOT NULL,  -- CPF único para cada usuário
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('Cliente', 'Profissional')),  -- Cliente ou Profissional
    senha_hash VARCHAR(255) NOT NULL  -- Senha (armazenada com hash)
);
GO

--Tabela de Serviços

CREATE TABLE Servicos (
    id_servico INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador único do serviço
    nome_servico VARCHAR(100) NOT NULL,  -- Nome do serviço (ex: "Reparo Elétrico")
    descricao TEXT,  -- Descrição do serviço
    preco_base DECIMAL(10,2) NOT NULL  -- Preço inicial do serviço
);
GO
select * from Servicos

--TABELA DE Ordens DE Serviço

CREATE TABLE OrdensServico (
    id_ordem INT IDENTITY(1,1) PRIMARY KEY,  -- Número único para cada ordem de serviço
    id_cliente INT NOT NULL,  -- Cliente que pediu o serviço
    id_profissional INT NOT NULL,  -- Profissional que fará o serviço
    id_servico INT NOT NULL,  -- Tipo de serviço solicitado
    data_solicitacao DATETIME DEFAULT GETDATE(),  -- Data e hora do pedido
    status VARCHAR(20) NOT NULL CHECK (status IN 
        ('Pendente', 'Em andamento', 'Concluído', 'Cancelado')  
    ),  -- Status do serviço
    descricao TEXT,  -- Informações extras sobre o serviço

    -- Relacionamento com outras tabelas:
    FOREIGN KEY (id_cliente) REFERENCES Usuarios(id_usuario),  
    FOREIGN KEY (id_profissional) REFERENCES Usuarios(id_usuario),  
    FOREIGN KEY (id_servico) REFERENCES Servicos(id_servico)  
);
GO
select * from OrdensServico






--TABELA DE AVALIAÇÃO

CREATE TABLE Avaliacoes (
    id_avaliacao INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador único da avaliação
    id_ordem INT NOT NULL,  -- Ordem de serviço avaliada
    id_cliente INT NOT NULL,  -- Cliente que fez a avaliação
    nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),  -- Nota de 1 a 5
    comentario TEXT,  -- Comentário opcional
    FOREIGN KEY (id_ordem) REFERENCES OrdensServico(id_ordem),  -- Relacionamento com Ordens de Serviço
    FOREIGN KEY (id_cliente) REFERENCES Usuarios(id_usuario)
);
GO
select * from Avaliacoes

--TABELA DE PAGAMENTO

CREATE TABLE Pagamentos (
    id_pagamento INT IDENTITY(1,1) PRIMARY KEY,  -- Identificador único do pagamento
    id_ordem INT NOT NULL,  -- Ordem de serviço paga
    valor DECIMAL(10,2) NOT NULL,  -- Valor pago
    metodo_pagamento VARCHAR(50) NOT NULL CHECK (metodo_pagamento IN ('Cartão de Crédito', 'Boleto', 'Pix')),  -- Método de pagamento
    data_pagamento DATETIME DEFAULT GETDATE(),  -- Data do pagamento
    FOREIGN KEY (id_ordem) REFERENCES OrdensServico(id_ordem)  -- Relacionamento com Ordens de Serviço
);
GO
select * from Pagamentos




