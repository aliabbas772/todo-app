import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './storeredux'
import App from './App'

const Index = () => {
  return (
    // <Provider store={store}>
      <App />
    // </Provider>
  )
}

export default Index