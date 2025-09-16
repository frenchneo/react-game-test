import Card from "./card";

const Cards = ({ cards, onCardClick }) => {
  return (
    <div className="cards-container">
      {cards.map((img, idx) => {
        return <Card key={idx} img={img} onClick={() => onCardClick(img)} />;
      })}
    </div>
  );
};

export default Cards;
