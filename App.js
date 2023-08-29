import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGame from "./screens/StartGame";
import Game from "./screens/Game";
import Colors from "./constants/Colors";
import GameOver from "./screens/GameOver";

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [gameOver, setGameOver] = useState(false);

  const pickedNumber = (num) => {
    setSelectedNumber(num);
  };

  const finishGame = () => {
    setSelectedNumber();
    setGameOver(false);
  };

  // first initial screen start
  let screen = <StartGame pickedNumber={pickedNumber} />;

  if (selectedNumber) {
    screen = <Game selectedNumber={selectedNumber} setGameOver={setGameOver} />;
  }

  if (gameOver && selectedNumber) {
    screen = <GameOver finishGame={finishGame} />;
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
