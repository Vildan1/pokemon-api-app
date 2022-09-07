import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StatusBar, StyleSheet, Image, Text, View } from "react-native";
const Stack = createNativeStackNavigator();
const Details = (props) => {
  console.log(JSON.stringify(props.navigation.state.params, null, 2));
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={styles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${props.navigation.state.params.name}.png`,
        }}
      ></Image>

      <Text style={styles.text}>
        Name: {props.navigation.state.params.name}
      </Text>
      <Text style={styles.text}>
        Height: {props.navigation.state.params.height}
      </Text>
      <Text style={styles.text}>
        Weight: {props.navigation.state.params.weight}
      </Text>
      <Text style={styles.text}>
        Ability: {props.navigation.state.params.abilities[0].ability.name}
      </Text>
      <Text style={styles.text}>
        Type: {props.navigation.state.params.types[0].type.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: -40,
  },

  text: {
    borderBottomWidth: 2,
    padding: 10,
    textAlign: "center",
    fontSize: 30,
  },
});

export default Details;
