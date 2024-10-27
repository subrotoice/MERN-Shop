import { Rating } from "react-simple-star-rating";

const StarRating = () => {
  return (
    <>
      <div
        style={{
          direction: "ltr",
          fontFamily: "sans-serif",
          touchAction: "none",
        }}
      >
        <Rating initialValue={2} onClick={function noRefCheck() {}} readonly />
      </div>
    </>
  );
};

export default StarRating;
