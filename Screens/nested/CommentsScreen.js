import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Image,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser} from '../../redux/auth/selectors';
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { format } from "date-fns";
import { db } from '../../firebase/config';
import uuid from "react-native-uuid";
import {
  collection,
  addDoc,
  doc,
  getCountFromServer,
  onSnapshot,
  updateDoc,
  getDoc,
} from "firebase/firestore";


export const CommentsScreen = () => {
  const { params: postId } = useRoute();
  const { name, userId, avatar } = useSelector(selectUser);
  const [post, setPost] = useState(null);
  
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const submit = async () => {
    if (!comment) {
      return;
    }
    const time = format(new Date(), "dd MMMM, yyyy | HH:mm");
    const postsCollection = collection(db, "posts");
    const newPostRef = doc(postsCollection, postId);
    const newCollection = collection(newPostRef, "comments");
    await addDoc(newCollection, { comment, name, userId, avatar, time });
    const snapshot = await getCountFromServer(newCollection);
    updatePostCommentsCount(snapshot.data().count.toString());
    Keyboard.dismiss();
    setComment("");
  };

  const onAllComments = async () => {
    const postsCollection = collection(db, "posts");
    const newPostRef = doc(postsCollection, postId);
    const newCollection = collection(newPostRef, "comments");
    onSnapshot(newCollection, (snapshot) => {
    setAllComments(snapshot.docs.map((doc) => doc.data()));
    });
  };

  const postDetails = async () => {
    try {
      const postRef = doc(collection(db, "posts"), postId);
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        setPost(postSnapshot.data());
      } else {
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const updatePostCommentsCount = async (commentsCount) => {
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, { comments: commentsCount });
      console.log("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const closeKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    onAllComments();
    postDetails();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
    <View style={{ ...styles.container,  paddingBottom: isShowKeyboard ? 350 : 16 }} onPress={closeKeyboard} >
      {post?.image && (<Image style={styles.postImage} source={{ uri: post.image }} />)}
     
      <FlatList
        contentContainerStyle={{display: "flex", alignItems: "center", flexGrow: 1}}
        data={allComments}
        renderItem={({ item }) => {
          return (
            <View
              key={uuid.v4()}
              style={{
                display: "flex",
                marginBottom: 24,
                flexDirection: userId === item.userId ? "row" : "row-reverse",
              }}
            >
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{item.comment}</Text>
                <Text style={{...styles.data, textAlign: userId === item.userId ? "left" : "right" }}>
                  {item.time}
                </Text>
              </View>
              <Image
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 28 / 2, 
                  backgroundColor: "#000000",
                  marginLeft: userId === item.userId ? 16 : 0,
                  marginRight: userId !== item.userId ? 16 : 0,
                }}
                source={{ uri: item.avatar }}
              />
            </View>
          );
        }}
        />
      
      <View style={{ position: "relative", marginBottom: 16 }}>
        <TextInput
          onChangeText={setComment}
          placeholder="Comment..."
          placeholderTextColor={"#BDBDBD"}
          style={styles.input}
          value={comment}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 19,
            right: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            backgroundColor: "#FF6C00",
            borderRadius: 34 / 2,
          }}
          onPress={submit}
        >
          <Feather
            name="check"
            size={25}
            color={"#FFFFFF"}
            // style={{ transform: [{ rotate: "360deg" }] }}
          />
        </TouchableOpacity>
      </View>

      </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    paddingHorizontal: 16,
  },
  postImage: {
    width: "100%",
    height: 240,
    marginTop: 32,
    marginBottom: 32,
    borderRadius: 8,
  },
  textWrapper: {
    display: "flex",
    width: 299,
    padding: 16,
  },
  text: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
    fontFamily: "Roboto-Regular",
  },
  data: {
    color: "#BDBDBD",
    textAlign: "left",
    marginTop: 8,
    lineHeight: 18,
    fontSize: 10,
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
  },
  input: {
    width: "100%",
    color: "#212121",
    textAlign: "right",
    marginTop: 8,
    borderRadius: 30,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    textAlign: "left",
    padding: 16,
  },
});