import React from 'react';
import {
    View,
    Text,
    StyleSheet, 
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { authSignOutUser } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import CloseAvatar from '../../assets/images/close.png';


export const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    console.log(user);
    const [posts, setPosts] = useState([]);

    const userPosts = async () => {
        const qu = await query(
            collection(db, "posts"),
            where("userId", "==", user.userId)
        );
        onSnapshot(qu, (snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        })
    };

    useEffect(() => {
        userPosts();
    }, []);
    
    return (
        <View style={styles.wrapper}>
            <ImageBackground style={styles.image} source={require('../../assets/images/PhotoBG.png')}>
        <View style={styles.container}>
            
                <View style={styles.avatarBox}>
                    <TouchableOpacity>
                        <Image
                           style={{ width: "100%", height: "100%", borderRadius: 16 }}
                           source={{ uri: user.avatar }}
                        />
                        <Image source={CloseAvatar} style={styles.addAvatar} />
                        {/* <View style={styles.avatarBackground}></View> */}
                    </TouchableOpacity>
                </View> 
                <TouchableOpacity onPress={() => navigation.navigate('Home') }>
                  <View style={{ top: -75, right: -320 }}>
                    <SimpleLineIcons
                      name='logout'
                      size={24}
                      color='#BDBDBD'
                      // style={{ marginRight: 200 }}
                    />
                  </View>
                </TouchableOpacity>
                    
                <Text style={styles.userName}>{user.name}</Text>
                
                <ScrollView
                    style={{ display: "flex", flexDirection: "column", height: "100%", marginTop: 20 }}
                    contentContainerStyle={{ paddingBottom: 150 }}
                >
                {posts.map((post) => {
                    return (
                        <View key={post.id} style={{ width: "100%", height: 277, marginBottom: 68 }}>
                           <Image source={{ uri: post.image }} style={{ height: 240, borderRadius: 8 }} />
                              <Text style={styles.postTitle}>{post.title}</Text>
                                <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap"}}>
                                    <View style={styles.postCommentsBox}>
                                        <Feather
                                           name="message-circle"
                                           style={{transform: [{ rotateZ: "270deg" }]}}
                                           color={"#FF6C00"}
                                           size={24}
                                        />
                                        <Text style={styles.postCommentsText}>{post.comments}</Text>
                                    </View>
                                    <View style={styles.postLikesBox}>
                                        <Feather name="thumbs-up" color={"#FF6C00"} size={24} />
                                        <Text style={styles.postLikesText}>{post.likes}</Text>
                                    </View>
                                    <View style={styles.postLocationBox}>
                                        <Feather name="map-pin" color={"#BDBDBD"} size={24} />
                                        <Text style={styles.postLocationText}>{post.allLocations.location}</Text>
                                    </View>
                                </View>
                        </View>
                    );
                })}
                </ScrollView>
      
            
                </View>
                </ImageBackground>
            </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
      resizeMode: 'cover',
    },
    container: {
      position: "absolute",
      top: 147,
      display: "flex",
      paddingHorizontal: 16,
      paddingTop: 92,
      width: "100%",
      height: "100%",
      backgroundColor: "#FFFFFF",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    avatarBox: {
      position: "absolute",
      top: "0%",
      left: "50%",
      width: 120,
      height: 120,
      backgroundColor: "#000000",
      borderRadius: 16,
      transform: [{ translateX: -45 }, { translateY: -60 }],
      marginBottom: 60,
    },
    addAvatar: {
      position: 'absolute',
      width: 30,
      height: 30,
      top: 75,
      right: -15,
    },
    avatarBackground: {
      // zIndex: 100,
      // position: "absolute",
      // right: "-50%",
      // bottom: 11.5,
      // backgroundColor: "white",
      // width: 25,
      // height: 25,
      // borderRadius: 25 / 2,
      // transform: [{ translateX: -47 }],
    },
    userName: {
      position: 'absolute',
      marginBottom: 33,
      color: "#212121",
      textAlign: "center",
      fontFamily: "Roboto-Regular",
      fontSize: 30,
      fontWeight: "500",
      letterSpacing: 0.3,
      top: 75,
      right: 165,
    },
    postTitle: {
      color: "#212121",
      fontSize: 16,
      marginTop: 8,
      marginBottom: 8,
      fontFamily: "Roboto-Regular",
      fontWeight: "500",
    },
    postCommentsBox: {
      display: "flex",
      flexDirection: "row",
      marginRight: 24,
      justifyContent: "center",
      alignItems: "flex-end",
    },
    postCommentsText: {
      color: "#212121",
      fontSize: 18,
      fontFamily: "Roboto-Regular",
      marginLeft: 6,
    },
    postLikesBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    postLikesText: {
      color: "#212121",
      fontFamily: "Roboto-Regular",
      fontSize: 18,
      marginLeft: 6,
    },
    postLocationBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
      marginLeft: "auto",
    },
    postLocationText: {
      color: "#212121",
      fontSize: 18,
      textDecorationLine: "underline",
      fontFamily: "Roboto-Regular",
      marginLeft: 4,
    }
});
