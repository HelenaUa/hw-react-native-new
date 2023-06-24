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
} from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import Avatar from '../assets/images/photo.png';
import AddAvatar from '../assets/images/add.png';
import CloseAvatar from '../assets/images/close.png';


const initialState = {
  name: '',
  email: '',
  password: '',
};



export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [activeInput,setActiveInput]=useState('');
  const [dimentions, setDimentions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width;
  //     // console.log("width", width);
  //     setDimentions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  // }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (window) => {
      setDimentions(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return null;
  };

  // const width = Dimensions.get('window').width;

  const closeKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  // useEffect(() => {
  //   setIsShowKeyboard(false)
  // }, [keyboardHide]);

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={{ ...styles.container, height: isShowKeyboard ? 375 : 549 }}>

                {/* <View>
                    <TouchableOpacity>

                    </TouchableOpacity>
                </View>

                <Text>Ргістрація</Text> */}

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                  <View style={{ ...styles.form, width: dimentions, marginBottom: isShowKeyboard ? 32 : 43 }}>
                     
                    <View style={styles.header}>
                      <Image source={Avatar} style={styles.avatar} />
                      <Pressable style={styles.addImage}>
                        <Image source={Avatar ? CloseAvatar : AddAvatar} style={styles.addAvatar} />
                      </Pressable>
                      <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 30, color: '#212121' }}>Реєстрація</Text>
                    </View>
              
                    <View>
                      <TextInput style={{ ...styles.input, borderColor:activeInput==='login'?'#FF6C00':'#f6f6f6'}}
                                textAlign={"flex-start"}
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
                                textAlign={"flex-start"}
                                value={state.email}
                                placeholder='Адреса електронної пошти'
                                onChangeText={(value) => setState((prevState) => ({...prevState, email: value}))}
                                onFocus={() => setActiveInput('email')}
                                placeholderTextColor ='#BDBDBD'
                      />
                    </View>
                    <View>
                      <TextInput style={{ ...styles.input, borderColor:activeInput==='password'?'#FF6C00':'#f6f6f6'}}
                                textAlign={"flex-start"}
                                secureTextEntry={true}
                                value={state.password}
                                placeholder='Пароль'
                                onChangeText={(value) => setState((prevState) => ({...prevState, password: value}))}
                                onFocus={() => setActiveInput('password')}
                                placeholderTextColor='#BDBDBD'
                      />
                            {/* <Text>Показати</Text> */}
                    </View>
                  </View>
                </KeyboardAvoidingView>
          
          {!activeInput && (
            <View style={{ ...styles.down, marginBottom: isShowKeyboard ? 32 : 43 }}>
              <TouchableOpacity style={styles.btn}
                                onPress={keyboardHide}
                                activeOpacity={0.6}>
                    <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              {/* <Text>Уже есть аккаунт? Войти</Text> */}
              <View style={styles.askLogo}>
                  <Text style={textAlign="center"}>Вже є акаунт? Увійти</Text>
              </View>
            </View>
          )}
                
            </View>
        </TouchableWithoutFeedback>
    )
};


const styles = StyleSheet.create({
  container: {
    flex: 0.67,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  form: {
    marginHorizontal: 16,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 92,
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: 'absolute',
    top: -154,
    backgroundColor: '#f6f6f6',
  },
  addImage: {
  
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
    // justifyContent: 'flex-start',
  },
  down: {
    
  },
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
        backgroundColor: 'transparent',
        borderColor: '#FF6C00',
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
  },
  // header: {
  //   alignItems: "center",
  //   marginBottom: 120,
  // },
  // headerTitle: {
  //   fontSize: 40,
  //   color: "#f0f8ff",
  //   fontFamily: "DMMono-Regular",
  // },
});