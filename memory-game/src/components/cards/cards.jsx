import Card from "./card";

const Cards = ({ cards, onCardClick, flippedCards }) => {
  return (
    <div className="cards-container">
      {cards.map((card) => {
        const flipped =
          flippedCards.includes(card.uniqueId)
        return (
          <Card
            key={card.uniqueId}
            img={card.img}
            onClick={() => onCardClick(card)}
            flipped={flipped}
          />
        );
      })}
    </div>
  );
};

export default Cards;
