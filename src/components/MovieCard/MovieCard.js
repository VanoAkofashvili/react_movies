import React, { useRef, useEffect, useState } from "react";
import { FaImdb } from "react-icons/fa";
import { FiPlayCircle } from "react-icons/fi";

import { useGlobalContext } from "../../context";

export default function MovieCard({
  title,
  overview,
  vote_average,
  poster_path,
  release_date,
  genre_ids,
  original_language,
}) {
  const cardRef = useRef(null);
  const [mGenres, setMGenres] = useState([]);
  const { genres } = useGlobalContext();

  const mouseEnterHandler = () => {
    cardRef.current.classList.add("movie-card__details--show");
  };

  const mouseLeaveHandler = () => {
    cardRef.current.classList.remove("movie-card__details--show");
  };

  useEffect(() => {
    const movie_genres = genres
      .map((item) => {
        if (genre_ids.includes(item.id)) {
          return item.name;
        }
      })
      .filter((name) => name);
    setMGenres(movie_genres);
  }, []);

  return (
    <div
      className="movie-card"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className="movie-car__image-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
      </div>
      <h4 className="mt-1">{title}</h4>
      <p className="movie-card__year">{release_date.split("-")[0]}</p>
      <div className="movie-card__details" ref={cardRef}>
        <div>
          <p className="d_title pt-1 pl-1">{title}</p>
          <p className="d_overview mt-1">{overview.slice(0, 150)}...</p>
          <p className="d_imdb flex-row-center mt-2">
            <FaImdb className="mr-1" /> {vote_average}
          </p>
          <p className="d_genre mt-1">
            <span>ჟანრი:</span>{" "}
            {mGenres.join(", ") || "ჟანრი არ არის მითითებული"}
          </p>
          <p>
            <span>ენა:</span> {original_language}
          </p>
          <p>
            <span>წელი:</span> {release_date.split("-")[0]}
          </p>
        </div>
        <p className="see_more flex-row-center">
          <FiPlayCircle /> <a href="#">ფილმის ყურება</a>
        </p>
      </div>
    </div>
  );
}
