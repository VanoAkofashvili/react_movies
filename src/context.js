import React, {
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { reducer } from "./reducer";
import axios from "./axios";

const AppContext = React.createContext();

const defaultState = {
  isSidebarOpen: false,
  isSearchOpen: false,
  movies: [],
  genres: [],
  moviesGenre: [],
  searchTerm: "",
  isLoading: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const categoryRef = useRef(null);
  const categoryIconRef = useRef(null);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${state.searchTerm}`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [state.searchTerm]);

  useEffect(() => {
    setLoading(true);

    let promises = [
      axios.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      ),
      axios.get(
        `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      ),
    ];

    if (state.searchTerm) {
      promises[0] = axios.get(
        `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${state.searchTerm}&include_adult=false`
      );
    }

    Promise.all(promises)
      .then((responses) => {
        console.log(responses);
        dispatch({ type: "SET_MOVIES", payload: responses[0].data.results });
        dispatch({ type: "SET_GENRES", payload: responses[1].data.genres });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [state.searchTerm]);

  const setSearchTerm = (term) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };

  const openSidebar = () => {
    dispatch({ type: "OPEN_SIDEBAR" });
  };

  const closeSidebar = () => {
    dispatch({ type: "CLOSE_SIDEBAR" });
  };

  const openSearch = () => {
    dispatch({ type: "OPEN_SEARCH" });
  };

  const closeSearch = () => {
    dispatch({ type: "CLOSE_SEARCH" });
  };

  const setLoading = (load) => {
    dispatch({ type: "LOADING", payload: load });
  };

  const setMovies = (data) => {
    dispatch({ type: "SET_MOVIES", payload: data });
  };

  const setMovieGenre = useCallback((data) => {
    dispatch({ type: "SET_MOVIES_GENRE", payload: data });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        openSearch,
        closeSearch,
        setMovies,
        setMovieGenre,
        categoryRef,
        categoryIconRef,
        setSearchTerm,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
