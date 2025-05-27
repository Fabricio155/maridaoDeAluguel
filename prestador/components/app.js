// Arquivo principal para inicializar e gerenciar todos os componentes
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar o estado global da aplicação
  window.appState = {
    currentUser: {
      nome: 'Carlos Silva',
      email: 'carlos.silva@email.com',
      telefone: '(11) 98765-4321',
      endereco: 'Av. Paulista, 1000',
      foto: 'https://randomuser.me/api/portraits/men/75.jpg',
      especialidade: 'Manutenção Geral',
      descricao: 'Profissional com mais de 10 anos de experiência em manutenção residencial e comercial.'
    },
    agendamentos: [
      { id: 1, nome: 'Ana Costa', servico: 'Manutenção de ar condicionado', horario: '16:00', status: 'confirmado', data: '2025-05-27' },
      { id: 2, nome: 'Lucas Sauza', servico: 'Reparo elétrico', horario: '16:00', status: 'pendente', data: '2025-05-27' },
      { id: 3, nome: 'Marlana Lima', servico: 'Instalação de fechadura', horario: '06:00', status: 'confirmado', data: '2025-05-27' },
      { id: 4, nome: 'Pedro Martins', servico: 'Limpeza residencial', horario: '11:30', status: 'pendente', data: '2025-05-27' },
      { id: 5, nome: 'Roberto Almeida', servico: 'Reparo hidráulico', horario: '09:30', status: 'confirmado', data: '2025-05-28' },
      { id: 6, nome: 'Carla Mendes', servico: 'Montagem de móveis', horario: '14:00', status: 'pendente', data: '2025-05-28' }
    ],
    servicos: [
      { id: 1, titulo: 'Manutenção de Ar Condicionado', descricao: 'Limpeza, verificação e manutenção preventiva de aparelhos de ar condicionado residenciais e comerciais.', preco: '180,00', duracao: '2 horas', icone: '🔧' },
      { id: 2, titulo: 'Reparo Elétrico', descricao: 'Instalação e reparo de tomadas, interruptores, disjuntores e fiação elétrica em geral.', preco: '120,00', duracao: '1,5 horas', icone: '⚡' },
      { id: 3, titulo: 'Instalação de Fechadura', descricao: 'Instalação, substituição e reparo de fechaduras convencionais e eletrônicas.', preco: '150,00', duracao: '1 hora', icone: '🔒' },
      { id: 4, titulo: 'Limpeza Residencial', descricao: 'Limpeza completa de residências, incluindo pisos, janelas, banheiros e cozinha.', preco: '200,00', duracao: '4 horas', icone: '🧹' },
      { id: 5, titulo: 'Reparo Hidráulico', descricao: 'Conserto de vazamentos, desentupimento de pias e ralos, instalação de torneiras e chuveiros.', preco: '140,00', duracao: '2 horas', icone: '🚿' },
      { id: 6, titulo: 'Montagem de Móveis', descricao: 'Montagem e instalação de móveis residenciais e comerciais.', preco: '160,00', duracao: '3 horas', icone: '🔨' }
    ],
    clientes: [
      { id: 1, nome: 'Ana Costa', telefone: '(11) 98765-4321', email: 'ana.costa@email.com', endereco: 'Rua das Flores, 123', foto: 'https://randomuser.me/api/portraits/women/65.jpg', status: 'ativo' },
      { id: 2, nome: 'Lucas Sauza', telefone: '(11) 97654-3210', email: 'lucas.sauza@email.com', endereco: 'Av. Principal, 456', foto: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'ativo' },
      { id: 3, nome: 'Marlana Lima', telefone: '(11) 96543-2109', email: 'marlana.lima@email.com', endereco: 'Rua Secundária, 789', foto: 'https://randomuser.me/api/portraits/women/45.jpg', status: 'ativo' },
      { id: 4, nome: 'Pedro Martins', telefone: '(11) 95432-1098', email: 'pedro.martins@email.com', endereco: 'Alameda Central, 321', foto: 'https://randomuser.me/api/portraits/men/22.jpg', status: 'ativo' }
    ],
    eventos: [
      { id: 1, dia: 5, texto: 'João Silva - 09:00', cancelado: false },
      { id: 2, dia: 5, texto: 'Maria Oliveira - 14:30', cancelado: false },
      { id: 3, dia: 7, texto: 'Roberto Almeida - 10:00', cancelado: false },
      { id: 4, dia: 12, texto: 'Carla Mendes - 11:30', cancelado: false },
      { id: 5, dia: 15, texto: 'Lúcia Torres - 15:00', cancelado: false },
      { id: 6, dia: 19, texto: 'Fernando Santos - 08:30', cancelado: false },
      { id: 7, dia: 19, texto: 'Juliana Pereira - 13:00', cancelado: true },
      { id: 8, dia: 23, texto: 'Ricardo Gomes - 16:30', cancelado: false },
      { id: 9, dia: 26, texto: 'Beatriz Lima - 10:30', cancelado: false },
      { id: 10, dia: 27, texto: 'Ana Costa - 16:00', cancelado: false },
      { id: 11, dia: 27, texto: 'Lucas Sauza - 16:00', cancelado: false },
      { id: 12, dia: 27, texto: 'Marlana Lima - 06:00', cancelado: false },
      { id: 13, dia: 27, texto: 'Pedro Martins - 11:30', cancelado: false },
      { id: 14, dia: 28, texto: 'Roberto Almeida - 09:30', cancelado: false },
      { id: 15, dia: 28, texto: 'Carla Mendes - 14:00', cancelado: false }
    ],
    estatisticas: {
      servicosRealizados: 127,
      faturamento: 'R$8.450',
      avaliacaoMedia: '4.8',
      totalAvaliacoes: 98
    }
  };

  // Configurar manipuladores de eventos globais
  setupGlobalEventHandlers();
  
  // Inicializar a página atual com base no nome do arquivo
  initCurrentPage();
});

