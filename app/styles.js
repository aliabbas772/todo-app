// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#333333',
  },
  addTodoPage: {
    marginBottom: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    height: 100,
  },
  addButton: {
    backgroundColor: '#030304ff',
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'red',
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
    flex: 1,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  edit: {
    marginRight: 10, // Space between edit/save and delete buttons
  },
  editInput: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    paddingVertical: 0, // Match Text styling
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5, // Space between buttons
  },
  noteContainer: {
    // flex: 1,
    // height: 30,
    padding: 0,
    gap: 30,
  },
  saveButton: {
    backgroundColor: '#030304ff',
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelsave: {
    flexDirection: 'row',
    width: '100%'
  },
  buttonFull: {
  flex: 1,                  // each button takes equal space
  marginHorizontal: 5,      // small gap
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  borderRadius: 10,
  backgroundColor: '#030304ff',
},
});

export default styles