  // ===============================
  // 1. Modal - abrir com infos da ONG/pet e fechar
  // ===============================

  // Verifica se existem cards na página antes de tentar manipulá-los
  const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');

if (modal && modalText) {
  const botoes = document.querySelectorAll('.card .btn-adotar');
  const btnFechar = modal.querySelector('.close-modal');

  botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();
      const card = botao.closest('.card');
      const nome = card.querySelector('h3').innerText;
      modalText.innerText = `Deseja realmente adotar o pet "${nome}"?`;
      modal.style.display = 'flex';
    });
  });

  btnFechar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

  // ===============================
  // 2. Validação e envio do formulário de cadastro do pet
  // ===============================

  const form = document.getElementById("form-cadastrar-pet");
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Bloqueia o envio do formulário

      // Oculta mensagens anteriores
      mensagemErro.style.display = "none";
      mensagemSucesso.style.display = "none";

      // Pega os valores do formulário
      const nome = form.nome.value.trim();
      const idade = parseInt(form.idade.value.trim());
      const especie = form.especie.value;
      const descricao = form.descricao.value.trim();
      const endereco = form.endereco.value.trim();
      const foto = form.foto.files[0];

      // Valida os campos manualmente
      if (!nome || nome.length < 2) {
        exibirErro("Por favor, informe um nome válido para o pet.");
        return;
      }

      if (isNaN(idade) || idade < 0 || idade > 25) {
        exibirErro("Informe uma idade válida entre 0 e 25 anos.");
        return;
      }

      if (!especie) {
        exibirErro("Selecione a espécie do pet.");
        return;
      }

      if (!descricao || descricao.length < 10) {
        exibirErro("A descrição deve ter pelo menos 10 caracteres.");
        return;
      }

      if (!endereco || endereco.length < 5) {
        exibirErro("Informe um endereço válido para retirada.");
        return;
      }

      if (!foto) {
        exibirErro("Adicione uma foto do pet.");
        return;
      }

      // Se todas as validações passarem
      mensagemSucesso.textContent = `Pet "${nome}" cadastrado com sucesso! Obrigado por ajudar.`;
      mensagemSucesso.style.display = "block";

      form.reset(); // Limpa o formulário
    });

    // Função auxiliar para exibir erro
    function exibirErro(msg) {
      mensagemErro.textContent = msg;
      mensagemErro.style.display = "block";
    }
  }
