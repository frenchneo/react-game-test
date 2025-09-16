const Card = ({ img, onClick }) => {
  return (
    <img
      className={`card ${img}`}
      src={img}
      alt={`card ${img}`}
      onClick={onClick}
    />
  );
};
export default Card;
