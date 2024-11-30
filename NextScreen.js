import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const NextScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const [fontsLoaded] = useFonts({
    'Pokemon Classic': require('./assets/fonts/Pokemon Classic.ttf'),
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=1015'
      );
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const details = await detailsResponse.json();
          return {
            id: details.id,
            name: pokemon.name,
            image: details.sprites.front_default,
            types: details.types.map((typeInfo) => typeInfo.type.name),
          };
        })
      );
      setPokemons(detailedPokemons);
      setFilteredPokemons(detailedPokemons);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [search, pokemons]);

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
            <Text style={styles.description}>Listagem e Filtro:</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquise o Pokémon"
                placeholderTextColor="#8A8D91"
                value={search}
                onChangeText={setSearch}
              />
              <FontAwesome
                name="search"
                size={20}
                color="#395FAA"
                style={styles.searchIcon}
              />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.pokemonList}>
                {filteredPokemons.map((pokemon) => (
                  <View key={pokemon.id} style={styles.pokemonContainer}>
                    <Image
                      source={{ uri: pokemon.image }}
                      style={styles.pokemonImage}
                    />
                    <View style={styles.pokemonInfo}>
                      <Text style={styles.pokemonName}>{pokemon.name}</Text>
                      <View style={styles.typeContainer}>
                        {pokemon.types.map((type, index) => (
                          <Text
                            key={index}
                            style={[styles.typeText, styles[type]]}>
                            {type}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
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
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquise um Pokémon"
                placeholderTextColor="#8A8D91"
                value={search}
                onChangeText={setSearch}
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
            <Text style={styles.description}>Quem é esse Pokémon!</Text>
            <View style={styles.pokemonImageContainer}>
              <Image style={styles.pokemonImage} resizeMode="contain" />
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
    paddingBottom: 120,
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
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    width: '100%',
    fontSize: 14,
    color: '#333',
    paddingLeft: 40,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
   scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  pokemonList: {
    width: '100%',
    alignItems: 'center',
  },
  pokemonContainer: {
    flexDirection: 'row', // Organiza a imagem e as informações na horizontal
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '90%', // Ajuste para ocupar boa parte da largura
    alignItems: 'center',
  },
  pokemonImage: {
    width: 80,
    height: 80,
    marginRight: 15, // Espaço entre a imagem e as informações
  },
  pokemonInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: 'row',
  },
  typeText: {
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    color: '#FFF',
    textTransform: 'capitalize',
  },

  // Cores para os tipos de Pokémon
  grass: { backgroundColor: '#63BC5A' },
  fire: { backgroundColor: '#FF9D55' },
  water: { backgroundColor: '#5090D6' },
  electric: { backgroundColor: '#F6AD3A' },
  bug: { backgroundColor: '#91C12F' },
  normal: { backgroundColor: '#919AA2' },
  poison: { backgroundColor: '#B567CE' },
  ground: { backgroundColor: '#D97845' },
  rock: { backgroundColor: '#C5B78C' },
  fighting: { backgroundColor: '#CE416B' },
  psychic: { backgroundColor: '#FA7179' },
  ghost: { backgroundColor: '#5269AD' },
  ice: { backgroundColor: '#73CEC0' },
  dragon: { backgroundColor: '#0B6DC3' },
  fairy: { backgroundColor: '#EC8FE6' },
  dark: { backgroundColor: '#5A5465' },
  steel: { backgroundColor: '#5A8EA2' },

 roundedContainer: {
    width: '80%',
    maxHeight: 300,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    justifyContent: 'center',
    flexShrink: 1,
  },
  containerTextTopRight: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  textBoxBottom: {
    marginTop: 10,
    backgroundColor: '#395FAA',
    padding: 10,
    borderRadius: 10,
  },
  textBoxText: {
    fontSize: 14,
    color: '#FFF',
  },
  pokemonImageContainer: {
    width: 200,
    height: 200,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerButtonsContainer: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  answerButton: {
    backgroundColor: '#F3E600',
    padding: 15,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#395FAA',
  },
  nextButton: {
    backgroundColor: '#F6AD3A',
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default NextScreen;
