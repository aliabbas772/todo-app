import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { ToDoType } from '..';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles';
import { View } from 'react-native';

interface AddTodoProps {
  setTodos: Dispatch<SetStateAction<ToDoType[]>>;
  todos: ToDoType[];
  isDark: 'dark' | 'light';
}

const AddTodo = ({ setTodos, todos, isDark }: AddTodoProps) => {

  const [todoText, setTodoText] = useState('');
  const [isNoteOpen, setIsNoteOpen] = useState<boolean>(false);
  const addRef = useRef<TextInput>(null);

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
          <TouchableOpacity style={[styles.buttonFull, isDark === 'dark' && { backgroundColor: 'white' }]} onPress={() => { addTodo() }}>
            <Ionicons name="save" size={34} color={isDark === 'dark' ? "#000" : "#fff"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonFull, isDark === 'dark' && { backgroundColor: 'white' }]} onPress={() => { setIsNoteOpen(false) }}>
            <Ionicons name="close" size={34} color={isDark === 'dark' ? "#000" : "#fff"} />
          </TouchableOpacity>
          </View>
        </View>
        :
        <TouchableOpacity style={[styles.addButton, isDark === 'dark' && { backgroundColor: 'white' }]} onPress={() => { setIsNoteOpen(true) }}>
          <Ionicons name="add" size={34} color={isDark === 'dark' ? "#000" : "#fff"} />
        </TouchableOpacity>
      }

    </KeyboardAvoidingView>
  );
};

export default AddTodo;