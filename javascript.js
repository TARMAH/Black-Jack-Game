let blackjackGame = {
  'you':{'scoreSpan':'your-result','div':'your-box','score':0},
  'dealer':{'scoreSpan':'dealer-result','div':'dealer-box','score':0},
  'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]}
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('assets/sounds/swish.m4a');

document.getElementById("hit-button").addEventListener("click",Hit);
document.getElementById("deal-button").addEventListener("click",Deal);

function Hit() {

  let card = randomCard();
  showCard(card,YOU);
  updateScore(card ,YOU);
  showScore(YOU);

}

function Deal(){

YOU['score'] = 0;
DEALER['score'] = 0;

document.getElementById(YOU['scoreSpan']).textContent = 0;
document.getElementById(DEALER['scoreSpan']).textContent = 0;

document.getElementById(YOU['scoreSpan']).style.color = 'white';
document.getElementById(DEALER['scoreSpan']).style.color = 'white';

}

function showCard(card,activePlayer){

  if (activePlayer['score'] <= 21){

    let cardImage = document.createElement('img');
    cardImage.src = 'assets/images/'+card+'.png';
    document.getElementById(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function randomCard(){
  let randomIndex = Math.floor(Math.random()* 13);
  return blackjackGame['cards'][randomIndex];
}

function updateScore(card , activePlayer){

  if(card == 'A'){
    //if adding 11 keeps me below 21 , add 11 else add 1
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    }
    else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }

  }

  else {
  activePlayer['score'] += blackjackGame['cardsMap'][card];
}

}

function showScore(activePlayer){
    if (activePlayer['score'] <= 21){
    document.getElementById(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
  else {
    document.getElementById(activePlayer['scoreSpan']).textContent = ' BUST !';
    document.getElementById(activePlayer['scoreSpan']).style.color = 'red';
  }
}
