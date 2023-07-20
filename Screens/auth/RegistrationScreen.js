import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Pressable,
    ImageBackground
} from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../../assets/images/photo.png';
import AddAvatar from '../../assets/images/add.png';
import CloseAvatar from '../../assets/images/close.png';

const initialState = {
  name: '',
  email: '',
  password: '',
};


export default function RegistrationScreen() {
  const navigation = useNavigation();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [activeInput, setActiveInput] = useState('');
  const [seePass, setSeePass] = useState(true);
  const [dimentions, setDimentions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (window) => {
      setDimentions(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return null;
  };

  // useEffect(() => {
  //   setIsShowKeyboard(false)
  // }, [keyboardHide]);

  const closeKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  
  const keyboardHide = () => {
    setActiveInput('');
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    console.log(state);
    setState({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <ImageBackground style={styles.image} source={require('../../assets/images/PhotoBG.png')}>
  
        <View style={{ ...styles.container, flex: isShowKeyboard ? 0.6 : 0.8}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
             
                <View style={{...styles.form, width: dimentions, marginBottom: isShowKeyboard ? 16 : 27 }}>
                     
                    <View style={styles.header}>
                      <Image source={Avatar} style={styles.avatar} />
                      <Pressable style={styles.addImage}>
                        <Image source={Avatar ? CloseAvatar : AddAvatar} style={styles.addAvatar} />
                      </Pressable>
                      <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 30, color: '#212121' }}>Реєстрація</Text>
                    </View>
              
                    <View>
                      <TextInput style={{ ...styles.input, borderColor:activeInput==='login'?'#FF6C00':'#f6f6f6'}}
                                value={state.name}
                                placeholder='Логін'
                                onChangeText={(value) => setState((prevState) => ({...prevState, name: value}))}
                                onFocus={() => setActiveInput('login')}
                                // onFocus={() => setIsShowKeyboard(true)}
                                placeholderTextColor='#BDBDBD'
                      />
                    </View>
                    <View>
                      <TextInput style={{ ...styles.input, borderColor:activeInput==='email'?'#FF6C00':'#f6f6f6'}}
                                value={state.email}
                                placeholder='Адреса електронної пошти'
                                onChangeText={(value) => setState((prevState) => ({...prevState, email: value}))}
                                onFocus={() => setActiveInput('email')}
                                placeholderTextColor ='#BDBDBD'
                      />
                    </View>
                    <View>
                      <TextInput style={{ ...styles.input, borderColor:activeInput==='password'?'#FF6C00':'#f6f6f6'}}
                                secureTextEntry={seePass}
                                value={state.password}
                                placeholder='Пароль'
                                onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
                                onFocus={() => setActiveInput('password')}
                                placeholderTextColor='#BDBDBD'
                      />
                      <Text style={{ ...styles.seePass, color: '#1B4371', right: 32}} onPress ={()=> setSeePass(false)} >Показати</Text>
                    </View>
                  </View>
                
                  <View style={{ ...styles.down, marginBottom: isShowKeyboard ? 16 : 27 }}>
                    <TouchableOpacity style={styles.btn}
                                onPress={keyboardHide}
                                activeOpacity={0.6} >
                      <Text style={styles.btnTitle}>Зареєструватися</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('LoginScreen')}}>
                      <Text style={styles.askLogo}>Вже є акаунт? Увійти</Text>
                    </TouchableOpacity>
                  </View>
              
            </KeyboardAvoidingView>    
        </View>
      </ImageBackground>   
    </TouchableWithoutFeedback>    
  )
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  container: {
    // flex: 0.4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    marginHorizontal: 16,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 92,
    marginBottom: 14,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: 'absolute',
    top: -154,
    backgroundColor: '#f6f6f6',
  },
  addAvatar: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: -78,
    right: -72,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#f6f6f6',
    height: 50,
    borderRadius: 8,
    color: '#000',
    padding: 16,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  seePass: {
    position: 'absolute',
    top:16,
    }, 
  // down: {
  //   marginBottom: 0,
  //   paddingBottom: 0,
  // },
  btn: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    marginTop: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        backgroundColor: '#FF6C00',
        borderColor: 'transparent',
      },
      android: {
        backgroundColor: '#FF6C00',
        borderColor: 'transparent',
      },
    }),
  },
  btnTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  askLogo: {
    paddingTop: 16,
    textAlign: 'center',
    color: '#1B4371',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 0,
    paddingBottom: 0,
  },
  // header: {
  //   alignItems: "center",
  //   marginBottom: 120,
  // },
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
});