import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";

class Chat extends Component {

  state = {
    messages: []
  }


  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: params.room_name
    };
  }
  //

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { uid } = firebase.auth().currentUser;
    this.user_id = uid;
    this.room_name = navigation.getParam("room_name");
  }


  componentDidMount() {
    firebase.database().ref().child(`messages/${this.room_name}`).limitToLast(20)
            .on('child_added', (snapshot) => {
              this.onReceive(snapshot);
            });
  }


  onReceive = (snapshot) => {
    const { message } = this.getMessage(snapshot);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message)
    }));
  }


  getMessage = (snapshot) => {
    const { timestamp: numStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const msg_data = {
      _id,
      text: text,
      createdAt: new Date(numStamp),
      user: {
        _id: user.id,
        name: user.name,
        avatar: `https://ui-avatars.com/api/?background=d88413&color=FFF&name=${user.name}`
      }
    }

    return {
      message: msg_data
    }
  }


  render() {
    const { messages } = this.state;
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.user_id
          }}
        />
      </View>
    );
  }
  //


  onSend = ([message]) => {
    const { uid, displayName } = firebase.auth().currentUser;
    const msg = {
      text: message.text,
      user: { id: uid, name: displayName },
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }

    firebase.database().ref().child(`messages/${this.room_name}`).push(msg);
  }

}

export default Chat;