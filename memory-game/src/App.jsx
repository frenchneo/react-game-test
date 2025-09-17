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
import Header from "./components/ui/header";

function App() {
  const [opCards, setOpCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (card) => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
    if (
      isDisabled ||
      flippedCards.includes(card.uniqueId) ||
      matchedCards.find((c) => c.uniqueId === card.uniqueId)
    )
      return;
    setFlippedCards((prev) => [...prev, card.uniqueId]);

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
    setTimeLeft(60);
    setTimerStarted(false);
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

  const [timeLeft, setTimeLeft] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const isWin = matchedCards.length === opCards.length && opCards.length > 0;

  useEffect(() => {
    setOpCards(traitementCards(cards));
  }, []);

  useEffect(() => {
    if (firstChoice && secondChoice && firstChoice.img === secondChoice.img) {
      succesAlert("Bon choix !");
      setMatchedCards((prev) => [...prev, firstChoice, secondChoice]);
      resetChoices();
    } else if (
      firstChoice &&
      secondChoice &&
      firstChoice.img !== secondChoice.img
    ) {
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

  useEffect(() => {
    let interval = null;

    if (timerStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      openModal();
    }

    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 flex flex-col items-center pb-6">
      <Header />
      <p className="text-lg font-semibold text-gray-800 mb-4">
        ⏱️ Temps restant : {timeLeft}s
      </p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        contentLabel="Fin de partie"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center w-80 animate-fadeIn">
          {isWin ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🎉 Bravo !
              </h2>
              <p className="text-gray-600 mb-6">
                Tu as trouvé toutes les paires 👏
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                ⏰ Temps écoulé !
              </h2>
              <p className="text-gray-600 mb-6">
                Tu as perdu... Essaie encore 😉
              </p>
            </>
          )}
          <button
            onClick={resetGame}
            className="mt-4 px-6 py-2 bg-gray-100 text-black font-semibold rounded-lg shadow-md 
             hover:bg-gray-200 hover:shadow-lg active:scale-95 transition duration-200"
          >
            🔄 Rejouer
          </button>
        </div>
      </Modal>

      <Cards
        cards={opCards}
        onCardClick={handleClick}
        flippedCards={[
          ...matchedCards.map((card) => card.uniqueId),
          ...flippedCards,
        ]}
      />

      <ToastContainer />
    </div>
  );
}

export default App;
