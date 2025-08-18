import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

type propsType = {
  label: string[];
  onChange?: (index: number) => void; // 选中变化回调
};

const Tabs = ({ label, onChange }: propsType) => {
  const left = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState<number>(0); // 初始选中第一个选项

  const handSearch = (idx: number) => {
    left.value = withTiming(56 * idx, {
      duration: 300,
    });
    setActiveIndex(idx)
    onChange?.(idx)
  };

  return (
    <View className="flex flex-row justify-center relative w-[112px] mx-auto">
      <Animated.View
        className="absolute w-[56px] h-[40px] rounded-md bg-white shadow-[0_0px_4px_rgba(0,0,0)]"
        style={{
          left: left,
        }}
      />
      {label.map((item, index) => {
        return (
          <Pressable key={item} onPress={() => handSearch(index)}>
            <View className="itemSty w-[56px] x h-[40px] rounded-md flex justify-center items-center">
              <Text>{item}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Tabs;
