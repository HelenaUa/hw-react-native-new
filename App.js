// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';
// import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from 'react';
// import LoginScreen from './Screens/auth/LoginScreen';
// import RegistrationScreen from './Screens/auth/RegistrationScreen';
// import { PostsScreen } from './Screens/main/PostsScreen';
import { useFonts } from 'expo-font';
// import { useRoute } from './navigation/router';
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { db } from "./firebase/config";
// import { useDispatch, useSelector } from "react-redux";
// import { authStateChangeUser } from "./redux/auth/operations";
import { Main } from "./navigation/router";


SplashScreen.preventAutoHideAsync();


export default function App() {
  // const [user, setUser] = useState(null);
  // const dispatch = useDispatch();
  // const { stateChange: isAuth } = useSelector((state) => state.auth);
  // const routing = useRoute();

  // useEffect(() => {
  //   dispatch(authStateChangeUser());
  // }, []);


  // db.auth().authStateChangeUser

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
