import { registerRootComponent } from "expo";
import AppNavigation from "./AppNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native";

const App = () => (
  <SafeAreaProvider>
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  </SafeAreaProvider>
);

registerRootComponent(App);
