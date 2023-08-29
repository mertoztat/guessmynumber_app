import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOver = ({ finishGame }) => {
  return (
    <View style={styles.container}>
      <PrimaryButton onPress={finishGame}>Reset</PrimaryButton>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
});
