import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "../../axios";
import { SiImdb } from "react-icons/si";

import Loading from "../../components/Loading/Loading";

const FullMovie = () => {
  const { id } = useParams();
  const { categoryRef, categoryIconRef } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    categoryRef.current.style.display = "none";
    categoryIconRef.current.style.visibility = "hidden";
    setIsLoading(true);
    axios
      .get(
        `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        setMovie(response.data);
        setIsLoading(false);
        return axios.get(
          `/movie/${response.data.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        );
      })
      .then((response) => {
        if (response.data.results.length) {
          setTrailer(response.data.results[0]["key"]);
        } else {
          setTrailer("");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [categoryRef, categoryIconRef, id]);

  if (isLoading) {
    return <Loading />;
  }

  const genresJSX = movie.genres.map((item, index) => {
    return (
      <Link key={index} to={`/genre/${item.id}`}>
        {item.name}
      </Link>
    );
  });

  const backdropStyle = {
    background: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4), 
      rgba(0, 0, 0, 0.7)
    ), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})no-repeat center center/cover`,
    width: "100%",
    height: "60vh",
    position: "relative",
    marginTop: "-5rem",
    zIndex: "9",
  };

  return (
    <div className="full-movie">
      <div className="backdrop" style={backdropStyle}></div>
      <div className="full__container">
        <div className="full__image-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="full__info pl-1">
          <p className="full__year">{movie.release_date}</p>
          <p className="full__title">{movie.title}</p>
          <p className="full__imdb flex-row-center">
            <SiImdb className="mr-1" /> 7.7
          </p>
          <p className="full__genre">{genresJSX}</p>
          <p>
            <strong>ენა:</strong> {movie.original_language}
          </p>
          <p className="ml-2 full__overview">
            <strong>ფილმის აღწერა:</strong> <br /> {movie.overview}
          </p>
        </div>
        <div className="container">
          <p className="full__trailer mb-1">ფილმის თრეილერი: </p>
          <div className="full__trailer__container">
            {trailer ? (
              <iframe
                title={movie.id}
                width="100%"
                height="300px"
                src={`https://www.youtube.com/embed/${trailer}`}
              ></iframe>
            ) : (
              "no trailer"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMovie;
