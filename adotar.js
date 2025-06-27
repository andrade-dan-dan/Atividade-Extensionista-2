// Dom - Espera o HTML carregar para depois carregar o JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.cards-container'); //Seleção de container onde vai ir os cards
  if (!container) return; // Se não tiver card ele interrompe essa parte

  let pets = JSON.parse(localStorage.getItem('pets')) || []; //Essa funcão que captura as informcoes do localstorage
  // Funcao que mostra os cards dos pets
  function renderPets() { 
    container.innerHTML = ''; // Limpa o conteudo do conteinar para adicionar novos containers

    if (pets.length === 0) { // Se não houver nenhum pet mostra essa mensagem
      const msg = document.createElement('p');
      msg.textContent = 'Nenhum pet para adoção em nosso site no momento.';
      msg.style.fontSize = '1.2rem';
      msg.style.fontWeight = 'bold';
      msg.style.textAlign = 'center';
      msg.style.marginTop = '2rem';
      container.appendChild(msg);
      return;
    }

    pets.forEach((pet, index) => { // Para cada pet salvo no localStorage, cria um card para cada um
      const card = document.createElement('article');
      card.classList.add('card');

      // Cria o conteúdo HTML do card com os dados do pet
      card.innerHTML = ` 
        <img src="${pet.foto}" alt="Foto de ${pet.nome}" />
        <h3>${pet.nome}</h3>
        <p>Espécie: ${pet.especie} | Idade: ${pet.idade} anos</p>
        <p>${pet.descricao}</p>
        <p><strong>Endereço para retirada:</strong> ${pet.endereco}</p>
        <button class="btn btn-adotar" data-pet="${pet.nome}">Adotar</button>
        <button class="btn btn-remover" data-index="${index}" style="margin-left:8px; background:#e74c3c; color:#fff;">Remover</button>
      `;

      container.appendChild(card);
    });

    // funcao de remover
    const btnsRemover = container.querySelectorAll('.btn-remover');
    btnsRemover.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (isNaN(idx)) return;

        const confirma = confirm(`Deseja realmente remover o pet "${pets[idx].nome}"?`);
        if (!confirma) return;

        pets.splice(idx, 1);
        localStorage.setItem('pets', JSON.stringify(pets));

        // funcao para atualizar modal.js
        document.dispatchEvent(new CustomEvent('petsAtualizados'));
      });
    });

    // funcao para reativar eventos do modal (botão Adotar)
    document.dispatchEvent(new CustomEvent('petsRenderizados'));
  }

  renderPets();

  // Quando a lista for atualizada (de fora), atualiza pets e recarrega
  document.addEventListener('petsAtualizados', () => {
    pets = JSON.parse(localStorage.getItem('pets')) || [];
    renderPets();
  });
});
