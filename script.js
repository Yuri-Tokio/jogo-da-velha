// Seleciona todos os elementos de célula, status, botão de reinício e modal
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart');
const restartModalBtn = document.querySelector('.restart-modal');
const modal = document.getElementById('victoryModal');
const modalMessage = document.querySelector('.modal-message');
const closeModal = document.querySelector('.close');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Condições de vitória possíveis
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para tratar o clique em uma célula
function handleCellClick() {
    const cellIndex = this.getAttribute('data-index');
    
    // Verifica se a célula já foi clicada ou se o jogo não está ativo
    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Atualiza o estado do jogo e a interface
    gameState[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;

    checkResult();
}

// Função para verificar o resultado do jogo
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        openModal(`Jogador ${currentPlayer} venceu!`);
        return;
    }

    if (!gameState.includes('')) {
        gameActive = false;
        openModal('Empate!');
        return;
    }

    // Alterna o jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `É a vez do jogador ${currentPlayer}`;
}

// Função para abrir o modal
function openModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

// Função para reiniciar o jogo
function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `É a vez do jogador ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;
    modal.style.display = 'none';
}

// Configura os eventos de clique para as células, botão de reinício e fechamento do modal
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
restartModalBtn.addEventListener('click', restartGame);
closeModal.addEventListener('click', () => modal.style.display = 'none');
