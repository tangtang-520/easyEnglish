import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

type cidianType = {
  value: string;
  src: ImageSourcePropType;
};

const dictionariesArr: cidianType[] = [
  {
    value: "词汇",
    src: require("@/assets/images/cover/BEC_2.jpg"),
  },
  {
    value: "人教版",
    src: require("@/assets/images/cover/BEC_2.jpg"),
  },
  {
    value: "外研社",
    src: require("@/assets/images/cover/BEC_2.jpg"),
  },
  {
    value: "北师大版",
    src: require("@/assets/images/cover/BEC_2.jpg"),
  },
  {
    value: "新东方",
    src: require("@/assets/images/cover/BEC_2.jpg"),
  },
  {
    value: "正序版",
    src: require("@/assets/images/cover/BEC_2.jpg"),
  },
];

export default function TabOneScreen() {
  const { width } = useWindowDimensions();
  const numColumns = 3; // 固定每行3列，你可以根据需要调整
  const gap = 20;

  // 计算每个项目的宽度，考虑到外边距和内边距
  const totalGapWidth = gap * (numColumns - 1);
  const itemWidth = (width - 20 - totalGapWidth) / numColumns; // 20是容器的左右padding总和
  return (
    <View style={styles.container}>
      <View className="flex flex-row flex-wrap" style={{ gap }}>
        {dictionariesArr.map((item) => {
          return (
            <View
              key={item.value}
              style={{ width: itemWidth }}
              className=" flex flex-col items-center justify-center"
            >
              <Image style={styles.tinyLogo} source={item.src} />
              <Text>{item.value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  dictionariesbox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  items: {
    width: 80,
    height: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
});
