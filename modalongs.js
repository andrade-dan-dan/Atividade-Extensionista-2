function abrirModal(nomeONG) { // Funcao ao clicar no botao Apoiar
  document.getElementById('modal').style.display = 'flex'; // Mostra o modal
  document.getElementById('modal-text').textContent = 
    'Você escolheu apoiar a ONG "' + nomeONG + '". Veja como ajudar:'; // Atualiza o texto do modal de acordo com a ONG

  var conteudo = ''; // Variável que armazena o conteudo com as informacoes da ONG

  if (nomeONG === 'Amigos de Patinhas') { // Verifica qual ONG foi selecionada e define o conteudo de cada uma
    conteudo = `
      <ul>
        <li>📦 Doações: Ração, remédios, cobertores</li>
        <li>💸 Pix: amigosdepatinhas@ong.org</li>
        <li>📞 (11) 90000-0001</li>
        <li>📷 Instagram: @amigosdepatinhas</li>
      </ul>
    `;
  } else if (nomeONG === 'ABC Animais') {
    conteudo = `
      <ul>
        <li>📦 Doações: Vacinas, ração</li>
        <li>💸 Pix: abc.ong@pix.org</li>
        <li>📞 (11) 90000-0002</li>
        <li>📷 Instagram: @abcanimais</li>
      </ul>
    `;
  } else if (nomeONG === 'Coração Animal') {
    conteudo = `
      <ul>
        <li>📦 Doações: Camas, remédios, brinquedos</li>
        <li>💸 Pix: coracaoanimal@apoio.org</li>
        <li>📞 (11) 90000-0003</li>
        <li>📷 Instagram: @coracaoanimal</li>
      </ul>
    `;
  }

  document.getElementById('modal-options').innerHTML = conteudo; // Insere o conteudo dentro do modal 
}

function fecharModal() { // Botão fechar
  document.getElementById('modal').style.display = 'none';
}
