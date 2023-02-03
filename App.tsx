import 'react-native-gesture-handler';
import React from 'react';

// import {StackNavigator} from './src/navigation/StackNavigator.navigation';
import {ThemeProvider} from './src/context/Theme/Theme.context';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/navigation/Tabs';

interface AppThemeProps {
  children: JSX.Element | JSX.Element[];
}

const AppTheme = ({children}: AppThemeProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default function App() {
  return (
    <AppTheme>
      {/* <StackNavigator /> */}
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AppTheme>
  );
}
