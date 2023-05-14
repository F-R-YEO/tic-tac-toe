
/*----- constants -----*/

const colors = {
    '1': 'red',
    '-1': 'blue',
    'null': 'white'
};

const winningCombos= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


/*----- game state variables -----*/

let board, turn, winner;


/*----- cached elements  -----*/
const message = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialise);

/*----- functions -----*/
initialise();
handleMove();
getWinner();
render();
renderBoard();
renderMessage();


// initiallise state variable
function initialise() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
};
//peek solution
function handleMove(e) {
  const idx = parseInt(e.target.id.replace('sq-', ''));

  if (isNaN(idx) || board[idx] || winner) return; 
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  }
  if (board.includes(null)) return null;
  return 'T';
}

//all state and info in DOM
function render() {
  renderBoard();
  renderMessage();
  playAgainBtn.disabled = !winner; //when there is no winner
}

function renderMessage() {
  if (winner === 'T') {
    message.innerHTML = 'Rats, another tie!';
  } else if (winner) {
    message.innerHTML = `Congrats <span style="color: ${colors[winner]}">${colors[winner].toUpperCase()}</span>!`;
  } else {
    message.innerHTML = `<span style="color: ${colors[turn]}">${colors[turn].toUpperCase()}</span>'s Turn`;
  }
}

//solution peek
function renderBoard() {
  board.forEach(function(sqNumber, idx) {
    const squareEl = document.getElementById(`sq-${idx}`);
    squareEl.style.backgroundColor = colors[sqNumber];
  });
}


