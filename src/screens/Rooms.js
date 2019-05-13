import React, { Component } from "react";
import { View, Text, FlatList, Button } from "react-native";
import firebase from "firebase";

class Rooms extends Component {
  static navigationOptions = {
    title: "Rooms"
  };


  state = {
    rooms: []
  }


  constructor(props) {
    super(props);
    const { navigation } = this.props;
    firebase.database().ref().child('messages').on('value', (snapshot) => {
      this.setState({
        rooms: Object.keys(snapshot.val())
      });
    });
  }


  render() {
    const { rooms } = this.state;
    return (
      <View style={styles.container}>
        {
          rooms &&
          <FlatList
            keyExtractor={(item) => item}
            data={rooms}
            renderItem={this.renderRoom}
          />
        }
      </View>
    );
  }


  renderRoom = ({ item }) => {
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_text}>{item}</Text>
        <Button title="Enter" color="#0064e1" onPress={() => {
          this.enterChat(item);
        }} />
      </View>
    );
  }
  //

  goToChatScreen = (room) => {
    this.props.navigation.navigate("Chat", {
      room_name: room
    });
  }
  //

  enterChat = (room) => {
    this.goToChatScreen(room);
  }

}

export default Rooms;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list_item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list_item_text: {
    marginLeft: 10,
    fontSize: 20,
  }
};