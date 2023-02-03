/* eslint-disable react/no-unstable-nested-components */
import React, {useContext} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {StackNavigator} from './StackNavigator.navigation';

import {ThemeContext} from '../context/Theme/Theme.context';
import {TabStackComponent} from './TabStackComponent.navigation';

const Tab = createBottomTabNavigator();

function Tabs() {
  const {
    theme: {
      dark,
      colors: {text},
    },
  } = useContext(ThemeContext);

  const tabBarPaddingBottom: number = Platform.OS === 'android' ? 8 : 23;
  const tabBarHeight: number = Platform.OS === 'android' ? 60 : 80;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: dark ? 'rgba(0,0,0,0.90)' : 'rgba(255,255,255,0.90)',
          paddingBottom: tabBarPaddingBottom,
          borderWidth: 0,
          elevation: 0,
          height: tabBarHeight,
          position: 'absolute',
        },
        tabBarActiveTintColor: 'red',
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: () => <TabBarIcon iconName="list-outline" size={25} color={text} />,
        }}
        name="HomeScreen"
        component={StackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'SearchScreen',
          tabBarIcon: () => <TabBarIcon iconName="search-outline" size={25} color={text} />,
        }}
        name="Search"
        // component={Search}
        component={TabStackComponent}
      />
    </Tab.Navigator>
  );
}

interface TabBarIconProps {
  iconName: string;
  size: number;
  color: string;
}

const TabBarIcon = ({iconName, size, color}: TabBarIconProps) => {
  return <Icon name={iconName} size={size} color={color} />;
};

export default Tabs;
