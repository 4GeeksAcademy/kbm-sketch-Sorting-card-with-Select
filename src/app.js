import "./style.css";



window.onload = function() {
 const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  let deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ Value: value, Suit: suit });
    }
  }

  function shuffleDeck(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const valueOrder = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  function createCardHTML(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", `card-${card.Suit.toLowerCase()}`);
    cardElement.setAttribute("data-value", valueOrder[card.Value]);

    const valueElement = document.createElement("span");
    valueElement.textContent = card.Value;
    valueElement.classList.add("card-value");

    const suitElement = document.createElement("span");
    suitElement.innerHTML =
      card.Suit === "Hearts"
        ? "&hearts;"
        : card.Suit === "Diamonds"
        ? "&diams;"
        : card.Suit === "Spades"
        ? "&spades;"
        : "&clubs;";
    suitElement.classList.add("card-suit");

    cardElement.appendChild(valueElement);
    cardElement.appendChild(suitElement);
    return cardElement;
  }

  const generateButton = document.getElementById("drawButton");
  const cardDisplay = document.getElementById("cardDisplay");
  const sortBtn = document.getElementById("sortBtn");
  const sortSteps = document.getElementById("sortSteps");

  generateButton.addEventListener("click", function () {
    shuffleDeck(deck);
    const numCards = parseInt(document.getElementById("numCards").value);
    cardDisplay.innerHTML = "";

    const drawnCards = deck.slice(0, numCards);
    console.log(drawnCards);

    drawnCards.forEach((card) => {
      const cardHTML = createCardHTML(card);
      cardDisplay.appendChild(cardHTML);
    });
  });

  sortBtn.addEventListener("click", () => {
    let cards = Array.from(document.getElementById("cardDisplay").children);
    sortSteps.innerHTML = ""; 

    function logSortStep() {
      const stepItem = document.createElement("li");
      const stepCardList = document.createElement("div");
      stepCardList.classList.add("step-card-row");

     
      cards.forEach((card) => {
        const cardClone = card.cloneNode(true);
        stepCardList.appendChild(cardClone);
      });

      stepItem.appendChild(stepCardList);
      sortSteps.appendChild(stepItem);
    }

    function selectionSort(i = 0) {
      if (i >= cards.length - 1) return; 

      let minIndex = i; 

      
      for (let j = i + 1; j < cards.length; j++) {
        const currentValue = parseInt(
          cards[minIndex].getAttribute("data-value")
        );
        const nextValue = parseInt(cards[j].getAttribute("data-value"));

        if (nextValue < currentValue) {
          minIndex = j; 
        }
      }

      
      if (minIndex !== i) {
        
        [cards[i], cards[minIndex]] = [cards[minIndex], cards[i]];

       
        cardDisplay.innerHTML = ""; 
        cards.forEach((card) => cardDisplay.appendChild(card)); 

        
        logSortStep();
      }

      
      setTimeout(() => selectionSort(i + 1), 500); 
    }

    selectionSort(); 
  });
};
