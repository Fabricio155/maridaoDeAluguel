--Executando 

EXEC sp_helpindex 'Usuarios';
EXEC sp_helpindex 'OrdensServico';



--Testando a Triggers 

--Verificar se a trigger foi criada corretamente e está registrada no banco de dados.
SELECT * 
FROM sys.triggers 
WHERE name = 'trg_atualiza_status_ordem';

--Inserir o Pagamento e Verificar a Alteração do Status
INSERT INTO Pagamentos (id_ordem, valor, metodo_pagamento) 
VALUES (4, 170.00, 'Pix');

--Verificar o Status da Ordem Após o Pagamento
SELECT id_ordem, status FROM OrdensServico WHERE id_ordem = 4;

--Executando a Procedure
SELECT * FROM Usuarios WHERE nome = 'Carlos Souza';


 -- Restarar
-- Mudar Para o Panco de Dados "Master
 USE master;
GO

--Desconectar o Banco de Dados "MaridoDeAluguel"
ALTER DATABASE MaridoDeAluguel SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

--Realizar a Restauração
RESTORE DATABASE MaridoDeAluguel
FROM DISK = 'C:\Backups\MaridoDeAluguel.bak'
WITH REPLACE;
GO

--Retornar o banco de dados para o modo normal
ALTER DATABASE MaridoDeAluguel SET MULTI_USER;
GO

--Saber se funcionou

--Verificar o banco de dados
SELECT name FROM sys.databases;

--Verificar se as tabelas estão presentes:
USE MaridoDeAluguel;
GO
SELECT name FROM sys.tables;

--Verificar dados do usuario
SELECT * FROM Usuarios;

--Verificar se o banco está no modo Online
SELECT state_desc 
FROM sys.databases 
WHERE name = 'MaridoDeAluguel';









