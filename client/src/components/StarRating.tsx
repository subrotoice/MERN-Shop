interface RatingProps {
  ratings: number;
}

const StarRating = ({ ratings }: RatingProps) => {
  const fullStars = Math.floor(ratings); // Full stars count
  const hasHalfStar = ratings % 1 !== 0; // Check if there is a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="rating">
      {/* Full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="radio"
            name={`rating-${index}`}
            className="mask mask-star-2 bg-yellow-400"
            checked
            readOnly
          />
        ))}

      {/* Half star */}
      {hasHalfStar && (
        <input
          type="radio"
          name={`rating-half`}
          className="mask mask-star-2 bg-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
          checked
          readOnly
        />
      )}

      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <input
            key={index + fullStars}
            type="radio"
            name={`rating-${index + fullStars}`}
            className="mask mask-star-2 bg-gray-300"
            readOnly
          />
        ))}
    </div>
  );
};

export default StarRating;
