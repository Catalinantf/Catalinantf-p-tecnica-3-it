import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HomeScreen} from './sreens/Home';
import {DetailScreen} from './sreens/DetailScreen';
import {RootStackParamList} from './types/navigation';
import {ChartDetailScreen} from './sreens/ChartDetailScreen';

// Importa tus pantallas

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
          headerTintColor: isDarkMode ? Colors.white : Colors.black,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Inicio'}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{title: 'Detalle'}}
        />
        <Stack.Screen name="ChartDetail" component={ChartDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
