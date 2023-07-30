import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUser } from '../../redux/auth/selectors';


export const PostsScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  // console.log('route.params', route.params);
  
  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [...prevState, route.params]);
  //   } 
  // }, [route.params]);
  // console.log('posts', posts);
  
  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [setPosts]);
    
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.avatar}>
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 16 }}
            source={{ uri: user.avatar }}
          />
        </View>
        <View style={{display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      {/* <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={{marginTop: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{uri: item.photo}} style={{width: 343, height: 240}} />
            </View>
          )}
        />
      </View> */}

       {posts.length !== 0 && (
        <ScrollView
          style={styles.posts}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {posts.map((post) => {
            return (
              <View key={post.id} style={{ width: "100%", height: 277, marginBottom: 68 }}>
                <Image source={{ uri: post.image }} style={{ height: 240, borderRadius: 8 }} />
                <Text style={styles.postTitle}>{post.title}</Text>
                <View style={styles.postInfo}>
                  <TouchableOpacity onPress={() => navigation.navigate("Коментарі", post.id)}>
                    <View style={styles.postCommentsBox}>
                      <Feather
                        name="message-circle"
                        style={{transform: [{ rotateZ: "270deg" }]}}
                        color={"#BDBDBD"}
                        size={24}
                      />
                      <Text style={styles.postCommentsText}>{post.comments}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MapScreen", post.allLocations.mapLocation)}
                    style={{ marginLeft: "auto" }}
                  >
                    <View style={styles.postLocationBox}>
                      <Feather name="map-pin" color={"#BDBDBD"} size={24} />
                      <Text style={styles.postLocationText}>{post.allLocations.location}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
      
      {/* <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}} onPress={() => {navigation.navigate("MapScreen")}}>
        <Feather name='map-pin' size={24} color={'#BDBDBD'}/>
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => {navigation.navigate("Коментарі")}} >
        <Feather name='message-circle' size={24} color={'#BDBDBD'} />
        <Text>Comment</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 16,
  },
  user: {
    display: "flex",
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 32,
  },
  avatar: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  username: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "700",
  },
  email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  posts: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  postTitle: {
    marginTop: 8,
    marginBottom: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
  },
  postInfo: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  postCommentsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 24,
  },
  postLocationBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  postCommentsText: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
  },
  postLocationText: {
    marginLeft: 4,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});