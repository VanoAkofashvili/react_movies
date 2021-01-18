import React, { useState } from "react";
import { useGlobalContext } from "../../context";

import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";

import { useParams } from "react-router-dom";

export default function Home() {
  const { id } = useParams();

  if (id) {
  }

  const { movies, isLoading } = useGlobalContext();
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
