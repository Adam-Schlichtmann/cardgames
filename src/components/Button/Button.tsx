import { ReactElement } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
  children: ReactElement;
  color: string;
};

export default ({ onPress, children, color }: Props) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    padding: 8,
  },
});
