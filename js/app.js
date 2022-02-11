// Pseudo-code:

// // [TODO:]Add the HTML components for message area, hit button, stand button, play again button 
// // [TODO:]Add a container element for the player’s card and dealer’s card to appended to
// // [TODO:]Add cached element for each of the button and message area
// // [TODO:]Add event listeners to each of the buttons
// // [TODO:]Upon loading, the app should: 
// // [TODO:] call an initialize function to initialize the state variables, initialize deck of cards
// // [TODO:] Render those values to the page
// // [TODO:]Deal two random cards each to player and dealer
// // [TODO:]Define required constant and winning condition
// // [TODO:]Handle player clicking hit button or stand button to start the game
// // [TODO:]Handle a player clicking the Play again button.

//[TODO:] condition with two aces
//[TODO:] dealer has a blackjack
//[TODO:] blackjack condition with only ace and facecard- excluding 10
//[TODO:] problem with dealer exceeding 21 and the msg is not showing that the player has won
// [TODO:]Add responsive design
// [TODO:]Add google Fonts
// [TODO:]Add a favicon to our site



/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

let winner;
let cardPicked;
let playerPoints;
let dealerPoints;
let dealerHand= [];
let playerHand= [];


/*------------------------ Cached Element References ------------------------*/
const msgStat = document.querySelector("#msg"); //Store the element that displays the game status on the page
const dealerCards = Array.from(document.querySelectorAll(".dealer"));
const playerCards = Array.from(document.querySelectorAll(".player"));
const hitBtn = document.querySelector(".hit");
const standBtn = document.querySelector(".stand");
const StartNewGame = document.querySelector(".new-game");

/*----------------------------- Event Listeners -----------------------------*/
hitBtn.addEventListener('click',handleHit);
standBtn.addEventListener('click',handleStand);
StartNewGame.addEventListener('click',init);


/*-------------------------------- Functions --------------------------------*/
init();

function init(){

  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  dealerHand = [null, null, null, null, null];
  playerHand = [null, null, null, null, null];
  playerPoints = 0;
  dealerPoints = 0;
  hitBtn.disabled = false;
  standBtn.disabled = false;
  //msgStat.innerHTML = "Press Start-New-Game to start the game!";
  resetHands();
  handleStart();
  render();
}

function handleStart(){
  
  assignCardDealer();
  dealerCards[1].classList.remove('outline');
  dealerCards[1].classList.add("back-red");
  assignCardPlayer();
  assignCardPlayer();
}

function render(){
  calcTotal();
  isBJ();
}

function isBJ(){
  if(playerPoints===21 && (playerHand[0]==='A' || playerHand[1]==='A')){
    msgStat.innerHTML= "!! B L A C K J A C K !!"
    stopHitStand();
  }
  if(playerPoints===21){
    msgStat.innerHTML= "The player has won"
    stopHitStand();
  }else{
    if(playerPoints>21){
      msgStat.innerHTML= `The player has lost, Player score exceed 21!`
      stopHitStand();
    }else{
      msgStat.innerHTML= `The player current score is ${playerPoints}, HIT or STAND`
      } 
  }
}

function handleHit(){ //assign card to player
  playerPoints=0;
  assignCardPlayer();
  render();
}

function handleStand(){ //check winning condition
  playerPoints=0;
  calcTotal();
  dealerPlay();
  isWinner();
}

function isWinner(){

  if(playerPoints<22 && playerPoints>dealerPoints && dealerPoints<22){
    msgStat.innerHTML= `The player has won, Player score: ${playerPoints}, Dealer score: ${dealerPoints}`
    stopHitStand();
    }else{
      if(playerPoints<dealerPoints && dealerPoints<22){
      msgStat.innerHTML= `The player has lost, Player score: ${playerPoints}, Dealer score: ${dealerPoints}`
      stopHitStand();
      }else{

        if(dealerPoints>21){
          `The player has won, Dealer score exceed 21!`
          stopHitStand();
        }
          else{
          msgStat.innerHTML= "It's a Tie!"
          stopHitStand();
          }
      }
     }
}

