let blackjackGame = {
  'you':{'scoreSpan':'your-result','div':'your-box','score':0},
  'dealer':{'scoreSpan':'dealer-result','div':'dealer-box','score':0},
  'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
  'wins':0,
  'losses':0,
  'draws':0,
  'isStand':false,
  'turnsOver':false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('assets/sounds/swish.m4a');
const winSound = new Audio('assets/sounds/cash.mp3');
const lossSound = new Audio('assets/sounds/aww.mp3');

document.getElementById("hit-button").addEventListener("click",Hit);
document.getElementById("deal-button").addEventListener("click",Deal);
document.getElementById("stand-button").addEventListener("click",DealerLogic);

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function Hit() {

  if (blackjackGame['isStand'] === false){
    let card = randomCard();
    showCard(card,YOU);
    updateScore(card ,YOU);
    showScore(YOU);
  }

}

async function DealerLogic(){

  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true){

    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card ,DEALER);
    showScore(DEALER);
    await wait(1000);

  }

   blackjackGame['turnsOver'] = true;
   let winner = computerWinner();
   showResult(winner);

}

function Deal(){

if (blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] = false;

    let yourImages = document.getElementById(YOU['div']).querySelectorAll("img");
    let dealerImages = document.getElementById(DEALER['div']).querySelectorAll("img");

    for(i =0; i < yourImages.length;i++){
      yourImages[i].remove();
    }

    for(i =0; i < dealerImages.length;i++){
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.getElementById(YOU['scoreSpan']).textContent = 0;
    document.getElementById(DEALER['scoreSpan']).textContent = 0;

    document.getElementById(YOU['scoreSpan']).style.color = 'white';
    document.getElementById(DEALER['scoreSpan']).style.color = 'white';

    document.getElementById('result').textContent = "Let's Play";
    document.getElementById('result').style.color = 'black';

    blackjackGame['turnsOver'] = true;
  }
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


function computerWinner(){

  let winner ;


  if(YOU['score']<= 21){

    if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
      blackjackGame['wins']++;
      winner = YOU;
    }
    else if (YOU['score'] < DEALER['score']){
      blackjackGame['losses']++;
      winner = DEALER;
    }
    else if (YOU['score'] === DEALER['score']){
      //draw
      blackjackGame['draws']++;
    }

  }
  else if (YOU['score'] > 21 && DEALER['score']<= 21){
    blackjackGame['losses']++;
    winner = DEALER;
  }
  else if (YOU['score'] > 21 && DEALER['score'] > 21){
    //draw
    blackjackGame['draws']++;
  }

  return winner;

}

function showResult(winner){

   let message , messageColor ;

   if (blackjackGame['turnsOver'] === true){

       if(winner === YOU){
         document.getElementById('wins').textContent = blackjackGame['wins'];
         message = "You won !";
         messageColor = 'green';
         winSound.play();
       }
       else if (winner === DEALER){
         document.getElementById('losses').textContent = blackjackGame['losses'];
         message = "You lost !";
         messageColor = 'red';
         lossSound.play();
       }
       else{
         document.getElementById('draws').textContent = blackjackGame['draws'];
         message = "You drew !";
         messageColor = 'black';
       }

      document.getElementById('result').textContent = message;
      document.getElementById('result').style.color = messageColor;
  }
 }
