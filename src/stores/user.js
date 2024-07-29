import { defineStore } from "pinia";
import router from "../router/index";

//firebase
import { AUTH, DB } from "../utils/firebase";
//import errorCodes from "@/utils/fbcodes";
import errorCodes from "../utils/fbcodes";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const DEFAULT_USER = {
  uid: null,
  email: null,
  firstname: null,
  lastname: null,
  isAdmin: null,
};

export const useUserStore = defineStore("user", {
  state: () => ({
    loading: false,
    user: DEFAULT_USER,
    auth: false,
  }),
  getters: {
    getUserData(state){
      return state.user
    }
  },
  actions: {
    setUser(user) {
      this.user = { ...this.user, ...user };
      this.auth = true;
    },
    async signOut() {
      await signOut(AUTH);
      this.user = DEFAULT_USER;
      this.auth = false;
      router.push({name: 'home'});
    },
    async autosignin(uid) {
      try {
        console.log(uid);
        const userData = await this.getUserProfile(uid);

        /// UPDATE LOCAL STATE
        this.setUser(userData);

        return true;
      } catch (error) {
        console.log(error)
      }
    },
    async getUserProfile(uid) {
      try {
        const userRef = await getDoc(doc(DB, "users", uid));

        //console.log(userRef.data);

        if (!userRef.exists()) {
          throw new Error("Could not find user !!");
        }

        return userRef.data();
      } catch (error) {}
    },
    async signIn(formData) {
      try {
        this.loading = true;

        /// SIGN IN USER
        const response = await signInWithEmailAndPassword(
          AUTH,
          formData.email,
          formData.password
        );
        // console.log(response);

        /// GET USER DATA
        const userData = await this.getUserProfile(response.user.uid);

        console.log(userData);

        /// UPDATE LOCAL STATE
        this.setUser(userData);

        // REDIRECT USER
        router.push({ name: "dashboard" });
      } catch (error) {
        throw new Error(errorCodes(error.code));
      } finally {
        this.loading = false;
      }
    },
    async register(formData) {
      try {
        this.loading = true;

        /// REGISTER USER
        const response = await createUserWithEmailAndPassword(
          AUTH,
          formData.email,
          formData.password
        );

        //console.log(response);

        //Add new user
        const newUser = {
          uid: response.user.uid,
          email: response.user.email,
          isAdmin: false,
        };

        await setDoc(doc(DB, "users", response.user.uid), newUser);

        /// UPDATE LOCAL STATE
        this.setUser(newUser);

        // REDIRECT USER
        router.push({ name: "dashboard" });
      } catch (error) {
        throw new Error(errorCodes(error.code));
      } finally {
        this.loading = false;
      }
    },
  },
});
