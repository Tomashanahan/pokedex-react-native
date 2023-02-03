import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home.screen';
import Pokemon from '../screens/Pokemon.screen';
import {SimplePokemon} from '../interfaces/Pokemon.interface';

export type StackParams = {
  Home: undefined;
  Pokemon: {simplePokemon: SimplePokemon; color: string};
};

const Stack = createStackNavigator<StackParams>();

export function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFFF'},
      }}>
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Pokemon} name="Pokemon" />
    </Stack.Navigator>
  );
}
