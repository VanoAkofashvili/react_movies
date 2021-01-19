import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";

import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";

export default function Home() {
  const {
    movies,
    isLoading,
    categoryRef,
    categoryIconRef,
  } = useGlobalContext();

  useEffect(() => {
    categoryRef.current.style.display = "block";
    categoryIconRef.current.style.visibility = "visible";
  }, []);

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
