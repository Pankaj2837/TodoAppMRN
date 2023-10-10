import React from 'react'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { AuthContext } from '../contexts/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '../hooks/useAuth'
import { HomeScreen } from './HomeScreen'
import { LoginScreen } from './LoginScreen'
import { RegistrationScreen } from './RegistrationScreen'
import { ProfileScreen } from './ProfileScreen'
import { NavigateButton } from '../components/NavigateButton'
import { CreateTask } from './CreateTask'
import { CreateGroup } from './Groups/CreateGroup'
const Stack = createNativeStackNavigator()

export const MainNavigator = () => {
  const { state, authContext } = useAuth()
  const { userToken } = state

  const renderScreens = () => {
    if (userToken) {
      // only authenticated users can visit these screens
      const headerLeft = () => (<NavigateButton title='My profile' route='Profile' />)
      const headerRight = () => (<NavigateButton title='Add Task' route='CreateTask' />)
      return (
        <>
        <Stack.Screen name='CreateGroups' component={CreateGroup} options={{ title: 'Create Groups' }} />
          <Stack.Screen name='Home' component={HomeScreen} options={{ title: '     Welcome Home', headerLeft,headerRight }} />
          <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Your Profile' }} />
          <Stack.Screen name='CreateTask' component={CreateTask} options={{ title: 'Create Task' }} />
        </>
      )
    }

    // non authenticated users need to sign in or register
    // and can only switch between the two screens below:
    return (
      <>
        <Stack.Screen
          name='SignIn'
          component={LoginScreen}
          options={{ title: 'Sign in to awesome-app' }}
        />
        <Stack.Screen
          name='SignUp'
          component={RegistrationScreen}
          options={{ title: 'Register to awesome-app' }}
        />
      </>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}>
          {renderScreens()}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
