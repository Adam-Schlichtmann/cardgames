import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { moderateScale } from "react-native-size-matters";
import useTheme from "./src/hooks/useTheme";
import Nines from "./src/screens/Nines";
import RiverScoreBoard from "./src/screens/RiverScoreboard/RiverScoreBoard";

type ParamList = {};

const ScoreboardStack = createStackNavigator();

const ScoreboardStackNavigator = () => {
  return (
    <ScoreboardStack.Navigator>
      <ScoreboardStack.Screen component={RiverScoreBoard} name={"River"} />
    </ScoreboardStack.Navigator>
  );
};

const GameStack = createStackNavigator();

const GameStackNavigator = () => {
  return (
    <GameStack.Navigator>
      <GameStack.Screen component={Nines} name={"Nines"} />
    </GameStack.Navigator>
  );
};

const BottomTabs = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <BottomTabs.Navigator initialRouteName='ScoreBoards'>
        <BottomTabs.Screen
          component={GameStackNavigator}
          name='Game Stack'
          options={() => ({
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name='gamepad-circle'
                color={color}
                size={moderateScale(20, 0.2)}
              />
            ),
          })}
        />
        <BottomTabs.Screen
          component={ScoreboardStackNavigator}
          name='ScoreBoards'
          options={() => ({
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name='scoreboard'
                color={color}
                size={moderateScale(20, 0.2)}
              />
            ),
          })}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
};
export default () => <BottomTabNavigator />;