function dealerPlay(){
  dealerCards[1].classList.remove('back-red');
  // dealerCards[1].classList.add('outline');
  assignCardDealer();
  calcDealerTotal();
  if(playerPoints===21 && (playerHand[0]==='A' || playerHand[1]==='A')){
    msgStat.innerHTML= "!! B L A C K J A C K !!"
    stopHitStand();
  }
  while(dealerPoints<17){
    assignCardDealer();
    calcDealerTotal();
    if(playerPoints===21 && (playerHand[0]==='A' || playerHand[1]==='A')){
      msgStat.innerHTML= "!! B L A C K J A C K !!"
      stopHitStand();
    }
  }
}

function calcTotal(){ //calculate the current points of player and dealer
  calcPlayerTotal();
  calcDealerTotal();
}

function calcDealerTotal(){
  dealerPoints=0;
  for(let i=0; i<dealerHand.length; i++){
    if(dealerHand[i]!== null && dealerHand[i].slice(1)!=='A'){
      if(dealerHand[i].slice(1)==='J' || dealerHand[i].slice(1)==='K' || dealerHand[i].slice(1)==='Q' || dealerHand[i].slice(1)=== '10'){
        dealerPoints+=10;
      }else{
        dealerPoints+=(parseInt(dealerHand[i].slice(1)));
      }
    }
  }
  for(let i=0; i<dealerHand.length; i++){  //condition with ACE(value of )
    if(dealerHand[i]!== null && dealerHand[i].slice(1)==='A'){
      if(dealerPoints<=10){
        dealerPoints+=11;
      }else{
        dealerPoints+=1;
      }
    }
  }
  console.log(dealerPoints);
}

function calcPlayerTotal(){
  playerPoints=0;
  for(let i=0; i<playerHand.length; i++){
    if(playerHand[i]!== null && playerHand[i].slice(1)!=='A'){
      if(playerHand[i].slice(1)==='J' || playerHand[i].slice(1)==='K' || playerHand[i].slice(1)==='Q' || playerHand[i].slice(1)=== '10'){
        playerPoints+=10;
      }else{
        playerPoints+=(parseInt(playerHand[i].slice(1)));
      }
    }
  }
  for(let i=0; i<playerHand.length; i++){  //condition with ACE(value of )
    if(playerHand[i]!== null && playerHand[i].slice(1)==='A'){
      if(playerPoints<=10){
        playerPoints+=11;
      }else{
        playerPoints+=1;
      }
    }
  }
  console.log(playerPoints)
}

function pickCard(){
  let randIdx = Math.floor(Math.random()*deck1.length);
  cardPicked = deck1.splice(randIdx, 1)[0];
  
}

function assignCardDealer(){
  pickCard();
  for(let i=0; i<dealerHand.length; i++){
    if(dealerHand[i]===null){
      dealerHand[i]=cardPicked;
      dealerCards[i].classList.remove('outline');
      dealerCards[i].classList.add(cardPicked);
      return;
    }
  }
}

function assignCardPlayer(){
  pickCard();
  for(let i=0; i<playerHand.length; i++){
    if(playerHand[i]===null){
      playerHand[i]=cardPicked;
      playerCards[i].classList.remove('outline');
      playerCards[i].classList.add(cardPicked);
      return;
    }
  }
}

function resetHands(){
  dealerCards.forEach(element => element.removeAttribute('class'));
  playerCards.forEach(element =>element.removeAttribute('class'));
  dealerCards.forEach(element => element.setAttribute('class', 'card small outline player'));
  playerCards.forEach(element =>element.setAttribute('class', 'card small outline player'));
}

function stopHitStand(){
  hitBtn.disabled = true;
  standBtn.disabled = true;
}
