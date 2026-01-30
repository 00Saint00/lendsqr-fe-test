interface StarRatingProps {
  value: number;
  className?: string;
}

const StarRating = ({ value, className = "" }: StarRatingProps) => {
  const n = Math.min(5, Math.max(0, Math.round(value)));
  return (
    <span className={className} style={{ color: "#E9B200" }} aria-label={`${value} out of 5 stars`}>
      {"★".repeat(n)}
    </span>
  );
};

export default StarRating;
