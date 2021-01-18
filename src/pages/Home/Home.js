import React, { useState } from "react";
import { useGlobalContext } from "../../context";

import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";

export default function Home() {
  const { movies, isLoading } = useGlobalContext();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {movies.map((item) => {
        return <MovieCard {...item} key={item.id} />;
      })}
    </>
  );
}
