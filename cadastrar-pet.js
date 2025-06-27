const form = document.getElementById("form-cadastrar-pet"); // formulário de cadastro de pet
const mensagemErro = document.getElementById("mensagem-erro"); // mensagem de erro
const mensagemSucesso = document.getElementById("mensagem-sucesso"); // mensagem de sucesso

if (form) {  // Verifica se o formulario existe
  form.addEventListener("submit", function (e) {  // Evento ao enviar o formulário
    e.preventDefault(); // Previne o formularo de ser enviado de forma normal (sem recarregar a pagina)

    // Esconde qualquer mensagem anterior
    mensagemErro.style.display = "none"; 
    mensagemSucesso.style.display = "none";

    // Coleta os dados digitados no formulario
    const nome = form.nome.value.trim();
    const idade = parseInt(form.idade.value.trim());
    const especie = form.especie.value;
    const descricao = form.descricao.value.trim();
    const endereco = form.endereco.value.trim();
    const foto = form.foto.files[0];

    // Validacao dos dados digitados - caso não esteja correto exibe uma mensagem
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

    // Converte a imagem para salvar no localStorage
    const reader = new FileReader();
    reader.onload = function(event) {
      const fotoBase64 = event.target.result;

      // Cria um objeto com os dados do pet
      const pet = {
        nome,
        idade,
        especie,
        descricao,
        endereco,
        foto: fotoBase64 // Salva a imagem em base64
      };


      let pets = JSON.parse(localStorage.getItem("pets")) || []; // Recupera os pets salvos 
      pets.push(pet); // Adiciona o novo pet a lista
      localStorage.setItem("pets", JSON.stringify(pets)); // Salva no localStorage

      mensagemSucesso.textContent = `Pet "${nome}" cadastrado com sucesso! Obrigado por ajudar.`; // Mensagem de sucesso
      mensagemSucesso.style.display = "block";

      form.reset(); // Limpa o formulario
    };

    reader.readAsDataURL(foto);  // Leitura do arquivo de imagem

  });

  function exibirErro(msg) { // Função para exibir uma mensagem de erro 
    mensagemErro.textContent = msg;
    mensagemErro.style.display = "block";
  }
}
