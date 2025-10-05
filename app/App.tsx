import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import SearchTodo from './components/SearchTodo';
import AddTodo from './components/AddTodo';
import DisplayTodo from './components/DisplayTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, store } from './storeredux';
// import { toggleTheme } from './themeSlice';
import { AppContext } from './store';
import { useTodos } from './storezust';
import styles from './styles';

export type ToDoType = {
  id: string;
  title: string;
  isDone: boolean;
};

const App = () => {

  const { todos, setTodos } = useTodos();
  // const [todos, setTodos] = useState<ToDoType[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ToDoType[]>([]);
  const [isDark, setIsDark] = useState<'light' | 'dark'>('light');
  const isFirstRender = useRef(true);

  // const dispatch = useDispatch();
  // const { isDark } = useSelector((state: RootState) => state.theme); // redux rtk

  const toggleTheme = async () => {
    setIsDark(isDark === 'dark' ? 'light' : 'dark')
    await AsyncStorage.setItem('mode', JSON.stringify(isDark === 'dark' ? 'light' : 'dark'))
  }

  const deleteAllTodo = async () => {
    const existingTodos = await AsyncStorage.getItem('my-todo');
    if (existingTodos === '[]') {
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

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await AsyncStorage.setItem('mode', JSON.stringify(isDark === 'dark' ? 'light' : 'dark'))
  //     } catch (err) {
  //       console.error('Error saving todos:', err);
  //     }
  //   })()
  // }, [isDark])

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

    if (isFirstRender.current) {
      // Skip saving on initial mount
      isFirstRender.current = false;
      return;
    }

    // if (todos.length > 0) {
    // console.log(todos)
    saveTodos();
    // }
  }, [todos]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <AppContext.Provider value={{ theme: isDark, filteredTodos, setFilteredTodos }}>
      <RootSiblingParent>
        <SafeAreaView style={[styles.container, isDark === 'dark' && { backgroundColor: 'black' }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={deleteAllTodo}>
              {/* <Ionicons name="trash" size={24} color={isDark === 'dark' ? "#ebe5e5ff" : "#000"} /> */}
              <Text style={{ color: isDark === 'dark' ? "red" : "red", fontWeight: 'bold' }}>Delete All</Text>
            </TouchableOpacity>
            {
              <TouchableOpacity onPress={(toggleTheme)}>
                {isDark === 'dark' ?
                  <MaterialIcons name="light-mode" size={24} color="#f2ededff" />
                  :
                  <MaterialIcons name="dark-mode" size={24} color="#120202ff" />
                }
              </TouchableOpacity>
            }
          </View>

          <SearchTodo />

          <DisplayTodo />

          <AddTodo />

        </SafeAreaView>
      </RootSiblingParent>
    </AppContext.Provider>
  );
};

export default App;