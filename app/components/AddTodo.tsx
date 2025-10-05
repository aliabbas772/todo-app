import { useContext, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { ToDoType } from '../App';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { View } from 'react-native';
import { AppContext } from '../store';
import { useTodos } from '../storezust';

const AddTodo = () => {

  const [todoText, setTodoText] = useState('');
  const [isNoteOpen, setIsNoteOpen] = useState<boolean>(false);
  const addRef = useRef<TextInput>(null);
  const { theme } = useContext(AppContext);
  const { todos, setTodos } = useTodos();

  const addTodo = () => {
    if (!todoText) {
      addRef.current?.focus();
      return;
    }
    const newTodo: ToDoType = {
      id: Math.random().toString(),
      title: todoText,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTodoText('');
    setIsNoteOpen(false)
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.addTodoPage} behavior="padding">
      {isNoteOpen ?
        <View style={styles.noteContainer}>
          <TextInput
            placeholder="Add New Todo"
            placeholderTextColor="gray"
            ref={addRef}
            value={todoText}
            onChangeText={setTodoText}
            style={styles.newTodoInput}
            multiline
            autoFocus
          />
          <View style={styles.cancelsave}>
            <TouchableOpacity style={[styles.buttonFull, theme === 'dark' && { backgroundColor: 'white' }]} onPress={() => { addTodo() }}>
              <Ionicons name="save" size={34} color={theme === 'dark' ? "#000" : "#fff"} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonFull, theme === 'dark' && { backgroundColor: 'white' }]} onPress={() => { setIsNoteOpen(false) }}>
              <Ionicons name="close" size={34} color={theme === 'dark' ? "#000" : "#fff"} />
            </TouchableOpacity>
          </View>
        </View>
        :
        <TouchableOpacity style={[styles.addButton, theme === 'dark' && { backgroundColor: 'white' }]} onPress={() => { setIsNoteOpen(true) }}>
          <Ionicons name="add" size={34} color={theme === 'dark' ? "#000" : "#fff"} />
        </TouchableOpacity>
      }

    </KeyboardAvoidingView>
  );
};

export default AddTodo;