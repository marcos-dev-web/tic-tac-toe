import { verifyWinner } from './functions.js';

const squares = document.querySelectorAll('.square');
var classPlayer = '';
var gamer = 0;

var run_game = ''

var tab = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];

const resetGame = () => {
  squares.forEach(element => {
    if (element.classList.contains('marked')) {
      element.classList.remove('marked')
    }
    element.querySelector('i').removeAttribute('class')
  })
}

const icon = {
  icon_0: ['far', "circle"],
  icon_1: ['fas', "times"],
};

function winner(player) {
  setTimeout(() => {
    alert(`jogador [${player.toUpperCase()}] ganhou`)
    window.location.reload()
  }, 100)
}


const Game = {
  Player: {
    randomize() {
      const players = [1, 0];
      return players[Math.floor(Math.random() * 2)];
    },
    render(player_number) {
      let preview = document.querySelector('.preview');
      document.querySelector('.preview').innerHTML = "";
      let preffix_icon  = icon[`icon_${player_number}`][0];
      let suffix_icon  = icon[`icon_${player_number}`][1];
      let i = document.createElement('i');
      i.classList.add(`${preffix_icon}`);
      i.classList.add(`fa-${suffix_icon}`);
      preview.appendChild(i);
    }
  },
  Canvas: {
    markSquare(e, row, column) {
      if (!(e.target.classList.contains('marked'))) {
        e.target.querySelector('i').classList.add(classPlayer[0]);
        e.target.querySelector('i').classList.add(`fa-${classPlayer[1]}`);
        e.target.classList.add('marked');
        tab[row][column] = (gamer == 1) ? 'x' : 'o';
        let verfiry_winner = verifyWinner(tab)
        if (!verfiry_winner) {
          if (gamer === 1) {
            gamer = 0
          } else {
            gamer = 1
          }
          Game.Player.render(gamer);
          classPlayer = icon[`icon_${gamer}`];
        } else {
          winner(verfiry_winner)
        }
      }
    },
    addEvents(elements, event, funcMarkSquare) {
      elements.forEach(element => {
        element.addEventListener(event, (e) => {
          let pos = element.getAttribute('data-id').split('-');
          let row = parseInt(pos[0]);
          let column = parseInt(pos[1]);
          funcMarkSquare(e, row, column);
        });
      })
    }
  }
}

run_game = () => {
  resetGame()
  tab = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]
  let player = Game.Player
  let canvas = Game.Canvas

  gamer = player.randomize() == 1 ? 0 : 1;
  player.render(gamer)

  classPlayer = icon[`icon_${gamer}`];
  canvas.addEvents(squares, 'click', canvas.markSquare);
}

run_game()
