import { Dispatch, SetStateAction, useState } from 'react';
import { Platform, TextInput, TouchableOpacity, View } from 'react-native';
import { ToDoType } from '..';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

interface SearchTodoProps {
  setFilteredTodos: Dispatch<SetStateAction<ToDoType[]>>;
  todos: ToDoType[];
  isDark: 'dark' | 'light'
}

const SearchTodo = ({ setFilteredTodos, todos, isDark }: SearchTodoProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = query
      ? todos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()))
      : todos;
    setFilteredTodos(filtered);
  };

  return (
    <View style={[styles.searchBar, {backgroundColor:isDark === 'dark' ? "#fff" : "#000"}]}>
      <Ionicons name="search" size={24} color={isDark === 'dark' ? "#000" : "#fff"} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={handleSearch}
        style={[styles.searchInput, { backgroundColor: isDark === 'dark' ? '#fff' : '#000' }, {color:isDark === 'dark' ? "#000" : "#fff"}]}
      />
      {searchQuery && (
        <TouchableOpacity onPress={() => handleSearch('')}>
          <Ionicons name="close-circle" size={24} color={isDark === 'dark' ? "#000" : "#fff"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchTodo;