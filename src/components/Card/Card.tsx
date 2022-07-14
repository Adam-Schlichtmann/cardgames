import { MaterialCommunityIcons } from "@expo/vector-icons";
import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Card as CardType } from "../../types";
import getIconColorForSuit from "../../util/getIconColorForSuit";
import getIconNameForSuit from "../../util/getIconNameForSuit";
import getStringForNumber from "../../util/getStringForNumber";

const BASE_ICON = 12;

type Props = {
  card?: CardType;
  onPress: () => void;
};

const Card = ({ card, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!card}>
      {!!card && (
        <>
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", alignItems: "flex-start" },
            ]}
          >
            <View style={styles.symbolContainer}>
              <Text
                style={[
                  styles.text,
                  {
                    color: getIconColorForSuit(card.suit),
                    fontSize: moderateScale(BASE_ICON),
                  },
                ]}
              >
                {getStringForNumber(card.number)}
              </Text>
              <MaterialCommunityIcons
                color={getIconColorForSuit(card.suit)}
                name={getIconNameForSuit(card.suit)}
                size={moderateScale(BASE_ICON)}
              />
            </View>
            <View style={styles.symbolContainer}>
              <Text
                style={[
                  styles.text,
                  {
                    color: getIconColorForSuit(card.suit),
                    fontSize: moderateScale(BASE_ICON),
                  },
                ]}
              >
                {getStringForNumber(card.number)}
              </Text>
              <MaterialCommunityIcons
                color={getIconColorForSuit(card.suit)}
                name={getIconNameForSuit(card.suit)}
                size={moderateScale(BASE_ICON)}
              />
            </View>
          </View>
          <MaterialCommunityIcons
            color={getIconColorForSuit(card.suit)}
            name={getIconNameForSuit(card.suit)}
            size={moderateScale(32)}
          />
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", alignItems: "flex-end" },
            ]}
          >
            <View style={[styles.symbolContainer, styles.rotate]}>
              <Text
                style={[
                  styles.text,
                  {
                    color: getIconColorForSuit(card.suit),
                    fontSize: moderateScale(BASE_ICON),
                  },
                ]}
              >
                {getStringForNumber(card.number)}
              </Text>
              <MaterialCommunityIcons
                color={getIconColorForSuit(card.suit)}
                name={getIconNameForSuit(card.suit)}
                size={moderateScale(BASE_ICON)}
              />
            </View>
            <View style={[styles.symbolContainer, styles.rotate]}>
              <Text
                style={[
                  styles.text,
                  {
                    color: getIconColorForSuit(card.suit),
                    fontSize: moderateScale(BASE_ICON),
                  },
                ]}
              >
                {getStringForNumber(card.number)}
              </Text>
              <MaterialCommunityIcons
                color={getIconColorForSuit(card.suit)}
                name={getIconNameForSuit(card.suit)}
                size={moderateScale(BASE_ICON)}
              />
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 25 / 35,
    maxWidth: "30%",
    margin: 8,
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    padding: 16,
  },
  rotate: {
    transform: [{ rotate: "180deg" }],
  },
  symbolContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: moderateScale(24, 0.2),
  },
});

export default memo(Card);
