const gameContainer = document.getElementById("game");
let cardOne=null;
let cardTwo=null;
let cardsFlipped=0;
// noClicking is set to false initially since no cards have been clicked 
let noClicking=false;
const button=document.getElementById('btn');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
// shuffle(COLORS) is the array after COLORS array as been shuffled in the shuffle function
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the overall div with an id of game
    gameContainer.append(newDiv);
  }
}

  // TODO: Implement this function!
  function handleCardClick(event) {
      // if noClicking=true do nothing (end function)
        if (noClicking) return;
        // if event.target.classList.contains('flipped'), do nothing
        if (event.target.classList.contains("flipped")) return;
      // set 'currentCard' equal to event.target which equals <div class=(the color assigned) flipped'></div>
        let currentCard = event.target;
        // set background color for currentCard when clicked to the first item in its classList[0]
        currentCard.style.backgroundColor = currentCard.classList[0];
      // if CardOne OR cardTwo are equal to null (means either no cards  or only one card has been clicked)
        if (!cardOne || !cardTwo) {
          // add 'flipped' to classList of currentCard so know that it's been flipped over 
          currentCard.classList.add("flipped");
          // set cardOne=currentCard if cardOne=null; otherwise, cardOne stays equal to cardOne if cardOne does not equal null (means one card has already been clicked on)
          cardOne = cardOne || currentCard;
          // cardTwo stays equal to null if cardOne=currentCard(means first card has been clicked); otherwise, if cardOne=cardOne(means a second card has been clicked) cardTwo=currentCard
          cardTwo = currentCard === cardOne ? null : currentCard;
        }
        // if cardOne AND cardTwo are not null(means 2 cards have been clicked) 
        if (cardOne && cardTwo) {
        // Assign noClicking to true since 2 cards have been clicked
          noClicking = true;
          //cardOne.className equals i.e. blue flipped and cardTwo.className equals i.e. purple flipped. We can us this to see if colors and flip status of cardOne and cardTwo match
          let gif1 = cardOne.className; 
          let gif2 = cardTwo.className;
          // if card colors and flip status are equal, increase the cardsFlipped counter by 2 (for 2 cards matching)
          if (gif1 === gif2) {
            cardsFlipped += 2;
          // remove addEventListeners for cardOne and cardTwo ends the click eventListener on those 2 cards because they match and stay turned up (ends function)
          cardOne.removeEventListener("click", handleCardClick);
          cardTwo.removeEventListener("click", handleCardClick);
          // set cardOne and cardTwo back to null so can start over
            cardOne = null;
            cardTwo = null;
          // set noClicking back to false so can start over with 2 new cards like no cards have been clicked
            noClicking = false;
          } else {
          // if cardOne and cardTwo are different, set a timer so cards stay 'turned up' for 1 second (1000 ms). After that their background colors are removed from cards and 'flipped' is removed from their classList so cards can be clicked on again
            setTimeout(function() {
              cardOne.style.backgroundColor = "";
              cardTwo.style.backgroundColor = "";
              cardOne.classList.remove("flipped");
              cardTwo.classList.remove("flipped");
          // set cardOne and cardTwo back to null so can start over
              cardOne = null;
              cardTwo = null;
              noClicking = false;
            }, 1000);
          }
        }
        // everytime 2 cards match, cardsFlipped increases by 2 so when cardsFlipped = COLORS.length(length of array COLORS), game is over because all cards have been flipped over
        if (cardsFlipped === COLORS.length) alert("game over!");
      }
    
      // when the DOM loads
      createDivsForColors(shuffledColors);
      
      
   
      
       
      



   
        
        
        
      
      
  


