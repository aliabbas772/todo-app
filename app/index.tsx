import { Alert, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import SearchTodo from './components/SearchTodo';
import AddTodo from './components/AddTodo';
import DisplayTodo from './components/DisplayTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';
import styles from './styles';

export type ToDoType = {
  id: string;
  title: string;
  isDone: boolean;
};

const Index = () => {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ToDoType[]>([]);
  const [isDark, setIsDark] = useState<'light' | 'dark'>('light');

  const toggleTheme = async () => {
    setIsDark(isDark === 'dark' ? 'light' : 'dark')
    await AsyncStorage.setItem('mode', JSON.stringify(isDark === 'dark' ? 'light' : 'dark'))
  }

  const deleteAllTodo = async () => {
    const existingTodos = await AsyncStorage.getItem('my-todo');
    if (existingTodos === '[]') {
      if (Platform.OS === 'android') {
        Toast.show('No Items Found', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: isDark === 'dark' ? "#000" : '#fff',
          textColor: isDark === 'dark' ? "#fff" : '#000',
          delay: 0,
        });
      }
      return; // stop execution here
    } else {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete all the items?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: () => {
            setTodos([])
            setFilteredTodos([])
            AsyncStorage.setItem('my-todo', JSON.stringify([]));
          }, style: 'destructive'
        },
      ])
    }
  };

  // Load todos on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const mode = await AsyncStorage.getItem('mode')
        if (mode) {
          const parsedMode = JSON.parse(mode);
          setIsDark(parsedMode);
        }
        const storedTodos = await AsyncStorage.getItem('my-todo');
        if (storedTodos) {
          const parsedTodos = JSON.parse(storedTodos);
          setTodos(parsedTodos);
          setFilteredTodos(parsedTodos);
        }
      } catch (err) {
        console.error('Error loading todos:', err);
      }
    };

    loadTodos();
  }, []);

  // Save todos when they change
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('my-todo', JSON.stringify(todos));
      } catch (err) {
        console.error('Error saving todos:', err);
      }
    };
    if (todos.length > 0) {
      saveTodos();
    }
  }, [todos]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <RootSiblingParent>
      <SafeAreaView style={[styles.container, isDark === 'dark' && { backgroundColor: 'black' }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={deleteAllTodo}>
            {/* <Ionicons name="trash" size={24} color={isDark === 'dark' ? "#ebe5e5ff" : "#000"} /> */}
            <Text style={{ color: isDark === 'dark' ? "red" : "red", fontWeight: 'bold' }}>Delete All</Text>
          </TouchableOpacity>
          {
            <TouchableOpacity onPress={toggleTheme}>
              {isDark === 'dark' ?
                <MaterialIcons name="light-mode" size={24} color="#f2ededff" />
                :
                <MaterialIcons name="dark-mode" size={24} color="#120202ff" />
              }
            </TouchableOpacity>
          }
        </View>
        <SearchTodo todos={todos} setFilteredTodos={setFilteredTodos} isDark={isDark} />

        <DisplayTodo setTodos={setTodos} todos={filteredTodos} isDark={isDark} />

        <AddTodo setTodos={setTodos} todos={todos} isDark={isDark} />
      </SafeAreaView>
    </RootSiblingParent>
  );
};

export default Index;