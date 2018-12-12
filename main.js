var inquirer = require("inquirer");
var Word = require("./word");
const chalk = require('chalk');

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var wordArray = ['con air', 'national treasure', 'ghost rider', 'lord of war', 'the rock', 'the weather man', 'bangkok dangerous', 'face off', 'windtalkers'];

const nicOne = chalk.blue.bgBlack.bold;
const niceTwo = chalk.red.bold.bgBlack;
const nicThree = chalk.white.bold.bgBlack;

var logoDisplay = () => {
  console.log(nicOne('                                                                          '));
  console.log(nicOne('              /$$                                                         '));
  console.log(niceTwo('             |__/                                                         '));
  console.log(nicThree('   /$$$$$$$  /$$  /$$$$$$$        /$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$   '));
  console.log(nicOne('  | $$__  $$| $$ /$$_____/       /$$_____/ |____  $$ /$$__  $$ /$$__  $$  '));
  console.log(niceTwo('  | $$  \\ $$| $$| $$            | $$        /$$$$$$$| $$  \\ $$| $$$$$$$$  '));
  console.log(nicThree('  | $$  | $$| $$| $$            | $$       /$$__  $$| $$  | $$| $$_____/  '));
  console.log(nicOne('  | $$  | $$| $$|  $$$$$$$      |  $$$$$$$|  $$$$$$$|  $$$$$$$|  $$$$$$$  '));
  console.log(niceTwo('  |__/  |__/|__/ \\_______/       \\_______/ \\_______/ \\ ____ $$ \\_______/  '));
  console.log(nicOne('                                                    |  $$$$$$/            '));
  console.log(niceTwo('                                                     \\______/             '));
  console.log(nicThree('                                           /$$                            '));
  console.log(nicOne('                                          |__/                            '));
  console.log(niceTwo('         /$$$$$$/$$$$   /$$$$$$  /$$   /$$ /$$  /$$$$$$   /$$$$$$$        '));
  console.log(nicThree('        | $$_  $$_  $$ /$$__  $$| $$  /$$/| $$ /$$__  $$ /$$_____/        '));
  console.log(nicOne('        | $$ \\ $$ \\ $$| $$  \\ $$ \\ $$/$$/ | $$| $$$$$$$$|  $$$$$$         '));
  console.log(niceTwo('        | $$ | $$ | $$| $$  | $$  \\ $$$/  | $$| $$_____/ \\____  $$        '));
  console.log(nicThree('        | $$ | $$ | $$|  $$$$$$/   \\ $/   | $$|  $$$$$$$ /$$$$$$$/        '));
  console.log(nicOne('        |__/ |__/ |__/ \\______/     \\/    |__/ \\_______/|_______/         '));
  console.log(nicOne('                                                                          ' + '\n'));
}

// katbytes Nic Cage ascii art courtesy of:
// http://patorjk.com/software/taag/#p=display&f=Big%20Money-ne&t=nic%20cage%0Amovies
// Font: Big Money-ne

var selectedWord;
var word;

var getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var selectRandomWord = () => {
  selectedWord = wordArray[getRandomIntInclusive(0, wordArray.length - 1)];
};

var isLetter = (guess) => {
  if ((alphabet.indexOf(guess) < 0) || (guess === '')) {
    console.log(`...that's not a letter...try again`);
    return 0;
  }
  else {
    return 1;
  }
};

var round = () => {
  word.updateWordDisplay();
  console.log(' ');
  inquirer.prompt([
    {
      name: 'guess',
      message: chalk.red.bgBlack(" What letter would you like to guess? ")
    },
  ]).then((response) => {
    var guess = response.guess.toLowerCase();
    if (guess === 'exit') {
      process.exit();
    }
    else {
      if (isLetter(guess) === 1) {
        if (word.checkGuess(guess) === 0) {
          playAgain();
        }
        else {
          round();
        }
      }
      else {
        round();
      }
    }
  });
};

var game = () => {
  console.clear();
  logoDisplay();
  gameInProgress = true;
  selectRandomWord();
  word = new Word(selectedWord);
  word.makeLetterArray();
  round();
};

var playAgain = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'playAgain',
      message: chalk.blue.bgBlack(" Would you like to play again? "),
      choices: ['Yes', 'No']
    },
  ]).then(function (response) {
    var playAgain = response.playAgain;
    if (playAgain === 'No') {
      console.log('Ok, see you next time!');
      process.exit();
    }
    else {
      game();
    }
  });
};

game();
