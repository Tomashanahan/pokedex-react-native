import React, {createContext, useEffect, useReducer} from 'react';
import {Appearance} from 'react-native';
import {AppState} from 'react-native';

import {useColorScheme} from 'react-native';

import {themeReducer, ThemeState, lightThemeState, darkThemeState} from './Theme-reducer.context';

interface ThemeContextProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ThemeProvider = ({children}: ProviderProps) => {
  const colorScheme = useColorScheme();

  const [theme, dispatch] = useReducer(
    themeReducer,
    Appearance.getColorScheme() === 'dark' ? darkThemeState : lightThemeState,
  );

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'active') {
        Appearance.getColorScheme() === 'dark' ? setDarkTheme() : setLightTheme();
      }
    });
  }, [colorScheme]);

  const setDarkTheme = () => {
    dispatch({type: 'set_dark_theme'});
  };
  const setLightTheme = () => {
    dispatch({type: 'set_light_theme'});
  };

  return <ThemeContext.Provider value={{theme, setDarkTheme, setLightTheme}}>{children}</ThemeContext.Provider>;
};
