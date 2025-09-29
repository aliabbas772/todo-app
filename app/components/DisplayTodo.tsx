import { Dispatch, SetStateAction, useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ToDoType } from '..';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';

interface DisplayTodoProps {
  setTodos: Dispatch<SetStateAction<ToDoType[]>>;
  todos: ToDoType[];
  isDark: 'dark' | 'light';
}

const DisplayTodo = ({ setTodos, todos, isDark }: DisplayTodoProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const completeTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const startEditing = (id: string, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) {
      Alert.alert('Error', 'Todo cannot be empty');
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <FlatList
      data={[...todos].reverse()}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <View style={[styles.todoContainer, { backgroundColor: isDark === 'dark' ? "#fff" : '#000' }]}>
          <View style={[styles.checkbox, { backgroundColor: isDark === 'dark' ? "#fff" : '#000' }]}>
            {editingId === item.id ? (
              <TextInput
                value={editText}
                onChangeText={setEditText}
                style={[styles.editInput, { color: isDark === 'dark' ? "#000" : '#fff', padding: 10 }]}
                autoFocus
              />
            ) : (
              <>
                <Checkbox
                  value={item.isDone}
                  onValueChange={() => completeTodo(item.id)}
                  color={item.isDone ? (
                    isDark === 'dark' ? "gray" : 'gray'
                  ) :  isDark === 'dark' ? "gray" : 'gray'}
                />
                <Text
                  style={[
                    styles.todoText, { color: isDark === 'dark' ? "#000" : '#fff' },
                    item.isDone && { textDecorationLine: 'line-through', textDecorationColor: isDark === 'dark' ? "#fff" : '#000' },
                  ]}
                >
                  {item.title}
                </Text>
              </>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {editingId === item.id ? (
              <>
                <TouchableOpacity style={styles.edit} onPress={() => saveEdit(item.id)}>
                  <Ionicons name="save" size={24} color={isDark === 'dark' ? "#000" : '#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.edit} onPress={cancelEdit}>
                  <Ionicons name="close" size={24} color={isDark === 'dark' ? "#000" : '#fff'} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.edit}
                onPress={() => startEditing(item.id, item.title)}
              >
                <Ionicons name="pencil" size={24} color={isDark === 'dark' ? "#000" : '#fff'} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteTodo(item.id), style: 'destructive' },
              ])
            }
          >
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => (
        <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 16, color: isDark === 'dark' ? "#fff" : '#000' }}>
          No Todos
        </Text>
      )}
    />
  );
};

export default DisplayTodo;