import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { NINES, RIVER_SCORE_BOARD } from "./AppNavigation.constants";
import { Nines, RiverScoreBoard } from "./screens";
import { ParamList } from "./AppNavigation.types";

const Drawer = createDrawerNavigator<ParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={NINES}>
        <Drawer.Screen name={NINES} component={Nines} />
        <Drawer.Screen name={RIVER_SCORE_BOARD} component={RiverScoreBoard} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
