import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { InitialNavigator } from './src/routes'
import { Provider } from 'react-redux'
import reduxStore from './src/redux/store'

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={reduxStore}>
        <InitialNavigator.Navigator />
      </Provider>
    </NavigationContainer>
  )
}

export default App;