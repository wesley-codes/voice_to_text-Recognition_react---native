import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Voice from "@react-native-community/voice";

const App = () => {
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e);
  };
  const onSpeechEndHandler = (e) => {
    setLoading(false);
    console.log("stop handler", e);
  };

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0];
    setResult(text);
    console.log("speech result handler", e);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start("en-Us");
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false)
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const clear = ( )=>{
setResult("")
  }
  console.log("speech recognition");
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Voice to Text Recognition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            multiline={true}
            placeholder="say something!"
            style={{
              flex: 1,
              height: "100%",
            }}
            onChangeText={(text) => setResult(text)}
          />
        </View>

        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={startRecording} style={styles.speak}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Speak</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.stop} onPress={stopRecording}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Stop</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.clear} onPress={clear}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Clear</Text>
          </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    padding: 24,
  },
  headingText: {
    alignSelf: "center",
    marginVertical: 26,
    fontWeight: "bold",
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 300,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  speak: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
  },
  stop: {
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
  },
  clear:{
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    marginTop: 15
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    with: "50%",
    justifyContent: "space-evenly",
    marginTop: 24,
  },
});

export default App;
