// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';
// import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
// import LoginScreen from './Screens/auth/LoginScreen';
// import RegistrationScreen from './Screens/auth/RegistrationScreen';
// import { PostsScreen } from './Screens/main/PostsScreen';
import { useFonts } from 'expo-font';
import { useRoute } from './navigation/router';
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();


export default function App() {
  const routing = useRoute({});

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
     <NavigationContainer>
        {routing}
     </NavigationContainer>
  );
};




// export default function App() {
//    return (
//      <View style={styles.container}>
       
//          <RegistrationScreen></RegistrationScreen>
//          {/* <LoginScreen></LoginScreen> */}
//          {/* <PostsScreen></PostsScreen> */}
      
//       <StatusBar style="auto" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });




//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
