import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";

const Genres = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setMovieGenre, moviesGenre } = useGlobalContext();
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`
      )
      .then((response) => {
        setMovieGenre(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id, setMovieGenre]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home">
      {moviesGenre.map((item) => {
        return <MovieCard {...item} key={item.id} />;
      })}
    </div>
  );
};

export default Genres;
