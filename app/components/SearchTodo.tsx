import { useContext, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { AppContext } from '../store';
import { useTodos } from '../storezust';

const SearchTodo = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {theme, setFilteredTodos} = useContext(AppContext);
  const {todos} = useTodos()

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = query
      ? todos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()))
      : todos;
    setFilteredTodos(filtered);
  };

  return (
    <View style={[styles.searchBar, {backgroundColor: theme === 'dark' ? "#fff" : "#000"}]}>
      <Ionicons name="search" size={24} color={theme === 'dark' ? "#000" : "#fff"} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={handleSearch}
        style={[styles.searchInput, { backgroundColor: theme === 'dark' ? '#fff' : '#000' }, {color:theme === 'dark' ? "#000" : "#fff"}]}
      />
      {searchQuery && (
        <TouchableOpacity onPress={() => handleSearch('')}>
          <Ionicons name="close-circle" size={24} color={theme === 'dark' ? "#000" : "#fff"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchTodo;