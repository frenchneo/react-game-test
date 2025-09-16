import "./App.css";
import Card1 from "./assets/img/card_1.png";
import Card2 from "./assets/img/card_2.png";
import Card3 from "./assets/img/card_3.png";
import Card4 from "./assets/img/card_4.png";
import Card5 from "./assets/img/card_5.png";
import Cards from "./components/cards/cards";
import { useEffect, useState } from "react";

function App() {
  const handleClick = (card) => {
    console.log("ça clique", card);
    if (firstChoice === null) {
      setFirstChoice(card);
    } else {
      setSecondChoice(card);
    }
  };
  const cards = [Card1, Card2, Card3, Card4, Card5];
  const [opCards, setOpCards] = useState([]);

  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);

  const resetChoices = () => {
    setFirstChoice(null);
    setSecondChoice(null);
  };

  const traitementCards = (cards) => {
    const doubled = [...cards, ...cards].map((card) => ({
      img: card,
      uniqueId: crypto.randomUUID(),
    }));
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    return doubled;
  };

  useEffect(() => {
    setOpCards(traitementCards(cards));
  }, []);

  useEffect(() => {
    if (
      firstChoice &&
      secondChoice &&
      firstChoice.img === secondChoice.img &&
      firstChoice != null &&
      secondChoice != null
    ) {
      console.log("ça match !");
      setMatchedCards((prev) => [...prev, firstChoice, secondChoice]);
      resetChoices();
    } else if (
      firstChoice?.img != secondChoice?.img &&
      firstChoice != null &&
      secondChoice != null
    ) {
      console.log("ça match pooo :(");
      resetChoices();
    }
  }, [secondChoice]);

  return (
    <>
      <p>Lorem ipsum</p>
      <Cards cards={opCards} onCardClick={handleClick} />
      <button
        onClick={() => {
          console.log("op", opCards);
        }}
      >
        print op
      </button>
      <button
        onClick={() => {
          console.log("matched", matchedCards);
        }}
      >
        print matched
      </button>
    </>
  );
}

export default App;
