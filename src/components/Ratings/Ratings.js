const Ratings = ({ ratings }) => {
  let ratingMarkup = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= ratings) {
      ratingMarkup.push(
        <i
          key={i}
          className="material-icons-round card-rating-yellow card-rating"
        >
          star
        </i>
      );
    } else {
      ratingMarkup.push(
        <i
          key={i}
          className="material-icons-round card-rating-gray card-rating"
        >
          star
        </i>
      );
    }
  }

  return <>{ratingMarkup}</>;
};

export default Ratings;
