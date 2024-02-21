import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/main/AuthNavigation";
import History from "./src/screens/helper/History/History";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <History />
    </QueryClientProvider>
    // <NavigationContainer>
    //   <AuthNavigation />
    // </NavigationContainer>
  );
}
