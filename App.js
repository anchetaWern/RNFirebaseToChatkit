import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import Root from "./Root";

export default class App extends Component {

  constructor() {
    super();
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "YOUR FIREBASE API KEY",
        authDomain: "{YOUR_FIREBASE_AUTH_DOMAIN}.firebaseapp.com",
        databaseURL: "{YOUR_FIREBASE_DATABASE_URL}.firebaseio.com",
        projectId: "YOUR FIREBASE PROJECT ID",
        appId: "YOUR FIREBASE APP ID"
      });
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Root />
      </View>
    );
  }
}

//

const styles = {
  container: {
    flex: 1
  }
};