/*
 * Create a list that holds all of your cards
 */
cards = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bomb', 'bicycle'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
console.log(cards);
shuffle(cards);
console.log(cards);

addCard(cards);

function addCard(cards) {
  var deck = document.querySelector('.deck');

  for (var i=0; i < cards.length; i++) {
    //create a new li element
    var newLi = document.createElement('li');
    newLi.className = 'card';
    newLi.id = i.toString();
    //create a new i createElement
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 function openCard(event) {
   if (event.target.classList.contains('open', 'show') || event.target.classList.contains('fa') || event.target.classList.contains('deck')) {}
   else {
     event.target.classList.add('open', 'show');
     // console.log(event.target);
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
     console.log('1 card in openedCards: ', openedCards);
   } else if (openedCards.length == 1) {
     openedCards.push(openedCard);
     console.log('2 cards in openedCards: ', openedCards);

     var openedCard1 = document.getElementById(openedCards[0].id);
     var openedCard2 = document.getElementById(openedCards[1].id);

     checkCards(openedCard1, openedCard2);

   } else {
     openedCards.length = 0;
     console.log('Clear openedCards: ', openedCards);
     openedCards.push(openedCard);
     console.log('1 card in openedCards: ', openedCards);
   }
 }

function checkCards(card1, card2) {
  icon1 = card1.firstElementChild.className;
  icon2 = card2.firstElementChild.className;

  if (icon1 == icon2) {
    console.log('Cards Match!');
    showCards(card1, card2);
  } else {
    console.log('Try again!');
    setTimeout(closeCards, 500, card1, card2);
  }
}

var openedCards = [];
console.log('initial openedCards: ', openedCards);

document.querySelector('.deck').addEventListener('click', openCard);
