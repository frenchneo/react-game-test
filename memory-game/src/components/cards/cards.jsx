import Card from "./card";

const Cards = ({ cards, onCardClick, flippedCards }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
      {cards.map((card) => {
        const flipped = flippedCards.includes(card.uniqueId);
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