import {Theme} from '@react-navigation/native';

type ThemeActionType = {type: 'set_dark_theme'} | {type: 'set_light_theme'};

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  dividerColor: string;
}

export const lightThemeState: ThemeState = {
  dark: false,
  currentTheme: 'light',
  colors: {
    primary: '#80CAC5',
    background: '#FFFF',
    card: '#FFFF',
    text: '#000',
    border: 'purple',
    notification: 'tomato',
  },
  dividerColor: 'rgba(0,0,0,0.5)',
};

export const darkThemeState: ThemeState = {
  dark: true,
  currentTheme: 'dark',
  colors: {
    primary: 'red',
    background: '#171717',
    card: '#FFFF',
    text: '#FFF',
    border: 'purple',
    notification: 'tomato',
  },
  dividerColor: 'red',
};

export const themeReducer = (state: ThemeState, action: ThemeActionType): ThemeState => {
  switch (action.type) {
    case 'set_light_theme':
      return {...lightThemeState};
    case 'set_dark_theme':
      return {...darkThemeState};
    default:
      return state;
  }
};