// Configurar manipuladores de eventos globais para toda a aplicação
function setupGlobalEventHandlers() {
  // Manipulação de eventos dos agendamentos
  document.addEventListener('agendamento-action', function(e) {
    console.log('Ação no agendamento:', e.detail);
    
    // Implementar lógica real para cada ação
    const { action, nome, status, id } = e.detail;
    
    switch(action) {
      case 'confirmar':
        alert(`Agendamento com ${nome} confirmado com sucesso!`);
        // Atualizar o status do agendamento no estado global
        updateAgendamentoStatus(id || nome, 'confirmado');
        break;
      case 'reagendar':
        const novaData = prompt(`Informe a nova data para o agendamento com ${nome}:`, '28/05/2025');
        const novoHorario = prompt(`Informe o novo horário para o agendamento com ${nome}:`, '10:00');
        if (novaData && novoHorario) {
          alert(`Agendamento com ${nome} reagendado para ${novaData} às ${novoHorario}`);
        }
        break;
      case 'cancelar':
        if (confirm(`Tem certeza que deseja cancelar o agendamento com ${nome}?`)) {
          alert(`Agendamento com ${nome} cancelado com sucesso!`);
          // Atualizar o status do agendamento no estado global
          updateAgendamentoStatus(id || nome, 'cancelado');
        }
        break;
      case 'iniciar':
        alert(`Serviço com ${nome} iniciado! Um cronômetro será iniciado.`);
        break;
      default:
        alert(`Ação "${action}" realizada para ${nome}`);
    }
    
    // Recarregar a página para refletir as mudanças (em uma aplicação real, usaríamos atualização reativa)
    if (['confirmar', 'cancelar'].includes(action)) {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  });
  
  // Manipulação de eventos dos clientes
  document.addEventListener('cliente-action', function(e) {
    console.log('Ação no cliente:', e.detail);
    
    const { action, nome } = e.detail;
    
    switch(action) {
      case 'agendar':
        const servico = prompt(`Selecione o serviço para ${nome}:`, 'Manutenção de Ar Condicionado');
        const data = prompt(`Informe a data para o agendamento com ${nome}:`, '28/05/2025');
        const horario = prompt(`Informe o horário para o agendamento com ${nome}:`, '10:00');
        
        if (servico && data && horario) {
          alert(`Novo agendamento criado para ${nome}:\nServiço: ${servico}\nData: ${data}\nHorário: ${horario}`);
          // Em uma aplicação real, adicionaríamos ao estado global e persistiríamos no backend
        }
        break;
      case 'historico':
        alert(`Exibindo histórico de serviços para ${nome}`);
        // Em uma aplicação real, redirecionaríamos para uma página de histórico ou abriríamos um modal
        break;
      default:
        alert(`Ação "${action}" realizada para ${nome}`);
    }
  });
  
  // Manipulação de eventos do calendário
  document.addEventListener('calendario-view-change', function(e) {
    console.log('Visualização do calendário alterada para:', e.detail.view);
    alert(`Visualização alterada para: ${e.detail.view}`);
  });
  
  document.addEventListener('calendario-month-change', function(e) {
    console.log('Navegação do calendário:', e.detail.direction);
    alert(`Navegando para ${e.detail.direction === 'prev' ? 'mês anterior' : 'próximo mês'}`);
  });
  
  document.addEventListener('calendario-evento-click', function(e) {
    console.log('Evento do calendário clicado:', e.detail);
    alert(`Detalhes do evento: ${e.detail.texto}`);
  });
  
  // Manipulação de eventos do perfil
  document.addEventListener('profile-save', function(e) {
    console.log('Dados do perfil para salvar:', e.detail);
    
    // Validar os dados do formulário
    if (!e.detail.nome || !e.detail.email) {
      alert('Por favor, preencha os campos obrigatórios: Nome e E-mail');
      return;
    }
    
    // Validar senha se estiver sendo alterada
    if (e.detail.senha) {
      if (e.detail.senha !== e.detail.confirmarSenha) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
      }
      if (e.detail.senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
    }
    
    // Atualizar o estado global com os novos dados
    window.appState.currentUser = {
      ...window.appState.currentUser,
      nome: e.detail.nome,
      email: e.detail.email,
      telefone: e.detail.telefone,
      endereco: e.detail.endereco,
      especialidade: e.detail.especialidade,
      descricao: e.detail.descricao
    };
    
    alert('Perfil atualizado com sucesso!');
    
    // Redirecionar para o painel após salvar
    setTimeout(() => {
      window.location.href = 'painel.html';
    }, 1000);
  });
  
  document.addEventListener('profile-cancel', function() {
    console.log('Edição de perfil cancelada');
    if (confirm('Deseja cancelar as alterações? Todas as modificações serão perdidas.')) {
      window.location.href = 'painel.html';
    }
  });
  
  document.addEventListener('profile-photo-change', function() {
    console.log('Solicitação para alterar foto de perfil');
    
    // Simular um seletor de arquivo
    const novaFoto = prompt('Informe a URL da nova foto de perfil:', 'https://randomuser.me/api/portraits/men/85.jpg');
    
    if (novaFoto) {
      // Atualizar a foto no estado global
      window.appState.currentUser.foto = novaFoto;
      
      // Atualizar a foto na interface (em uma aplicação real, usaríamos atualização reativa)
      const fotoElements = document.querySelectorAll('profile-form');
      if (fotoElements.length > 0) {
        alert('Foto de perfil atualizada com sucesso!');
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    }
  });
}

// Inicializar a página atual com base no nome do arquivo
function initCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  
  switch(currentPage) {
    case 'painel':
      initPainelPage();
      break;
    case 'servicos':
      initServicosPage();
      break;
    case 'agendamentos':
      initAgendamentosPage();
      break;
    case 'clientes':
      initClientesPage();
      break;
    case 'calendario':
      initCalendarioPage();
      break;
    case 'perfil':
      initPerfilPage();
      break;
  }
}

// Inicializar a página de painel
function initPainelPage() {
  // Preencher os cards de estatísticas com dados reais
  const statCards = document.querySelectorAll('stat-card');
  if (statCards.length >= 3) {
    statCards[0].setAttribute('value', window.appState.estatisticas.servicosRealizados);
    statCards[1].setAttribute('value', window.appState.estatisticas.faturamento);
    statCards[2].setAttribute('value', window.appState.estatisticas.avaliacaoMedia);
    statCards[2].setAttribute('sublabel', `De ${window.appState.estatisticas.totalAvaliacoes} avaliações`);
  }
  
  // Preencher os agendamentos do dia atual
  const agendamentosHoje = window.appState.agendamentos.filter(a => a.data === '2025-05-27');
  const agendamentoCards = document.querySelectorAll('agendamento-card');
  
  agendamentosHoje.forEach((agendamento, index) => {
    if (index < agendamentoCards.length) {
      agendamentoCards[index].setAttribute('nome', agendamento.nome);
      agendamentoCards[index].setAttribute('servico', agendamento.servico);
      agendamentoCards[index].setAttribute('horario', agendamento.horario);
      agendamentoCards[index].setAttribute('status', agendamento.status);
    }
  });
}

// Inicializar a página de serviços
function initServicosPage() {
  // Adicionar funcionalidade ao botão de adicionar serviço
  const btnAdicionarServico = document.querySelector('.adicionar-servico');
  if (btnAdicionarServico) {
    btnAdicionarServico.addEventListener('click', function() {
      const titulo = prompt('Título do serviço:');
      const descricao = prompt('Descrição do serviço:');
      const preco = prompt('Preço (R$):');
      const duracao = prompt('Duração média:');
      const icone = prompt('Ícone (emoji):', '🔧');
      
      if (titulo && descricao && preco) {
        alert(`Novo serviço adicionado:\nTítulo: ${titulo}\nPreço: R$ ${preco}`);
        
        // Em uma aplicação real, adicionaríamos ao estado global e persistiríamos no backend
        window.appState.servicos.push({
          id: window.appState.servicos.length + 1,
          titulo,
          descricao,
          preco,
          duracao,
          icone
        });
        
        // Recarregar a página para mostrar o novo serviço
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
  }
  
  // Preencher os cards de serviços com dados reais
  const servicoCards = document.querySelectorAll('servico-card');
  window.appState.servicos.forEach((servico, index) => {
    if (index < servicoCards.length) {
      servicoCards[index].setAttribute('titulo', servico.titulo);
      servicoCards[index].setAttribute('descricao', servico.descricao);
      servicoCards[index].setAttribute('preco', servico.preco);
      servicoCards[index].setAttribute('duracao', servico.duracao);
      servicoCards[index].setAttribute('icone', servico.icone);
    }
  });
}

// Inicializar a página de agendamentos
function initAgendamentosPage() {
  // Adicionar funcionalidade aos filtros
  const filtros = document.querySelectorAll('.filtro-btn');
  if (filtros.length > 0) {
    filtros.forEach(filtro => {
      filtro.addEventListener('click', function() {
        document.querySelectorAll('.filtro-btn').forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        const filtroSelecionado = this.textContent.toLowerCase();
        console.log('Filtro selecionado:', filtroSelecionado);
        
        // Filtrar os agendamentos com base no filtro selecionado
        const agendamentoCards = document.querySelectorAll('agendamento-card');
        
        agendamentoCards.forEach(card => {
          const status = card.getAttribute('status');
          
          if (filtroSelecionado === 'todos') {
            card.style.display = 'block';
          } else if (filtroSelecionado === 'pendentes' && status === 'pendente') {
            card.style.display = 'block';
          } else if (filtroSelecionado === 'confirmados' && status === 'confirmado') {
            card.style.display = 'block';
          } else if (filtroSelecionado === 'concluídos' && status === 'concluido') {
            card.style.display = 'block';
          } else if (filtroSelecionado === 'cancelados' && status === 'cancelado') {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Adicionar funcionalidade aos botões de navegação do calendário
  const btnNavegacao = document.querySelectorAll('.calendario-btn');
  if (btnNavegacao.length >= 2) {
    // Botão anterior
    btnNavegacao[0].addEventListener('click', function() {
      alert('Navegando para o dia anterior');
    });
    
    // Botão próximo
    btnNavegacao[1].addEventListener('click', function() {
      alert('Navegando para o próximo dia');
    });
  }
}

// Inicializar a página de clientes
function initClientesPage() {
  // Adicionar funcionalidade à pesquisa
  const pesquisaInput = document.querySelector('.pesquisa-input');
  const pesquisaBtn = document.querySelector('.pesquisa-btn');
  
  if (pesquisaInput && pesquisaBtn) {
    pesquisaBtn.addEventListener('click', function() {
      const termo = pesquisaInput.value.toLowerCase();
      if (!termo) {
        alert('Por favor, digite um termo de busca');
        return;
      }
      
      // Filtrar os clientes com base no termo de busca
      const clienteCards = document.querySelectorAll('cliente-card');
      let encontrados = 0;
      
      clienteCards.forEach(card => {
        const nome = card.getAttribute('nome').toLowerCase();
        const telefone = card.getAttribute('telefone').toLowerCase();
        const email = card.getAttribute('email').toLowerCase();
        
        if (nome.includes(termo) || telefone.includes(termo) || email.includes(termo)) {
          card.style.display = 'block';
          encontrados++;
        } else {
          card.style.display = 'none';
        }
      });
      
      alert(`${encontrados} cliente(s) encontrado(s) para "${termo}"`);
    });
    
    // Permitir pesquisa ao pressionar Enter
    pesquisaInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        pesquisaBtn.click();
      }
    });
  }
  
  // Adicionar funcionalidade ao botão de adicionar cliente
  const btnAdicionarCliente = document.querySelector('.adicionar-cliente');
  if (btnAdicionarCliente) {
    btnAdicionarCliente.addEventListener('click', function() {
      const nome = prompt('Nome do cliente:');
      const telefone = prompt('Telefone:');
      const email = prompt('E-mail:');
      const endereco = prompt('Endereço:');
      
      if (nome && telefone && email) {
        alert(`Novo cliente adicionado:\nNome: ${nome}\nTelefone: ${telefone}\nE-mail: ${email}`);
        
        // Em uma aplicação real, adicionaríamos ao estado global e persistiríamos no backend
        window.appState.clientes.push({
          id: window.appState.clientes.length + 1,
          nome,
          telefone,
          email,
          endereco,
          foto: 'https://randomuser.me/api/portraits/lego/1.jpg',
          status: 'ativo'
        });
        
        // Recarregar a página para mostrar o novo cliente
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
  }
}

// Inicializar a página de calendário
function initCalendarioPage() {
  // Adicionar funcionalidade ao botão de adicionar evento
  const btnAdicionarEvento = document.querySelector('.adicionar-evento');
  if (btnAdicionarEvento) {
    btnAdicionarEvento.addEventListener('click', function() {
      const cliente = prompt('Nome do cliente:');
      const data = prompt('Data (DD/MM/YYYY):', '27/05/2025');
      const horario = prompt('Horário:', '10:00');
      const servico = prompt('Serviço:', 'Manutenção de Ar Condicionado');
      
      if (cliente && data && horario) {
        alert(`Novo evento adicionado:\nCliente: ${cliente}\nData: ${data}\nHorário: ${horario}\nServiço: ${servico}`);
        
        // Em uma aplicação real, adicionaríamos ao estado global e persistiríamos no backend
        
        // Recarregar a página para mostrar o novo evento
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
  }
}

// Inicializar a página de perfil
function initPerfilPage() {
  // Preencher o formulário de perfil com dados reais do usuário
  const profileForm = document.querySelector('profile-form');
  if (profileForm) {
    const user = window.appState.currentUser;
    
    profileForm.setAttribute('nome', user.nome);
    profileForm.setAttribute('email', user.email);
    profileForm.setAttribute('telefone', user.telefone);
    profileForm.setAttribute('endereco', user.endereco);
    profileForm.setAttribute('foto', user.foto);
    profileForm.setAttribute('especialidade', user.especialidade);
    profileForm.setAttribute('descricao', user.descricao);
  }
}

// Função auxiliar para atualizar o status de um agendamento
function updateAgendamentoStatus(identificador, novoStatus) {
  // Procurar o agendamento pelo ID ou nome
  const agendamento = window.appState.agendamentos.find(a => 
    a.id === identificador || a.nome === identificador
  );
  
  if (agendamento) {
    agendamento.status = novoStatus;
    console.log(`Status do agendamento atualizado: ${agendamento.nome} -> ${novoStatus}`);
  }
}
