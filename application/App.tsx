import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './app/navigation';


import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

AntDesign.loadFont().then();
Ionicons.loadFont().then();
Feather.loadFont().then();
LogBox.ignoreAllLogs();


function App() {

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;

