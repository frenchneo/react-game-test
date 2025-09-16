import "./App.css";
import Card1 from "./assets/img/card_1.png";
import Card2 from "./assets/img/card_2.png";
import Card3 from "./assets/img/card_3.png";
import Card4 from "./assets/img/card_4.png";
import Card5 from "./assets/img/card_5.png";
import Cards from "./components/cards/cards";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { errorAlert, succesAlert } from "./helpers/notification";

function App() {
  const [opCards, setOpCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const handleClick = (card) => {
    if (
      flippedCards.includes(card.uniqueId) ||
      matchedCards.find((c) => c.uniqueId === card.uniqueId)
    )
      return;

    setFlippedCards((prev) => [...prev, card.uniqueId]);

    console.log("ça clique", card);

    if (firstChoice === null) {
      setFirstChoice(card);
    } else {
      setSecondChoice(card);
    }
  };

  const cards = [Card1, Card2, Card3, Card4, Card5];

  const resetChoices = () => {
    setFirstChoice(null);
    setSecondChoice(null);
  };

  const resetGame = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setMatchedCards([]);
    setOpCards(traitementCards(cards)); // remélange les cartes
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
    if (firstChoice && secondChoice && firstChoice.img === secondChoice.img) {
      console.log("ça match !");
      succesAlert("Bon choix !");
      setMatchedCards((prev) => [...prev, firstChoice, secondChoice]);
      resetChoices();
    } else if (
      firstChoice &&
      secondChoice &&
      firstChoice.img !== secondChoice.img
    ) {
      console.log("pas match");
      errorAlert("Mauvais choix !");
      setTimeout(() => {
        setFlippedCards((prev) =>
          prev.filter(
            (id) => id !== firstChoice.uniqueId && id !== secondChoice.uniqueId
          )
        );
        resetChoices();
      }, 1000);
    }
  }, [secondChoice]);

  useEffect(() => {
    if (matchedCards.length === opCards.length && opCards.length > 0) {
      setTimeout(() => {
        succesAlert("Bravo, tu as gagné !");
        resetGame();
      }, 500);
    }
  }, [matchedCards, opCards]);

  return (
    <>
      <p>Lorem ipsum</p>
      <Cards
        cards={opCards}
        onCardClick={handleClick}
        flippedCards={[
          ...matchedCards.map((card) => card.uniqueId),
          ...flippedCards,
        ]}
      />

      <button onClick={() => console.log("op", opCards)}>print op</button>
      <button onClick={() => console.log("matched", matchedCards)}>
        print matched
      </button>
      <ToastContainer />
    </>
  );
}

export default App;
