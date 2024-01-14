import React from 'react';
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PantallaPrincipal from './screens/PantallaPrincipal';
import PantallaDetalle from './screens/PantallaDetalle';
import PantallaEdicion from './screens/PantallaEdicion';
import PantallaCreacion from './screens/PantallaCreacion';

const Stack = createStackNavigator();

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Inicio" component={PantallaPrincipal} />
    <Stack.Screen name="Detalle" component={PantallaDetalle} />
    <Stack.Screen name="Edicion" component={PantallaEdicion} />
    <Stack.Screen name="Crear" component={PantallaCreacion} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
