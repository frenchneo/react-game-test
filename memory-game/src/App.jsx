import "./App.css";
import Card1 from "./assets/img/card_1.png";
import Card2 from "./assets/img/card_2.png";
import Card3 from "./assets/img/card_3.png";
import Card4 from "./assets/img/card_4.png";
import Card5 from "./assets/img/card_5.png";
import Cards from "./components/cards/cards";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { errorAlert, succesAlert } from "./helpers/notification";
import Modal from "react-modal";

function App() {
  const [opCards, setOpCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (card) => {
    if (
      isDisabled ||
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
    setOpCards(traitementCards(cards));
    closeModal();
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

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
      setIsDisabled(true);
      setTimeout(() => {
        setFlippedCards((prev) =>
          prev.filter(
            (id) => id !== firstChoice.uniqueId && id !== secondChoice.uniqueId
          )
        );
        resetChoices();
        setIsDisabled(false);
      }, 1000);
    }
  }, [secondChoice]);

  useEffect(() => {
    if (matchedCards.length === opCards.length && opCards.length > 0) {
      setTimeout(() => {
        openModal();
      }, 500);
    }
  }, [matchedCards, opCards]);

  return (
    <>
      <p>Lorem ipsum</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={() => resetGame()}>Rejouer</button>
      </Modal>
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
