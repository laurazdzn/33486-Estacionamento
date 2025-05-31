document.addEventListener('DOMContentLoaded', () => {

  // Função para mostrar resultado 
  function mostrarResultado(msg) {
    alert(msg);
  }

  // Registrar Entrada
  document.getElementById('btnRegistrarEntrada').addEventListener('click', () => {
    const modelo = document.getElementById('entradaModelo').value.trim();
    const placa = document.getElementById('entradaPlaca').value.trim();

    if (!modelo || !placa) {
      mostrarResultado('Por favor, preencha modelo e placa.');
      return;
    }

    fetch('http://cnms-parking-api.net.uztec.com.br/api/v1/entry', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({modelo, placa})
    })
    .then(res => {
      if (!res.ok) throw new Error('Falha ao registrar entrada.');
      return res.json();
    })
    .then(data => mostrarResultado('Entrada registrada com sucesso!'))
    .catch(() => mostrarResultado('Erro ao registrar entrada.'));
  });


  // Registrar Saída
  document.getElementById('btnRegistrarSaida').addEventListener('click', () => {
    const placa = document.getElementById('saidaPlaca').value.trim();

    if (!placa) {
      mostrarResultado('Por favor, preencha a placa.');
      return;
    }

    fetch('http://cnms-parking-api.net.uztec.com.br/api/v1/exit/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({placa})
    })
    .then(res => {
      if (!res.ok) throw new Error('Falha ao registrar saída.');
      return res.json();
    })
    .then(data => mostrarResultado('Saída registrada com sucesso!'))
    .catch(() => mostrarResultado('Erro ao registrar saída.'));
  });


  // Atualizar Dados
  document.getElementById('btnAtualizarDados').addEventListener('click', () => {
    const placaAtual = document.getElementById('atualizarPlaca').value.trim();
    const novoModelo = document.getElementById('novoModelo').value.trim();
    const novaPlaca = document.getElementById('novaPlaca').value.trim();

    if (!placaAtual || !novoModelo || !novaPlaca) {
      mostrarResultado('Por favor, preencha todos os campos para atualizar.');
      return;
    }

    fetch('http://cnms-parking-api.net.uztec.com.br/api/v1/update/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        placa_atual: placaAtual,
        novo_modelo: novoModelo,
        nova_placa: novaPlaca
      })
    })
    .then(res => {
      if (!res.ok) throw new Error('Falha ao atualizar dados.');
      return res.json();
    })
    .then(data => mostrarResultado('Dados atualizados com sucesso!'))
    .catch(() => mostrarResultado('Erro ao atualizar dados.'));
  });


  // Tempo de Permanência
  document.getElementById('btnConsultarTempo').addEventListener('click', () => {
    const placa = document.getElementById('tempoPlaca').value.trim();

    if (!placa) {
      mostrarResultado('Por favor, preencha a placa.');
      return;
    }

    fetch(`http://cnms-parking-api.net.uztec.com.br/api/v1/time/?placa=${encodeURIComponent(placa)}`, {
      method: 'GET',
    })
    .then(res => {
      if (!res.ok) throw new Error('Placa não encontrada.');
      return res.json();
    })
    .then(data => mostrarResultado(`Tempo de permanência: ${data.parkedTime.toFixed(2)} horas.`))
    .catch(() => mostrarResultado('Erro ao consultar tempo de permanência.'));
  });


  // Verificar Veículo
  document.getElementById('btnVerificar').addEventListener('click', () => {
    const placa = document.getElementById('verificarPlaca').value.trim();

    if (!placa) {
      mostrarResultado('Por favor, preencha a placa.');
      return;
    }

    fetch(`http://cnms-parking-api.net.uztec.com.br/api/v1/check/?placa=${encodeURIComponent(placa)}`, {
      method: 'GET',
    })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao verificar veículo.');
      return res.json();
    })
    .then(data => {
      const status = data.entryTime ? 'SIM' : 'NÃO';
      mostrarResultado(`Está no estacionamento? ${status}`);
    })
    .catch(() => mostrarResultado('Erro ao verificar veículo.'));
  });


  // Cancelar Registro
  document.getElementById('btnCancelarRegistro').addEventListener('click', () => {
    const placa = document.getElementById('cancelarPlaca').value.trim();

    if (!placa) {
      mostrarResultado('Por favor, preencha a placa.');
      return;
    }

    fetch('http://cnms-parking-api.net.uztec.com.br/api/v1/cancel/', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({placa})
    })
    .then(res => {
      if (!res.ok) throw new Error('Falha ao cancelar registro.');
      return res.json();
    })
    .then(data => mostrarResultado('Registro cancelado com sucesso!'))
    .catch(() => mostrarResultado('Erro ao cancelar registro.'));
  });

});
