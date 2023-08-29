import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { AntDesign } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const Game = ({ selectedNumber, setGameOver }) => {
  const [minBoundary, setMinBoundary] = useState(1);
  const [maxBoundary, setMaxBoundary] = useState(100);

  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    selectedNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === selectedNumber) {
      setGameOver(true);
    }
  }, [currentGuess, selectedNumber]);

  const guessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < selectedNumber) ||
      (direction === "greater" && currentGuess > selectedNumber)
    ) {
      Alert.alert("Don't lie!", "You know that is wrong number...", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === "lower") {
      setMaxBoundary(currentGuess);
    } else {
      setMinBoundary((currentGuess) => currentGuess + 1);
    }
    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);

    if (currentGuess === selectedNumber) {
      Alert.alert("CONGRATS!", "You win!", [
        {
          text: "Nice!",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text style={styles.text}>Higher or Lower?</Text>
        <View style={styles.ButtonFlex}>
          <View style={styles.buttonRow}>
            <PrimaryButton onPress={() => guessHandler("lower")}>
              <AntDesign name="minus" size={20} color="#ddb52f" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonRow}>
            <PrimaryButton onPress={() => guessHandler("greater")}>
              <AntDesign name="plus" size={20} color="#ddb52f" />
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
    marginTop: 10,
  },
  ButtonFlex: {
    flexDirection: "row",
  },
  buttonRow: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});
