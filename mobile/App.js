import React from 'react';
import Routes from './src/routes/routes'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function App() {
  return (
    <SafeAreaView style={styles.global}>
      <Routes />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  global: {
    flex: 1
  }
})


