import React, { useContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import axios from "./axios";

const AppContext = React.createContext();

const defaultState = {
  isSidebarOpen: false,
  isSearchOpen: false,
  movies: [],
  genres: [],
  isLoading: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

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

    Promise.all(promises)
      .then((responses) => {
        dispatch({ type: "SET_MOVIES", payload: responses[0].data.results });
        dispatch({ type: "SET_GENRES", payload: responses[1].data.genres });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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
    console.log(data);
    dispatch({ type: "SET_MOVIES", payload: data });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        openSearch,
        closeSearch,
        setMovies,
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
