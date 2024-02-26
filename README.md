# TicTacToe
## Overview of The Game
The game of TicTacToe is a game played by two players, it consists of a 3x3 grid which contains 9 cells.
||1|2|3|
|-:|:-:|:-:|:-|
|c|_|_|_|
|b|_|_|_|
|a|_|_|_|

Players play using symbols "X" or "O".
||1|2|3|
|-:|:-:|:-:|:-|
|c|X|_|_|
|b|_|O|_|
|a|_|_|_|

To win, one must get a 3 vertical/horizontal/diagonal cells to have the same symbol ("X" or "O"), in this
case the symbol will be that of the player who hopes to win.
||1|2|3|
|-:|:-:|:-:|:-|
|c|X|_|_|
|b|_|X|O|
|a|O|_|X|

In the above case, player X has won, by filling consecutive diagonal squares with the symbol X.
||1|2|3|
|-:|:-:|:-:|:-|
|c|X|_|_|
|b|O|O|O|
|a|_|_|X|

In the above case, player O has won, by filling consecutive horizontal squares with the symbol O.
If all 9 cells are filled and no player has won, then the game results in a draw.
||1|2|3|
|-:|:-:|:-:|:-|
|c|X|O|X|
|b|O|O|X|
|a|X|X|O|

In the above case, the game ends in a draw as no player has won and all 9 cells are filled up.

## Overview of Repository File Structure:
1. main.html
2. README.md
3. script.js
4. settings.js
5. style.css
6. variables.js

        1. main.html:
         As named, it is the main page of the application, also the only html page of the game as I decided to make it a one page site