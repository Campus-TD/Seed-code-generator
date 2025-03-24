import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CodeScreen from './screens/CodeScreen';
import HomeScreen from './screens/HomeScreen';
import PrincipalScreen from './screens/PrincipalScreen';
import ValidationScreen from './screens/ValidationScreen';

// Create the stack navigator - make sure this isn't failing
const Stack = createStackNavigator();

export default function App() {
  // Check if Stack is properly created
  if (!Stack || !Stack.Navigator) {
    console.error('Stack navigator not created properly');
    return <CodeScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen 
          name="Acces" 
          component={CodeScreen} 
          options={{ title: 'Código de Acceso' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Principal"
          component={PrincipalScreen}
          options={{ title: 'Ventana Principal' }}
        />
        <Stack.Screen
          name="Validation"
          component={ValidationScreen}
          options={{ title: 'Ventana de Validacion' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


