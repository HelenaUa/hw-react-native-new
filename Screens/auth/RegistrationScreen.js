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
    ImageBackground
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { useNavigation } from '@react-navigation/native';
import Avatar from '../../assets/images/photo.png';
import AddAvatar from '../../assets/images/add.png';
import CloseAvatar from '../../assets/images/close.png';

import { authSingUpUser } from '../../redux/auth/operations';

import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from '../../firebase/config';

const initialState = {
  name: '',
  email: '',
  password: '',
};


export default function RegistrationScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [activeInput, setActiveInput] = useState('');
  const [seePass, setSeePass] = useState(true);
  const [dimentions, setDimentions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (window) => {
      setDimentions(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const closeKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  
  const keyboardHide = async () => {
    if (!initialState) {
      return;
    }
    const avatarUrl = await uploadAvatarToServer();
    dispatch(authSingUpUser({ name, email, password, avatar: avatarUrl }));
    setActiveInput('');
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    console.log(state);
    setState(initialState);
  };

  const uploadAvatarToServer = async () => {
    if (!avatar) {
      return null;
    }
    const responce = await fetch(avatar);
    const file = await responce.blob();

    const uniqueId = uuid.v4();
    const storageRef = ref(storage, `avatars/${uniqueId}`);
    await uploadBytesResumable(storageRef, file);

    const getImageUrl = await getDownloadURL(storageRef);
    return getImageUrl;
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <ImageBackground style={styles.image} source={require('../../assets/images/PhotoBG.png')}>
  
        <View style={{ ...styles.container, flex: isShowKeyboard ? 0.6 : 0.8}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
             
                <View style={{...styles.form, width: dimentions, marginBottom: isShowKeyboard ? 16 : 27 }}>
                     
                  <View style={styles.avatarBox}>
                    <TouchableOpacity
                      onPress={async () => {
                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (status !== "granted") {
                        console.log("Permission denied");
                        return;
                        }
                        const result = await ImagePicker.launchImageLibraryAsync();
                        if (!result.canceled && result.assets.length > 0) {
                        const selectedAsset = result.assets[0];
                        setAvatar(selectedAsset.uri);
                        }
                      }}
                    >
                      <Image
                        source={{ uri: avatar }}
                        style={{ width: "100%", height: "100%", borderRadius: 16 }}
                      />
                      <Feather name="plus-circle" style={styles.avatarAdd} size={25} />
                   </TouchableOpacity>
                  </View>
              
                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 30, color: '#212121', marginTop: 100, marginLeft: 90 }}>Реєстрація</Text>
                <View style={{marginTop: 33, gap: 16}}>
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
              </View>
                
                  <View style={{ marginBottom: isShowKeyboard ? 16 : 27 }}>
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
  
  avatarBox: {
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: [{ translateX: -63 }, { translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarAdd: {
    position: "absolute",
    right: "-50%",
    bottom: 10,
    transform: [{ translateX: -46 }],
    color: "#FF6C00",
    backgroundColor: "#FFF",
    borderRadius: 100,
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
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
});