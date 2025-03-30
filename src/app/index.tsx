import {StyleSheet, Text, View} from "react-native";
import {Button} from "../components/Button/Button";

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Hey HackerRank NEWS APP</Text>
            <Button
                title="Press Me"
                onPress={() => console.log("Button pressed")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeScreen;
