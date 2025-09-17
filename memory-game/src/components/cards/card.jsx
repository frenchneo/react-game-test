import ReverseCard from "../../assets/img/reverse_card.png";

const Card = ({ img, onClick, flipped }) => {
  return (
    <div
      className="w-32 h-40 sm:w-40 sm:h-52 cursor-pointer transition-transform transform hover:scale-105 active:scale-95"
      onClick={onClick}
    >
      <img
        className="w-full h-full object-cover rounded-xl border-4 border-white shadow-lg bg-white"
        src={flipped ? img : ReverseCard}
        alt="card"
      />
    </div>
  );
};

export default Card;
