// ========================================
// CARROSSEL DE IMAGENS DOS PROJETOS
// Arquivo separado para melhor organização
// ========================================

// Variáveis globais do carrossel
let indiceAtual = 0;
let imagensAtuais = [];
let projetoAtual = '';

// Objeto com os caminhos das imagens de cada projeto
// ADICIONE AQUI os caminhos das suas imagens
const imagensProjetos = {
    // SmarTech - 7 imagens
    smartech: [
        'assets/projects/smartech1.png',
        'assets/projects/smartech2.png',
        'assets/projects/smartech3.png',
        'assets/projects/smartech4.png',
        'assets/projects/smartech5.png',
        'assets/projects/smartech6.png',
        'assets/projects/smartech7.png'
    ],
    
    // Duat Cassinos - 6 imagens
    duat: [
        'assets/projects/duatcassinos1.png',
        'assets/projects/duatcassinos2.png',
        'assets/projects/duatcassinos3.png',
        'assets/projects/duatcassinos4.png',
        'assets/projects/duatcassinos5.png',
        'assets/projects/duatcassinos6.png'
    ]
    
    // ADICIONE MAIS PROJETOS AQUI:
    // nomedobutao: [
    //     'assets/projects/imagem1.png',
    //     'assets/projects/imagem2.png'
    // ]
};

// Função para abrir o modal
// Chamada do HTML via: onclick="abrirModal('smartech')"
function abrirModal(projeto) {
    projetoAtual = projeto;
    imagensAtuais = imagensProjetos[projeto];
    
    // Valida se o projeto existe
    if (!imagensAtuais) {
        console.error(`Projeto "${projeto}" não encontrado!`);
        return;
    }
    
    indiceAtual = 0;
    
    const modal = document.getElementById('modal-imagens');
    if (!modal) {
        console.error('Modal não encontrado! Verifique se o HTML tem id="modal-imagens"');
        return;
    }
    
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    
    exibirImagem();
    criarMiniaturas();
}

// Função para fechar o modal
// Pode ser chamada clicando fora do modal ou no botão X
function fecharModal(event) {
    if (!event || event.target.classList.contains('modal-overlay')) {
        const modal = document.getElementById('modal-imagens');
        if (modal) {
            modal.classList.remove('ativo');
            document.body.style.overflow = 'auto';
        }
    }
}

// Função para mudar de imagem
// direcao: -1 (anterior) ou 1 (próxima)
function mudarImagem(direcao) {
    indiceAtual += direcao;
    
    // Loop circular: volta ao início ou vai pro final
    if (indiceAtual >= imagensAtuais.length) {
        indiceAtual = 0;
    } else if (indiceAtual < 0) {
        indiceAtual = imagensAtuais.length - 1;
    }
    
    exibirImagem();
    atualizarMiniaturas();
}

// Função para ir direto para uma imagem específica
// Chamada quando clica numa miniatura
function irParaImagem(indice) {
    indiceAtual = indice;
    exibirImagem();
    atualizarMiniaturas();
}

// Função auxiliar para exibir a imagem atual
function exibirImagem() {
    const img = document.getElementById('modal-img');
    const imgAtual = document.getElementById('img-atual');
    const imgTotal = document.getElementById('img-total');
    
    if (!img) {
        console.error('Elemento modal-img não encontrado!');
        return;
    }
    
    img.src = imagensAtuais[indiceAtual];
    
    if (imgAtual) imgAtual.textContent = indiceAtual + 1;
    if (imgTotal) imgTotal.textContent = imagensAtuais.length;
}

// Função para criar as miniaturas (thumbnails)
function criarMiniaturas() {
    const container = document.getElementById('thumbnails-container');
    
    if (!container) {
        console.error('Container de thumbnails não encontrado!');
        return;
    }
    
    container.innerHTML = '';
    
    imagensAtuais.forEach((caminho, indice) => {
        const thumb = document.createElement('img');
        thumb.src = caminho;
        thumb.alt = `Miniatura ${indice + 1}`;
        thumb.onclick = () => irParaImagem(indice);
        
        // Marca a primeira como ativa
        if (indice === 0) {
            thumb.classList.add('ativa');
        }
        
        container.appendChild(thumb);
    });
}

// Função para atualizar qual miniatura está ativa
function atualizarMiniaturas() {
    const thumbs = document.querySelectorAll('.carousel-thumbnails img');
    
    thumbs.forEach((thumb, indice) => {
        if (indice === indiceAtual) {
            thumb.classList.add('ativa');
        } else {
            thumb.classList.remove('ativa');
        }
    });
}

// ========================================
// NAVEGAÇÃO POR TECLADO
// ========================================

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal-imagens');
    
    // Só funciona se o modal estiver aberto
    if (modal && modal.classList.contains('ativo')) {
        if (e.key === 'ArrowLeft') {
            mudarImagem(-1); // Seta esquerda = anterior
        } else if (e.key === 'ArrowRight') {
            mudarImagem(1); // Seta direita = próxima
        } else if (e.key === 'Escape') {
            fecharModal(); // ESC = fechar
        }
    }
});

// ========================================
// INICIALIZAÇÃO (quando a página carregar)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Carrossel inicializado com sucesso!');
    console.log('Projetos disponíveis:', Object.keys(imagensProjetos));
});