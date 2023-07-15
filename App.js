import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import { PostsScreen } from './Screens/PostsScreen';


export default function App() {
   return (
     <View style={styles.container}>
       <ImageBackground style={styles.image} source={require('./assets/images/PhotoBG.png')}>
         <RegistrationScreen></RegistrationScreen>
         {/* <LoginScreen></LoginScreen> */}
         {/* <PostsScreen></PostsScreen> */}
       </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});


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
