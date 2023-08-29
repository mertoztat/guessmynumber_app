import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGame from "./screens/StartGame";
import Game from "./screens/Game";
import Colors from "./constants/Colors";
import GameOver from "./screens/GameOver";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [clickedNumberGuess, setClickedNumberGuess] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  const pickedNumber = (num) => {
    setSelectedNumber(num);
  };

  const finishGame = () => {
    setSelectedNumber();
    setClickedNumberGuess(0);
    setGameOver(false);
  };

  // first initial screen start
  let screen = <StartGame pickedNumber={pickedNumber} />;

  if (selectedNumber) {
    screen = (
      <Game
        selectedNumber={selectedNumber}
        setGameOver={setGameOver}
        setClickedNumberGuess={setClickedNumberGuess}
      />
    );
  }

  if (gameOver && selectedNumber) {
    screen = (
      <GameOver
        finishGame={finishGame}
        selectedNumber={selectedNumber}
        clickedNumberGuess={clickedNumberGuess}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.background}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  background: {
    opacity: 0.15,
  },
});
