// Context Api

import { createContext } from "react";
import { ToDoType } from "./App";

interface AppContextType{
    theme: 'light' | 'dark',
    // todos: ToDoType[], 
    filteredTodos: ToDoType[],
    // setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
    setFilteredTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
}

export const AppContext = createContext<AppContextType>({
    theme: 'light',
    // todos: [],
    filteredTodos: [],
    // setTodos: () => {},
    setFilteredTodos: () => {}
})