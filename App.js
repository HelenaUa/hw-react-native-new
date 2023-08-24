import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Main } from "./navigation/router";

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  };

  return (
    <Provider store={store} >
      <NavigationContainer>
        {/* {routing} */}
        <Main/>
      </NavigationContainer>
    </Provider>  
  );
};


