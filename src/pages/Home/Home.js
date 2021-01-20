import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";

import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "../../axios";

export default function Home() {
  const {
    movies,
    setMovies,
    setLoading,
    isLoading,
    categoryRef,
    categoryIconRef,
  } = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    categoryRef.current.style.display = "block";
    categoryIconRef.current.style.visibility = "visible";
    axios
      .get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [categoryRef, categoryIconRef]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home">
      {movies.map((item) => {
        return <MovieCard {...item} key={item.id} />;
      })}
    </div>
  );
}
