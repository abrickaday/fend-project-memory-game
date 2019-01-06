// list of 8 font awesome icon suffixes that shows up when a card is open
var icons = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];

// array to hold a a total of 16 cards
var cards = [];
// duplicate the 8 icons twice so the cards array has 16 elements
for (var i = 0; i < icons.length; i++) {
  cards.push(icons[i]);
  cards.push(icons[i]);
}

var openedCards = []; // max 2 cards to be added here for comparison
var movesCounter = 0;
var pairsCounter = 0; // number of matched pairs for keeping track whether player has won
var min, sec, timeOut;

document.querySelector('.deck').addEventListener('click', openCard);

// add a one-off event listener that starts the timer when the user first open a card
document.querySelector('.deck').addEventListener('click', startTimer, { once: true });
document.querySelector('.restart').addEventListener('click', restartGame);
document.querySelector('.playBtn').addEventListener('click', replayGame);


var modal = document.getElementsByClassName('modal')[0];
var close = document.getElementsByClassName('close')[0];
close.addEventListener('click', function() { modal.style.display = 'none'; } );
window.addEventListener('click', function (event) { if (event.target == modal) { modal.style.display = 'none';} } );

shuffle(cards);
addCard(cards);


function addCard(cards) {
  var deck = document.querySelector('.deck');

  for (var i=0; i < cards.length; i++) {
    // create a new li element
    var newLi = document.createElement('li');
    // use css class 'card' to show the cards faced down
    newLi.className = 'card';
    // add an id for each li element
    newLi.id = i.toString();
    // create a new i element
    var newI = document.createElement('i');
    var iconClassName = 'fa fa-' + cards[i];
    newI.className = iconClassName;
    newLi.appendChild(newI);
    deck.appendChild(newLi);
   }
 }


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// opening, closing or showing of cards are done by adding and removing the respective CSS classes
 function openCard(event) {
   if (event.target.classList.contains('open', 'show') || event.target.classList.contains('fa') || event.target.classList.contains('deck')) {}
   else {
     countMoves();
     event.target.classList.add('open', 'show');
     addToOpenCards(event.target);
   }
 }

 function showCards(card1, card2) {
   card1.classList.add('match');
   card2.classList.add('match');
 }

 function closeCards(card1, card2) {
   card1.classList.remove('open', 'show');
   card2.classList.remove('open', 'show');
 }

 function addToOpenCards(openedCard) {
   if (openedCards.length == 0) {
     openedCards.push(openedCard);
   } else if (openedCards.length == 1) {
     openedCards.push(openedCard);
     var openedCard1 = document.getElementById(openedCards[0].id);
     var openedCard2 = document.getElementById(openedCards[1].id);
     checkCards(openedCard1, openedCard2);
   } else {
     openedCards.length = 0;
     openedCards.push(openedCard);
   }
 }

function checkCards(card1, card2) {
  icon1 = card1.firstElementChild.className;
  icon2 = card2.firstElementChild.className;

  if (icon1 == icon2) {
    showCards(card1, card2);
    pairsCounter += 1;
    checkWin();
  } else {
    setTimeout(closeCards, 500, card1, card2);
  }
}

function checkWin() {
  if (pairsCounter == 8) {
    // stop the timer
    stopTimer();

    // show the win modal
    modal.style.display = "block";

    // get the number of stars and total time elapsed at the point of winning
    var winStars = document.querySelector('.score-panel').firstElementChild.innerHTML;
    var winTime = document.querySelector('.timer').textContent;

    // update the modal with the number of winning stars, time taken and moves taken
    document.querySelector('.winning-stars').innerHTML = winStars;
    document.querySelector('.winning-timer').textContent = winTime;
    document.querySelector('.winning-moves').innerHTML = movesCounter;
  }
}

function countMoves() {
    movesCounter += 1;
    document.querySelector('.moves').innerHTML = movesCounter;
    if (movesCounter == 30) {
      removeStar();
    } else if (movesCounter == 40) {
      removeStar();
    } else {}
}

function resetMoves() {
  movesCounter = 0;
  document.querySelector('.moves').innerHTML = movesCounter;
}

function removeStar() {
    document.querySelector('.stars').firstElementChild.remove();
}

// use the functions waitOneSec and addOneSec to create an infinite loop that keeps counting
function addOneSec() {
  sec += 1;
  updateTimer();
  waitOneSec();
}

function waitOneSec() {
  timeOut = setTimeout(addOneSec,1000);
}

function startTimer() {
  min = 0;
  sec = 0;
  waitOneSec();
}

function resetTimer() {
  clearTimeout(timeOut);
  document.querySelector('.timer').textContent = '00:00';
}

function stopTimer() {
  clearTimeout(timeOut);
}

function updateTimer() {
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }

  var sec_f, min_f; //formatted sec & min

  if (sec < 10) {
    sec_f = '0' + sec.toString(); // prefix a zero for 0 to 9 seconds
  } else {
    sec_f = sec.toString();
  }

  if (min < 10) {
    min_f = '0' + min.toString(); // prefix a zero for 0 to 9 minutes
  } else {
    min_f = min.toString();
  }

  var time = min_f + ':' + sec_f; // format to be displayed
  document.querySelector('.timer').textContent = time;
}

function clearCards() {
  document.querySelector('.deck').innerHTML = '';
}

function resetStars() {
  var stars = document.querySelector('.stars');
  stars.innerHTML = '';

  for (var i=0; i < 3; i++) {
    //create a new li element
    var newLi = document.createElement('li');
    //create a new i createElement
    var newI = document.createElement('i');
    newI.className = 'fa fa-star';
    newLi.appendChild(newI);
    stars.appendChild(newLi);
   }
}

function restartGame() {
  clearCards();
  shuffle(cards);
  addCard(cards);
  resetMoves();
  resetStars();
  resetTimer();
  document.querySelector('.deck').addEventListener('click', startTimer, { once: true, });
  pairsCounter = 0;
}

function replayGame() {
  modal.style.display = "none";
  restartGame();
}
