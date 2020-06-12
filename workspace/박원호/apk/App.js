import React from "react";
import { WebView } from "react-native-webview";
import { StatusBar, Platform, View } from "react-native";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default class App extends React.Component {
  render() {
    if (Platform.OS === "android") {
      return (
        <>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <StatusBar hidden={true} />
          <WebView
            source={{ uri: "https://2020spring-41class-team7.now.sh/main" }}
            style={{ marginTop: 0 }}
          />
        </>
      );
    } else {
      return (
        <WebView
          source={{ uri: "https://2020spring-41class-team7.now.sh/main" }}
          style={{ marginTop: 48 }}
        />
      );
    }
  }
}
