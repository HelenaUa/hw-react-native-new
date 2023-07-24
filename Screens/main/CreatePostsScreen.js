import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { useFonts } from 'expo-font';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';


export const CreatePostsScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(true);

    // const [hasPermission, setHasPermission] = useState(null);
    // const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setPhoto(status === "granted");
    })();
    }, []);
    
    const takePhoto = async () => {
        if (isCameraReady && camera) {
          const photo = await camera.takePictureAsync();
          await MediaLibrary.createAssetAsync(photo.uri);
          setPhoto(photo.uri);
          console.log(photo);
          setIsCameraReady(false);  
        }
    };

    // const [fontsLoaded] = useFonts({
    // 'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    // });
  
    // if (!fontsLoaded) {
    //   return null;
    // };

    // const handleCameraReady = () => {
    // setIsCameraReady(true);
    // };

    const sendPhoto = () => {
        setPhoto(null);
        setIsCameraReady(true);
        navigation.navigate('DefaultScreen', { photo });
    };

    if (photo === null) {
    return <View />;
    }
    if (photo === false) {
    return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={setCamera} >
                {photo && !isCameraReady && (
                  <View style={styles.photoContainer}>
                    <Image source={{ uri: photo }} style={{height: 240, aspectRatio: 4 / 3}} />
                  </View>
                )}

                <TouchableOpacity style={styles.buttonCamera} onPress={takePhoto}>
                    <FontAwesome style={styles.a} name='camera' size={24} color='#BDBDBD'/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                       setType(
                       type === Camera.Constants.Type.back
                       ? Camera.Constants.Type.front
                       : Camera.Constants.Type.back
                       );
                    }}
                >
                    <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                    {" "}
                    Flip{" "}
                    </Text>
                </TouchableOpacity>
            </Camera>

            {/* <TouchableOpacity
                style={{ maxWidth: 100 }}
                onPress={async () => {
                  if (photo) {
                    setPhoto(null);
                    setIsCameraReady(true);
                    return;
                   }
                   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (status !== "granted") {
                    console.log("Permission denied");
                    return;
                  }

                    const result = await ImagePicker.launchImageLibraryAsync();
                  if (!result.canceled && result.assets.length > 0) {
                    const selectedAsset = result.assets[0];
                    setIsCameraReady(false);
                    setPhoto(selectedAsset.uri);
                  }
            }}
            ></TouchableOpacity> */}
            
            <View>
                <TouchableOpacity style={styles.btn} onPress={sendPhoto}>
                    <Text style={styles.btnTitle}>Опубліковати</Text>
                </TouchableOpacity>
            </View>
        </View> 
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: 240,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8E8E8',
        borderRadius: 8,
        marginHorizontal: 16,
    },
    photoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 8,
        //  width: "100%",
        // marginHorizontal: 16,
        // marginLeft: 8,
        justifyContent: 'center',
    },
    buttonCamera: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        height: 51,
        borderRadius: 100,
        borderWidth: 1,
        marginTop: 32,
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
        // fontFamily: 'Roboto-Regular',
    },
    flipContainer: {
        position: "absolute",
        bottom: 10,
        right: 10
    },
//     a: {
//         color: '#BDBDBD',
//         zIndex: 11,
// }
});

