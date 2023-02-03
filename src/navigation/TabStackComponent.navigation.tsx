/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {StackParams} from './StackNavigator.navigation';
import Search from '../screens/Search.screen';
import Pokemon from '../screens/Pokemon.screen';

const TabStack = createStackNavigator<StackParams>();

export function TabStackComponent() {
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFFF'},
      }}>
      <TabStack.Screen component={Search} name="Home" />
      <TabStack.Screen component={Pokemon} name="Pokemon" />
    </TabStack.Navigator>
  );
}
