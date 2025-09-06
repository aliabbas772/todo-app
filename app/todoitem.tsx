import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

export type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};

const ToDoItem = ({
  todo,
  deleteTodo,
  handleTodo,
}: {
  todo: ToDoType;
  deleteTodo: (id: number) => void;
  handleTodo: (id: number) => void;
}) => (
  <View style={styles.todoContainer}>
    <View style={styles.todoInfoContainer}>
      <TouchableOpacity style={styles.checkbox} onPress={() => handleTodo(todo.id)}>
      <Checkbox
        value={todo.isDone}
        onValueChange={() => {
          handleTodo(todo.id);
        }}
        color={todo.isDone ? "#4630EB" : undefined}
      />
      <Text
        style={[
          styles.todoText, {flex: 1},
          todo.isDone && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          "Confirm Delete",
          "Are your Sure you want to delete this item??",
          [
            { text: "Cancel", style: "cancel"},
            { text: "Delete", onPress: () =>  deleteTodo(todo.id), style: "destructive"}
          ]
        );
      }}
    >
      <Ionicons name="trash" size={24} color={"red"} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  todoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-start'
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    flexWrap: "wrap",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 10
  }
});

export default ToDoItem;
