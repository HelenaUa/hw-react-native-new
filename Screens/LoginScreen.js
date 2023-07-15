import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';

const initialState = {
  email: '',
  password: '',
};


export default function LoginScreen() {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [seePass, setSeePass] = useState(true);
    const [activeInput, setActiveInput] = useState('');
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
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return null;
  };
    
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
    
    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={{ ...styles.container, flex: isShowKeyboard ? 0.5 : 0.65}}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
             
                  <View style={{...styles.form, width: dimentions, marginBottom: isShowKeyboard ? 16 : 27}}>
                     
                    <View style={styles.header}>
                      <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 30, fontWeight: 500, color: '#212121' }}>Увійти</Text>
                    </View>
              
                    <View>
                      <TextInput style={{ ...styles.input, borderColor: activeInput==='email'?'#FF6C00':'#f6f6f6'}}
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
                                activeOpacity={0.6}>
                      <Text style={styles.btnTitle}>Увійти</Text>
                    </TouchableOpacity>
                  <View>
                    <Text style={styles.askLogo}>Немає акаунту? Зареєструватися</Text>
                  </View>
            </View>
            
                </KeyboardAvoidingView>    
            </View> 
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
  container: {
    // flex: 0.7,
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
    marginTop: 32,
    marginBottom: 10,
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
    top: 16,
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
  },
});