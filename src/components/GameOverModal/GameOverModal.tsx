import { Text, Modal, Pressable, SafeAreaView } from "react-native";

type Props = { visible: boolean; remainingCards: number; onClose: () => void };

const GameOverModal = ({ visible, remainingCards, onClose }: Props) => {
  return (
    <Modal
      animated
      animationType='slide'
      visible={visible}
      style={{ paddingVertical: 32 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
        <Text>{remainingCards ? "Game Over" : "Congrats"}</Text>
        <Pressable onPress={onClose}>
          <Text>CLOSE</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default GameOverModal;
