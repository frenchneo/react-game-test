import Card from "./card";

const Cards = ({ cards, onCardClick }) => {
  return (
    <div className="cards-container">
      {cards.map((card) => {
        return <Card key={card.uniqueId} img={card.img} onClick={() => onCardClick(card)} />;
      })}
    </div>
  );
};

export default Cards;
