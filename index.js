import 'intl-pluralrules';
// intl-pluralrules is polyfill for previous JSON format which used in i18next
import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';
import i18n from './languages/i18n';

AppRegistry.registerComponent(appName, () => App);
