import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Props } from "./Card.types";
import { getCardColor, getCardSuitIcon, getCardText } from "./controller";
import { Icon, Text } from "react-native-paper";

const CARD_BIG_ICON = 48;
const CARD_SMALL_FONT = 16;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black",
    aspectRatio: 25 / 35,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    margin: 4,
  },
  cardText: {
    fontSize: CARD_SMALL_FONT,
  },
  cardNumberRow: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  cardNumberIconContainer: {
    alignItems: "center",
  },
  cardMiddle: {
    flex: 3,
    justifyContent: "center",
  },
});

const Card = ({ back, card, onPress }: Props) => {
  const cardText = getCardText(card.card);
  const cardSuitIcon = getCardSuitIcon(card.suit);
  const cardSuitColor = getCardColor(card.suit);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(card)}
      disabled={!onPress}
    >
      {back ? null : (
        <>
          <View style={styles.cardNumberRow}>
            <View style={styles.cardNumberRow}>
              <View style={styles.cardNumberIconContainer}>
                <Text style={styles.cardText}>{cardText}</Text>
                <Icon
                  size={CARD_SMALL_FONT}
                  source={cardSuitIcon}
                  color={cardSuitColor}
                />
              </View>
            </View>
          </View>
          <View style={styles.cardMiddle}>
            <Icon
              size={CARD_BIG_ICON}
              source={cardSuitIcon}
              color={cardSuitColor}
            />
          </View>
          <View style={styles.cardNumberRow}>
            <View
              style={[
                styles.cardNumberRow,
                { flexDirection: "row-reverse", alignItems: "flex-end" },
              ]}
            >
              <View style={styles.cardNumberIconContainer}>
                <Icon
                  size={CARD_SMALL_FONT}
                  source={cardSuitIcon}
                  color={cardSuitColor}
                />
                <Text style={styles.cardText}>{cardText}</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Card;
