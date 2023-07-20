// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
// import LoginScreen from './Screens/auth/LoginScreen';
// import RegistrationScreen from './Screens/auth/RegistrationScreen';
// import { PostsScreen } from './Screens/main/PostsScreen';
import { useRoute } from './navigation/router';


export default function App() {
  const routing = useRoute({})

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
