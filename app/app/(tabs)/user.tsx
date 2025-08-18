import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Stack } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

function LogoTitle() {
  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>个人中心</Text>
    </View>
  );
}

const RightBtn = () => {
  return (
    <View>
      <Ionicons name="settings-outline" size={25} style={{ right: 10 }} />
    </View>
  );
};

export default function TabUserScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitle: () => <LogoTitle />,
          headerRight: () => <RightBtn />,
        }}
      ></Stack.Screen>
      <View style={styles.container}>
        <View style={styles.hedesty}>
          <View style={styles.imgBox}>
            <Image></Image>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>用户名</Text>
            <Text numberOfLines={1} style={{ width: 250 }} ellipsizeMode="tail">
              人不仅要学会忍受孤独，更要学会享受孤独
            </Text>
          </View>
        </View>
      </View>
      <View>
        
        <Link href="/login">登录</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#eee",
    overflow: "scroll",
  },
  imgBox: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#eee",
    marginRight: 10,
  },
  hedesty: {
    height: 100,
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    borderBottomColor: "#eee",
    borderRadius: 10,
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
  },
});
