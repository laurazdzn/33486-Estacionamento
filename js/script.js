document.addEventListener('DOMContentLoaded', () => {

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

    const corpo = JSON.stringify({ model: modelo, plate: placa });
    console.log('JSON enviado:', corpo);

    fetch('http://cnms-parking-api.net.uztec.com.br/api/v1/entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: corpo
    })
    .then(async res => {
      if (!res.ok) {
        const erroJson = await res.json();
        console.error('Erro detalhado da API:', erroJson);
        throw new Error(erroJson.error || 'Falha ao registrar entrada.');
      }
      return res.json();
    })
    .then(data => mostrarResultado('Entrada registrada com sucesso!'))
    .catch(err => mostrarResultado(err.message));
  });

// Registrar Saída
document.getElementById('btnRegistrarSaida').addEventListener('click', () => {
  const placa = document.getElementById('saidaPlaca').value.trim();

  if (!placa) {
    mostrarResultado('Por favor, preencha a placa.');
    return;
  }

  fetch(`http://cnms-parking-api.net.uztec.com.br/api/v1/exit/${encodeURIComponent(placa)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (!res.ok) throw new Error('Falha ao registrar saída.');
    return res.json();
  })
  .then(data => mostrarResultado('Saída registrada com sucesso!'))
  .catch(() => mostrarResultado('Não foi possível registrar saída.'));
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

  fetch(`http://cnms-parking-api.net.uztec.com.br/api/v1/update/${encodeURIComponent(placaAtual)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newModel: novoModelo,
      newPlate: novaPlaca
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

  fetch(`http://cnms-parking-api.net.uztec.com.br/api/v1/time/${encodeURIComponent(placa)}`, {
    method: 'GET',
  })
  .then(res => {
    if (!res.ok) throw new Error('Placa não encontrada.');
    return res.json();
  })
  .then(data => mostrarResultado(`Tempo de permanência: ${data.parkedTime.toFixed(2)}`))
  .catch(() => mostrarResultado('Não foi possível consultar o tempo de permanência.'));
});

// Verificar Veículo
document.getElementById('btnVerificar').addEventListener('click', () => {
  const placa = document.getElementById('verificarPlaca').value.trim();

  if (!placa) {
    mostrarResultado('Por favor, preencha a placa.');
    return;
  }

  fetch(`http://cnms-parking-api.net.uztec.com.br/api/v1/check/${encodeURIComponent(placa)}`, {
    method: 'GET',
  })
  .then(res => {
    if (!res.ok) throw new Error('Não foi possível verificar veículo.');
    return res.json();
  })
  .then(data => {
    if (data.entryTime) {
      mostrarResultado('Seu veículo está no estacionamento.');
    } else {
      mostrarResultado('Seu veículo não está no estacionamento.');
    }
  })
  .catch(() => mostrarResultado('Seu veículo não está no estacionamento.'));
});

   // Cancelar Registro
  document.getElementById('btnCancelarRegistro').addEventListener('click', () => {
    const placa = document.getElementById('cancelarPlaca').value.trim();

    if (!placa) {
      mostrarResultado('Por favor, preencha a placa.');
      return;
    }

    fetch(`http://cnms-parking-api.net.uztec.com.br/api/v1/cancel/${encodeURIComponent(placa)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Falha ao cancelar registro.');
        return res.json();
      })
      .then(data => mostrarResultado('Registro cancelado com sucesso!'))
      .catch(() => mostrarResultado('Não foi possível cancelar registro.'));
  });

});
