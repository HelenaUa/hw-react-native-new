import { updateUser, updateUserAvatar, stateChange, logOut } from "./authSlice";
import { async } from "@firebase/util";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from '../../firebase/config';

// Регістрація
export const authSingUpUser = ({name, email, password, avatar}) => async (dispatch) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        await updateProfile(user, {
            displayName: name,
            email: user.email,
            photoURL: avatar,
        });
        dispatch(updateUser({
            userId: user.uid,
            name: user.displayName,
            email: user.email,
            avatar,
        }));
        return true;

    } catch (error) {
        console.log("error", error);
        console.log("error.messag", error.message);
        return false;
    }
};

// Логінізація
export const authSingInUser = ({email, password}) => async (dispatch) => {
    try {
          await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        await updateProfile(user, {email: user.email});
        dispatch(updateUser({
            userId: user.uid,
            name: user.displayName,
            email: user.email,
        }));
        dispatch(stateChange({ isRefreshing: true }));
        return true;

    } catch (error) {
        console.log("error", error);
        console.log("error.messag", error.message);
        return false;
    }
};

// Оновлення аватара
export const updateAvatar = ({ avatar }) => async (dispatch) => {
    try {
      const user = auth.currentUser;
      await updateProfile(user, { photoURL: avatar });
      dispatch(updateUserAvatar({avatar})
      );
    } catch (error) {
      console.log(error);
    }
  };

// Зміна стану аутентифікації користувача
export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUser({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      ),
        dispatch(stateChange({ isRefreshing: true }));
    }
  });
};

// Вихід
export const authSingOutUser = () => async (dispatch) => {
  await auth.signOut();
  dispatch(logOut());
};