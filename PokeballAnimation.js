import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Dimensions,
} from 'react-native';

// Obtém a largura da tela
const { width } = Dimensions.get('window');

const PokeballAnimation = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animações
  const topAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const centerScale = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const handleStart = () => {
    setIsOpen(true);

    // Animações para abrir a Pokébola
    Animated.parallel([
      Animated.timing(topAnim, {
        toValue: -130, // metade da altura
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(bottomAnim, {
        toValue: 130, // metade da altura
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(centerScale, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 3.5, // Cresce fora da Pokébola
        duration: 1200, // Aumenta o tempo da escala
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1200, // Aumenta o tempo da opacidade
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.sequence([
        Animated.delay(2000), // Pausa por 2 segundos
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 0, // Faz a logo desaparecer
            duration: 500, // Duração do desaparecimento
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 0, // Reduz o tamanho da logo
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Após a logo sumir, navega para a próxima tela
        navigation.navigate('NextScreen'); // Substitua 'NextScreen' pelo nome da próxima tela
      });
    });
  };

  return (
    <View style={styles.container}>
      {/* Pokébola */}
      <View style={styles.pokeballContainer}>
        <Animated.View
          style={[styles.pokeballTop, { transform: [{ translateY: topAnim }] }]}
        />
        <Animated.View
          style={[
            styles.pokeballBottom,
            { transform: [{ translateY: bottomAnim }] },
          ]}
        />
        <Animated.View
          style={[styles.centerButton, { transform: [{ scale: centerScale }] }]}
        />
      </View>

      {/* Logo do Pokémon */}
      <Animated.Image
        source={require('./assets/logo.png')} // Caminho da sua logo
        style={[
          styles.pokemonLogo,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
        resizeMode="contain"
      />

      {/* Botão Iniciar */}
      {!isOpen && (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Iniciar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF3C2',
  },
  pokeballContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'relative',
    overflow: 'hidden',
  },
  pokeballTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#F23E2D',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomWidth: 5,
    borderBottomColor: '#000',
  },
  pokeballBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopWidth: 5,
    borderTopColor: '#000',
  },
  centerButton: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#000',
    zIndex: 5,
  },
  pokemonLogo: {
    position: 'absolute',
    top: '45%',
    left: '34%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: width * 0.3,
    height: width * 0.1,
    opacity: 0,
    zIndex: 10,
  },
  startButton: {
    position: 'absolute', // Botão fixo na parte inferior
    bottom: 20, // Ajusta a altura do botão na tela
    alignSelf: 'center', // Centraliza horizontalmente
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3C5AA6',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  startButtonText: {
    fontSize: 18,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default PokeballAnimation;
