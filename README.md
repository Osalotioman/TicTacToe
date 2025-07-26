# TicTacToe

A modern, clean implementation of the classic TicTacToe game built from scratch with HTML, CSS, and JavaScript.

## Features

- **Modern UI**: Beautiful gradient background with clean, responsive design
- **Two Game Modes**: 
  - Human vs Human: Play with a friend
  - Human vs AI: Challenge the computer
- **Smart AI**: Two difficulty levels (Easy and Hard) with strategic gameplay
- **Customizable Settings**: Choose first player and game mode
- **Visual Feedback**: Color-coded X's (red) and O's (blue) with hover effects
- **Win Detection**: Automatic detection of wins and draws with visual highlighting

## Game Rules

TicTacToe is played on a 3x3 grid. Players take turns placing their symbol (X or O) in empty cells. The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins the game. If all cells are filled without a winner, the game is a draw.

## How to Play

1. **Starting the Game**: Open `index.html` in your web browser
2. **Making Moves**: Click on any empty cell to place your symbol
3. **Game Modes**: Use the Settings button to switch between Human vs Human and Human vs AI
4. **New Game**: Click the "New Game" button to restart at any time

## Settings

Click the "Settings" button to customize your game:
- **Game Mode**: Choose between Human vs Human or Human vs AI
- **First Player**: Select whether X or O goes first
- **AI Difficulty**: When playing against AI, choose Easy or Hard difficulty

## Technical Implementation

The game is built with:
- **HTML5**: Clean, semantic structure with modern layout
- **CSS3**: Beautiful styling with gradients, animations, and responsive design
- **JavaScript ES6+**: Object-oriented game logic with class-based architecture

### Key Features of the Code:
- **Modular Design**: Game logic encapsulated in a TicTacToe class
- **Smart AI**: Strategic gameplay with win/block detection
- **Event-Driven**: Responsive UI with proper event handling
- **Clean Code**: Well-structured, readable, and maintainable

## File Structure

- `index.html` - Main game interface
- `style.css` - Modern styling and responsive design
- `script.js` - Game logic and AI implementation
- `docs/` - Documentation files
- `test/` - Test files and alternative interfaces

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test them
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Create a pull request
