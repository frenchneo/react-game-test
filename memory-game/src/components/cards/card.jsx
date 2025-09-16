import ReverseCard from "../../assets/img/reverse_card.png"

const Card = ({ img, onClick, flipped }) => {
  return (
    <img
      className={`card ${img}`}
      src={flipped ? img : ReverseCard}
      alt={`card ${img}`}
      onClick={onClick}
    />
  );
};
export default Card;
