const modal = document.getElementById('modal'); // caixa que aparece para confirmar a adoção)
const modalText = document.getElementById('modal-text'); // onde vai mostrar o texto com o nome do pet
const btnConfirm = document.getElementById('confirm-adopt'); // botao que confirma a adoção
const btnFechar = modal.querySelector('.close-modal'); // botao de fechar

let petParaAdotar = null; // Variável que guarda o nome do pet que o usuario quer adotar

function ativarEventosAdotar() { // Adiciona os eventos ao clicar nos botoes adotar
  const botoesAdotar = document.querySelectorAll('.card .btn-adotar');

  botoesAdotar.forEach(botao => {  // Para cada botão adotar cria uma funcao
    botao.addEventListener('click', (e) => { 
      e.preventDefault();  // Impede o comportamento normal do btn
      const card = botao.closest('.card'); // Encontra o card mais proximo
      petParaAdotar = card.querySelector('h3').innerText; // Pega o nome do pet
      modalText.innerText = `Deseja realmente adotar o pet "${petParaAdotar}"?`; // Atualiza o texto
      modal.style.display = 'flex'; // Mostra o modal
    });
  });
}

if (modal && modalText && btnConfirm) { // Verifica se existe modal
  ativarEventosAdotar(); // Se existe modal ativa os botoes

  btnFechar.addEventListener('click', () => { //Fecha o modal quando clica no X
    modal.style.display = 'none';
    petParaAdotar = null;
  });

  modal.addEventListener('click', (e) => { //Fecha o modal quando clica fora da caixa
    if (e.target === modal) {
      modal.style.display = 'none';
      petParaAdotar = null;
    }
  });

  btnConfirm.addEventListener('click', () => { // Quando o botao que confima a adocao for clicado
    if (!petParaAdotar) return;

    const pets = JSON.parse(localStorage.getItem('pets')) || []; // Pega os pets do localStorage
    const novosPets = pets.filter(pet => pet.nome !== petParaAdotar); // Filtra a lista removndo o pet que foi adotado

    localStorage.setItem('pets', JSON.stringify(novosPets)); // Salva a nova lista de pets sem o adotado

    document.dispatchEvent(new CustomEvent('petsAtualizados')); // Evento que avisa que os pets foram atualizados

    modal.style.display = 'none'; // Fecha o modal

    alert(`Parabéns! Você adotou o pet "${petParaAdotar}".`);  // Mensagem de sucesso

    petParaAdotar = null;  // Limpa a variavel
  });

  // Quando pets forem atualizados reativa os botões de adoção
  document.addEventListener('petsAtualizados', () => {
    ativarEventosAdotar();
  });

  // Ativa os eventos depois dos pets carregarem
  document.addEventListener('petsRenderizados', () => {
    ativarEventosAdotar();
  });
}
