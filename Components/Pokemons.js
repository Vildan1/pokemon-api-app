import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";

const Pokemons = ({ navigation }) => {
  const pokemonApi = "https://pokeapi.co/api/v2/pokemon/";
  const [data, setData] = useState([]);
  const [filtData, setFilterData] = useState();

  const Item = ({ item, backgroundColor }) => (
    <TouchableOpacity
      onPress={() => handleClickItem(item.url)}
      style={[styles.item, backgroundColor]}
    >
      <Image
        style={styles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
        }}
      />
      <Text style={[styles.text]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleClickItem = (uri) => {
    console.log("url", uri);
    fetch(uri)
      .then((res) => res?.json())
      .then((data) => {
        const detail = {
          image: data.sprites.other.home.front_default,
          name: data?.name,
          height: data?.height,
          weight: data?.weight,
          abilities: data?.abilities,
          types: data?.types,
        };

        navigation.navigate("Details", detail);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(pokemonApi);
      var test = await response.json();
      setData(test.results);
      setFilterData(test.results);
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    const filterData = data.filter((v) => {
      var searchText = text.toLowerCase();
      return v.name.includes(searchText);
    });
    setFilterData(filterData);
  };

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchStyle}
        placeholder="Search"
        onChangeText={handleSearch}
      ></TextInput>

      <FlatList
        numColumns={2}
        data={filtData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />

      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 32,
  },
  text: {
    borderBottomWidth: 2,
    padding: 10,
    textAlign: "center",
  },
  searchStyle: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default Pokemons;
