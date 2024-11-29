
import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const NextScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const [fontsLoaded] = useFonts({
    'Pokemon Classic': require('./assets/fonts/Pokemon Classic.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }


  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <View style={[styles.container, styles.homeContainer]}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.imageContainer}>
              <Image
                source={require('./assets/professor-carvalho.png')}
                style={styles.professorImage}
                resizeMode="contain"
              />
              <Image
                source={require('./assets/nidoran-f.PNG')}
                style={styles.nidoranImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.description}>
              Este app é uma homenagem ao universo Pokémon, onde você pode
              explorar a rica história dos jogos e interagir com personagens
              icônicos.
            </Text>
          </View>
        );
      case 'Funcionalidade':
        return (
          <View style={[styles.container, styles.funcionalidadeContainer]}>
            <Text style={styles.description}>
             Listagem e Filtro:
            </Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquise o Pokémon"
                placeholderTextColor="#8A8D91"
              />
              <FontAwesome
                name="search"
                size={20}
                color="#395FAA"
                style={styles.searchIcon}
              />
            </View>
           <ScrollView style={styles.scrollContainer}>
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleContainerText}>Conteúdo rolável 1</Text>
              </View>
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleContainerText}>Conteúdo rolável 2</Text>
              </View>
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleContainerText}>Conteúdo rolável 3</Text>
              </View>
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleContainerText}>Conteúdo rolável 4</Text>
              </View>
            </ScrollView>
          </View>
        );
      case 'Explore':
        return (
          <View style={styles.container}>
            <Text style={styles.description}>
              Explore a enciclopédia dos Pokémons
            </Text>

            {/* Input de pesquisa */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquise um Pokémon"
                placeholderTextColor="#8A8D91"
              />
              <FontAwesome
                name="search"
                size={20}
                color="#395FAA"
                style={styles.searchIcon}
              />
            </View>

            <View style={styles.roundedContainer}>
               <Text style={styles.containerTextTopRight}>
                Nome: Pikachu{'\n'}
                Tipo: Elétrico{'\n'}
                Habilidade: Static
              </Text>

               <View style={styles.textBoxBottom}>
                <Text style={styles.textBoxText}>
                  Pikachu é um Pokémon muito conhecido por ser o mascote oficial
                  da franquia!
                </Text>
              </View>

            </View>
          </View>
        );
      case 'Game':
        return (
          <View style={styles.container}>
            <Text style={styles.description}> Quem é esse Pokémon!</Text>
            <View style={styles.pokemonImageContainer}>
              <Image
            
                style={styles.pokemonImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.answerButtonsContainer}>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.answerButton}>
                  <Text style={styles.answerText}>Resposta 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton}>
                  <Text style={styles.answerText}>Resposta 2</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.answerButton}>
                  <Text style={styles.answerText}>Resposta 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerButton}>
                  <Text style={styles.answerText}>Resposta 4</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.nextButton}>
              <FontAwesome name="arrow-right" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentScreen('Home')}>
          <FontAwesome
            name="home"
            size={30}
            color={currentScreen === 'Home' ? '#F6AD3A' : '#395FAA'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentScreen('Funcionalidade')}>
          <FontAwesome
            name="list-ul"
            size={30}
            color={currentScreen === 'Funcionalidade' ? '#F6AD3A' : '#395FAA'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentScreen('Explore')}>
          <FontAwesome
            name="globe"
            size={30}
            color={currentScreen === 'Explore' ? '#F6AD3A' : '#395FAA'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentScreen('Game')}>
          <FontAwesome
            name="gamepad"
            size={30}
            color={currentScreen === 'Game' ? '#F6AD3A' : '#395FAA'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FDF3C2',
    paddingTop: 20,
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    marginTop: 20,
  },
  professorImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 180,
    height: 180,
  },
  nidoranImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
  },
  description: {
    marginTop: 30,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: 'Pokemon Classic',
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 2,
    borderTopColor: '#411B17',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  searchInput: {
    height: 40,
    width: '100%',
    fontSize: 10,
    color: '#333',
    fontFamily: 'Pokemon Classic',
    paddingLeft: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#395FAA',
    backgroundColor: '#FFF',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  exampleContainer: {
    height: 200,
    marginBottom: 15,
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exampleContainerText: {
    left: 125,
    textAlign: 'justify',
    fontFamily: 'Pokemon Classic',
    fontSize: 10,
  },
   roundedContainer: {
    marginTop: 40,
    width: '90%',
    height: 400,
    borderRadius: 30,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 15,
  },
    containerTextTopRight: {
    left: 130 ,
    fontSize: 10,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 24,
    fontFamily: 'Pokemon Classic',
    marginBottom: 10,
  },
  textBoxBottom: {
    marginTop: 50,
    borderRadius: 10,
    padding: 10,
  },
  textBoxText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'justify',
    fontFamily: 'Pokemon Classic',
  },
  pokemonImageContainer: {
    backgroundColor: '#fff',
    width: 250,
    height: 250,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  nextButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#F6AD3A',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  answerButton: {
    backgroundColor: '#F6AD3A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  answerText: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: 'Pokemon Classic',
  },
});

export default NextScreen;