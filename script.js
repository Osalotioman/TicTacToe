class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameMode = 'human'; // 'human' or 'ai'
        this.firstPlayer = 'X';
        this.aiDifficulty = 'hard';
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.gameBoard = document.getElementById('gameBoard');
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerDisplay = document.getElementById('currentPlayer');
        this.gameStatus = document.getElementById('gameStatus');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.newGameBtn = document.getElementById('newGame');
        this.applySettingsBtn = document.getElementById('applySettings');
        this.cancelSettingsBtn = document.getElementById('cancelSettings');
        this.gameModeSelect = document.getElementById('gameMode');
        this.firstPlayerSelect = document.getElementById('firstPlayer');
        this.aiDifficultySelect = document.getElementById('aiDifficulty');
        this.aiDifficultyGroup = document.getElementById('aiDifficultyGroup');
    }

    attachEventListeners() {
        // Cell clicks
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.makeMove(index));
        });

        // Button clicks
        this.newGameBtn.addEventListener('click', () => this.resetGame());
        this.settingsBtn.addEventListener('click', () => this.showSettings());
        this.applySettingsBtn.addEventListener('click', () => this.applySettings());
        this.cancelSettingsBtn.addEventListener('click', () => this.hideSettings());

        // Settings changes
        this.gameModeSelect.addEventListener('change', () => this.toggleAIDifficulty());
        
        // Close settings when clicking outside
        this.settingsPanel.addEventListener('click', (e) => e.stopPropagation());
        document.addEventListener('click', (e) => {
            if (!this.settingsPanel.classList.contains('hidden') && 
                !this.settingsBtn.contains(e.target)) {
                this.hideSettings();
            }
        });
    }

    makeMove(index) {
        if (!this.gameActive || this.board[index] !== '') {
            return;
        }

        this.board[index] = this.currentPlayer;
        this.updateCell(index);

        if (this.checkWinner()) {
            this.endGame(`Player ${this.currentPlayer} wins!`);
            return;
        }

        if (this.checkDraw()) {
            this.endGame("It's a draw!");
            return;
        }

        this.switchPlayer();

        // AI move if in AI mode and it's AI's turn
        if (this.gameMode === 'ai' && this.currentPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    makeAIMove() {
        if (!this.gameActive) return;

        let move;
        if (this.aiDifficulty === 'hard') {
            move = this.getBestMove();
        } else {
            move = this.getRandomMove();
        }

        if (move !== -1) {
            this.makeMove(move);
        }
    }

    getBestMove() {
        // Try to win
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                if (this.checkWinnerForPlayer('O')) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }

        // Try to block player from winning
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'X';
                if (this.checkWinnerForPlayer('X')) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }

        // Take center if available
        if (this.board[4] === '') {
            return 4;
        }

        // Take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => this.board[i] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        // Take any available space
        return this.getRandomMove();
    }

    getRandomMove() {
        const availableMoves = this.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(index => index !== null);
        
        return availableMoves.length > 0 
            ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
            : -1;
    }

    checkWinner() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.highlightWinningCells(combination);
                return true;
            }
            return false;
        });
    }

    checkWinnerForPlayer(player) {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return this.board[a] === player && this.board[b] === player && this.board[c] === player;
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    highlightWinningCells(combination) {
        combination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }

    updateCell(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
    }

    updateDisplay() {
        if (this.gameActive) {
            this.currentPlayerDisplay.textContent = `Current Player: ${this.currentPlayer}`;
            if (this.gameMode === 'ai' && this.currentPlayer === 'O') {
                this.currentPlayerDisplay.textContent = "AI is thinking...";
            }
        }
    }

    endGame(message) {
        this.gameActive = false;
        this.gameStatus.textContent = message;
        this.currentPlayerDisplay.textContent = "Game Over";
        this.cells.forEach(cell => cell.classList.add('disabled'));
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = this.firstPlayer;
        this.gameActive = true;
        this.gameStatus.textContent = '';
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });

        this.updateDisplay();

        // If AI goes first
        if (this.gameMode === 'ai' && this.firstPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    showSettings() {
        this.settingsPanel.classList.remove('hidden');
        this.gameModeSelect.value = this.gameMode;
        this.firstPlayerSelect.value = this.firstPlayer;
        this.aiDifficultySelect.value = this.aiDifficulty;
        this.toggleAIDifficulty();
    }

    hideSettings() {
        this.settingsPanel.classList.add('hidden');
    }

    toggleAIDifficulty() {
        const isAIMode = this.gameModeSelect.value === 'ai';
        this.aiDifficultyGroup.style.display = isAIMode ? 'block' : 'none';
    }

    applySettings() {
        this.gameMode = this.gameModeSelect.value;
        this.firstPlayer = this.firstPlayerSelect.value;
        this.aiDifficulty = this.aiDifficultySelect.value;
        
        this.hideSettings();
        this.resetGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
});