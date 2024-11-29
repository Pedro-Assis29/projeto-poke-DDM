import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppContent from './NextScreen'; // Importa o componente principal

const App = () => {
  return (
    <View style={styles.container}>
      <AppContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
