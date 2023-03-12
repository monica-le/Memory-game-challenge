const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "pink",
  "skyblue",
  "palegreen",
  "lightsalmon",
  "plum",
  "pink",
  "skyblue",
  "palegreen",
  "lightsalmon",
  "plum"
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
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

// TODO: Implement this function!
function handleCardClick(event) {
  // if noClicking is true, do nothing
  if (noClicking) return;
  // only clicking on 2 different cards is a match
  // if the clicked card contains the flipped class do nothing, don't flip over again
  if (event.target.classList.contains("flipped")) return;

  // show the color of the clicked card
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  // if no card1 or no card2 clicked
  if (!card1 || !card2) {
    // add the flipped class to the clicked card
    currentCard.classList.add("flipped");
    // set card1 to the currentCard but set it to itself since we are about to click on a card2
    card1 = card1 || currentCard;
    // as we are going to click on card2, if the current clicked card is the same as card1 do nothing
    // if the current clicked card is not, set it to card2
    card2 = currentCard === card1 ? null : currentCard;
  }

  // if two different cards are clicked on
  if (card1 && card2) {
    // turn noClicking on
    noClicking = true;
  
  // if the colors of the cards match
  if (card1.className === card2.className) {
    // increase the counter
    cardsFlipped += 2;
    // remove the event listeners so you cannot click on them again
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    // reset the cards back to nothing so you can click on them again in a new round
    card1 = null;
    card2 = null;
    // turn off noClicking
    noClicking = false;

    // if the cards do not match
  } else {
    // after a delay of 1 second
    setTimeout(function() {
      // unshow the color of the cards
      card1.style.backgroundColor = "";
      card2.style.backgroundColor = "";
      // remove the flipped class from cards too
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      // reset the cards back to nothing so you can click on them again in a new round
      card1 = null;
      card2 = null;
      // turn off noClicking
      noClicking = false;
    }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("game over!");
}
