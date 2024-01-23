import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { InitialNavigator } from './src/routes'

const App = () => {
  return (
   <NavigationContainer>
      <InitialNavigator.Navigator />
   </NavigationContainer>
  )
}

export default App;