import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ToDoItem, { ToDoType } from "./todoitem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {

    useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

      lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: false,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: true,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];

  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);
  const addRef = useRef<TextInput>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const imageUri =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ne7oVV6Lx9uAnmJDUZrrLcGy8yzo1sXdpQ&s";


  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos !== null) {
          setTodos(JSON.parse(todos));
          setOldTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      if (todoText) {
        const newTodo = {
          id: Math.random(),
          title: todoText,
          isDone: false,
        };
        todos.push(newTodo);
        setTodos(todos);
        setOldTodos(todos);
        await AsyncStorage.setItem("my-todo", JSON.stringify(todos));
        setTodoText("");
        Keyboard.dismiss();
      } else {
        addRef.current?.focus();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSearch = (query: string) => {
    if (query == "") {
      setTodos(oldTodos);
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            // alert("Clicked!!");
          }}
        >
          <Ionicons name="menu" size={24} color={"#333"} />
        </TouchableOpacity>
         {/* Thumbnail */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </TouchableOpacity>

      {/* Fullscreen Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Enlarged Image */}
          <Image source={{ uri: imageUri }} style={styles.fullImage} />
        </View>
      </Modal>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={"#333333"} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
          clearButtonMode="always"
        />
        <TouchableOpacity
          onPress={() => {
            clearSearch();
          }}
        >
          {searchQuery &&
          <Ionicons name="close-circle" size={24} color={"#333333"} /> }
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ToDoItem
            todo={item}
            deleteTodo={deleteTodo}
            handleTodo={handleDone}
          />
        )}
         ListEmptyComponent={() => (
        <Text style={{ textAlign: "center", justifyContent: 'center', alignItems: 'center', marginTop: 50, fontSize: 16 }}>
          No Todos
        </Text>
  )}
      />

      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={2}
      >
        <TextInput
          placeholder="Add New Todo"
          placeholderTextColor="gray"
          ref={addRef}
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
          style={styles.newTodoInput}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addTodo();
          }}
        >
          <Ionicons name="add" size={24} color={"#ffffff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  searchBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 16 : 8,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  addtodoicon: {
    backgroundColor: "aqua",
    borderRadius: 20,
    flexDirection: "column",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4630EB",
    padding: 8,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    padding: 8,
  },
  closeText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
});

export default index;
