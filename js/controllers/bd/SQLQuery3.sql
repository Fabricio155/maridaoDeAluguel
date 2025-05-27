
-- 1-índices para Facilitar a Busca de um Usuário pelo E-mail (Login Mais Rápido)

CREATE INDEX idx_usuarios_email ON Usuarios(email);

CREATE INDEX idx_ordens_status ON OrdensServico(status);

-- 2-Trigger  Quando um Pagamento for Feito, Mudar o Status da Ordem para "Concluído"

CREATE TRIGGER trg_atualiza_status_ordem
ON Pagamentos
AFTER INSERT
AS
BEGIN
    UPDATE OrdensServico
    SET status = 'Concluído'
    WHERE id_ordem IN (SELECT id_ordem FROM inserted);
END;

-- 3- Procedure Para Cadastrar Usuários Fácil

CREATE PROCEDURE sp_inserir_usuario
    @nome VARCHAR(100),
    @email VARCHAR(100),
    @telefone VARCHAR(20),
    @cpf CHAR(11),
    @tipo_usuario VARCHAR(20),
    @senha_hash VARCHAR(255)
AS
BEGIN
    INSERT INTO Usuarios (nome, email, telefone, cpf, tipo_usuario, senha_hash)
    VALUES (@nome, @email, @telefone, @cpf, @tipo_usuario, @senha_hash);
END;
EXEC sp_inserir_usuario 'Carlos Souza', 'carlos@email.com', '11999887766', '12312312312', 'Cliente', 'senha123';

-- 4 -View para ver ordens de serviço rapidamente

CREATE VIEW vw_ordens_detalhadas AS
SELECT O.id_ordem, C.nome AS Cliente, P.nome AS Profissional, S.nome_servico, O.status
FROM OrdensServico O
JOIN Usuarios C ON O.id_cliente = C.id_usuario
JOIN Usuarios P ON O.id_profissional = P.id_usuario
JOIN Servicos S ON O.id_servico = S.id_servico;

SELECT * FROM vw_ordens_detalhadas;

-- 5 -Backup 

BACKUP DATABASE MaridoDeAluguel
TO DISK = 'C:\Backups\MaridoDeAluguel.bak'
WITH FORMAT, INIT, NAME = 'Backup Completo';

--Restarar

RESTORE DATABASE MaridoDeAluguel
FROM DISK = 'C:\Backups\MaridoDeAluguel.bak'
WITH REPLACE;

