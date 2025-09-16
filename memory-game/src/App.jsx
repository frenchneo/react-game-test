import "./App.css";
import Card1 from "./assets/img/card_1.png";
import Card2 from "./assets/img/card_2.png";
import Card3 from "./assets/img/card_3.png";
import Card4 from "./assets/img/card_4.png";
import Card5 from "./assets/img/card_5.png";
import Cards from "./components/cards";
import { useEffect, useState } from "react";

function App() {
  const handleClick = (img) => {
    console.log("ça clique");
  };
  const cards = [Card1, Card2, Card3, Card4, Card5];
  const [opCards, setOpCards] = useState([]);

  const traitementCards = (cards) => {
    const doubled = [...cards, ...cards];

    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }

    return doubled;
  };

  useEffect(() => {
    setOpCards(traitementCards(cards));
  }, []);

  return (
    <>
      <p>Lorem ipsum</p>
      <Cards cards={opCards} onCardClick={handleClick} />
    </>
  );
}

export default App;
