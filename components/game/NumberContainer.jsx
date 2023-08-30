import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { deviceWidth } from "../../constants/Dimensions";

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputContainer}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
  },
  inputContainer: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 12 : 36,
    fontWeight: "bold",
  },
});
