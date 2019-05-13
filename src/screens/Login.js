import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import firebase from "firebase";

class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };


  state = {
    email: "",
    password: "",
    is_loading: false
  }
  //

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>

          <View style={styles.main}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Enter your email</Text>
              <TextInput
                keyboardType={"email-address"}
                style={styles.textInput}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Enter your password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>

            {!this.state.is_loading && (
              <Button title="Login" color="#0064e1" onPress={this.login} />
            )}

            {this.state.is_loading && (
              <Text style={styles.loadingText}>Loading...</Text>
            )}
          </View>
        </View>
      </View>
    );
  }


  login = async () => {
    const { email , password } = this.state;
    this.setState({
      is_loading: true
    });

    if (email && password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        this.props.navigation.navigate("Rooms");
      } catch (auth_err) {
        console.log("auth error: ", auth_err);
      }
    }

    await this.setState({
      is_loading: false,
      email: "",
      password: ""
    });
  }
}

export default Login;

const styles = {
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF"
  },
  fieldContainer: {
    marginTop: 20
  },
  label: {
    fontSize: 16
  },
  textInput: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eaeaea",
    padding: 5
  },
  loadingText: {
    alignSelf: "center"
  }
};