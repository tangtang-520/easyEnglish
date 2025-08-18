import Tabs from "@/components/Tabs";
import { Card } from "@/components/ui/card";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { CircleX } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

const TranslatInput = () => {
  const [ textValue, setTextValue ] = useState<string>("")
  return (
    <Textarea>
      <TextareaInput value={textValue} onChangeText={(val)=> {setTextValue(val)}} placeholder="请输入翻译的内容" />
    </Textarea>
  );
};

const DictionaryContent = () => {
  const [value, setVal] = useState<string>("sdf");

  const handClear = () => {
    setVal("");
  };
  return (
    <>
      <View className="my-1">
        <Input
          variant="outline"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="请输入搜索词..."
            value={value}
            onChangeText={(val) => setVal(val)}
          />
          <InputSlot className="pr-3" onPress={handClear}>
            <InputIcon as={CircleX}></InputIcon>
          </InputSlot>
        </Input>
      </View>
      <View>
        <Text>结果：</Text>
      </View>
      <Card size="md" variant="elevated" className="m-3"></Card>
    </>
  );
};

const TabDictionary = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handChangeTab = (index: number) => {
    setActiveTab(index);
  };
  return (
    <View className="p-[10px] bg-white flex-1">
      <Tabs label={["字典", "翻译"]} onChange={handChangeTab}></Tabs>

      <View className="mt-3">
        {activeTab === 0 ? (
          <DictionaryContent></DictionaryContent>
        ) : (
          <TranslatInput></TranslatInput>
        )}
      </View>
    </View>
  );
};

export default TabDictionary;
