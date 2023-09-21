import { useContext, createContext } from "react";

const SearchContext = createContext();

// custom hook
const useSearch = () => useContext(SearchContext);

export { SearchContext, useSearch };
