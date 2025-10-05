// Existing AsyncStorage mock...
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Add this to mock vector icons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: () => View,  // Mock as empty View to avoid rendering issues
    MaterialIcons: () => View,
  };
});