// zustand

import { create } from 'zustand';
import { ToDoType } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetStateAction } from 'react';

interface Todostate{
    todos: ToDoType[];
    setTodos: (todos: SetStateAction<ToDoType[]>) => void;
    saveToStorage: () => Promise<void>;
}

export const useTodos = create<Todostate>((set, get) => ({
    todos: [],
    setTodos: (update: SetStateAction<ToDoType[]>) =>
    set((state) => ({
      todos: typeof update === 'function' ? update(state.todos) : update,
    })),

  saveToStorage: async () => {
    try {
      await AsyncStorage.setItem("my-todo", JSON.stringify(get().todos));
    } catch (e) {
      console.error("Error saving todos:", e);
    }
  },
}));