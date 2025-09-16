import Card from "./cards/card";

const Cards = ({ cards, onClick }) => {
  return (
    <div className="cards-container">
      {cards.map((img, idx) => {
        {
            console.log(img)
        }
        return <Card key={idx} img={img} onClick={() => onClick(img)}/>;
      })}
    </div>
  );
};

export default Cards;
