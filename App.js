
import React, { useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import SQLite from 'react-native-sqlite-storage';
import { intiDB } from './src/db/Database';

function App(){

  useEffect(() => {
    console.log('called ')
    intiDB();
  }, [])

  return (
    <MainNavigator/>
  );
}

const styles = StyleSheet.create({
});

export default App;
