const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return { ...state, isSidebarOpen: true };
    }
    case "CLOSE_SIDEBAR": {
      return { ...state, isSidebarOpen: false };
    }
    case "OPEN_SEARCH": {
      return { ...state, isSearchOpen: true };
    }
    case "CLOSE_SEARCH":
      return { ...state, isSearchOpen: false };
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SET_GENRES":
      return { ...state, genres: action.payload };
    case "LOADING":
      return { ...state, isLoading: action.payload };
    default: {
      return state;
    }
  }
};

export { reducer };
