import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/main/AuthNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}
