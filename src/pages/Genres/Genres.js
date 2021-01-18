import { useEffect } from "react";
import { useGlobalContext } from "../../context";
import axios from "../../axios";

const Genres = ({ id }) => {
  const { setMovies } = useGlobalContext();

  useEffect(() => {
    axios
      .get(
        `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [genre_id]);
  return null;
};

export default Genres;
