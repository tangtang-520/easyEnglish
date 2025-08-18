import Tabs from "@/components/Tabs";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";

import { useRegisterQuery } from "@/hooks/request/useRequsetUser";
import { Stack } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";


const LoginComponent = () => {
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [passInvalid, setPassInvalid] = useState<boolean>(false);
  const [nameErrText, setNameErrText] = useState<string>("");
  const [passErrText, setPassErrText] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [passValue, setPassValue] = useState<string>("");
  const passReg = /^[A-Za-z0-9]{8}$/;

  const handleSubmit = () => {
    if (!nameValue.length) {
      setNameErrText("请输入用户名或邮箱");
      setNameInvalid(true);
    }
    if (!passReg.test(passValue)) {
      setPassErrText("密码长度8位，且包含英文字母大小写和数字");
      setPassInvalid(true);
    }
    if (nameInvalid || passInvalid) return;

    console.log(nameValue, passValue);
  };

  return (
    <View className="">
      <VStack space="sm">
        <FormControl isInvalid={nameInvalid}>
          <FormControlLabel>
            <FormControlLabelText>账号：</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="请输入用户名或邮箱"
              value={nameValue}
              onChangeText={(text) => setNameValue(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              <Text>{nameErrText}</Text>
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={passInvalid}>
          <FormControlLabel>
            <FormControlLabelText>密码：</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="password"
              placeholder="请输入密码"
              value={passValue}
              onChangeText={(text) => setPassValue(text)}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>密码长度8位</FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              <Text>{passErrText}</Text>
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button className="w-full mt-4" size="sm" onPress={handleSubmit}>
          <ButtonText>Submit</ButtonText>
        </Button>
      </VStack>
    </View>
  );
};

const RegisterComponent = () => {
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [passInvalid, setPassInvalid] = useState<boolean>(false);
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [nameErrText, setNameErrText] = useState<string>("");
  const [passErrText, setPassErrText] = useState<string>("");
  const [emailErrText, setEmailErrText] = useState<string>("");

  const [userData, setUserData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [emailValue, setEmailValue] = useState<string>("");
  const passReg = /^[A-Za-z0-9]{8}$/;
  const emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const { isPending, mutateAsync } = useRegisterQuery();

  const handleSubmit = async () => {
    const isNameInvalid = !userData.username.length;
    const isPassInvalid = !passReg.test(userData.password);
    const isEmailInvalid = !emailReg.test(emailValue) && emailValue.length;
    if (isNameInvalid) {
      setNameErrText("请输入用户名");
      setNameInvalid(true);
    } else {
      setNameInvalid(false);
    }
    if (isPassInvalid) {
      setPassErrText("密码长度8位，且包含英文字母大小写和数字");
      setPassInvalid(true);
    } else {
      setPassInvalid(false);
    }
    if (isEmailInvalid) {
      setEmailErrText("请输入正确的邮箱");
      setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }
    if (isNameInvalid || isPassInvalid || isEmailInvalid) {
      console.log("验证失败，阻止提交");
      return;
    }
    if (isPending) return;

    try {
      const result = await mutateAsync(userData);
      console.log(result);
   
    } catch (error) {
        
      console.log(error);
    }
  };

  return (
    <View className="">
      <VStack space="sm">
        <FormControl isInvalid={nameInvalid}>
          <FormControlLabel>
            <FormControlLabelText>账号：</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="请输入用户名"
              value={userData.username}
              onChangeText={(text) =>
                setUserData({
                  ...userData,
                  username: text,
                })
              }
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              <Text>{nameErrText}</Text>
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={passInvalid}>
          <FormControlLabel>
            <FormControlLabelText>密码：</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="password"
              placeholder="请输入密码"
              value={userData.password}
              onChangeText={(text) =>
                setUserData({
                  ...userData,
                  password: text,
                })
              }
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>密码长度8位</FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              <Text>{passErrText}</Text>
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={emailInvalid}>
          <FormControlLabel>
            <FormControlLabelText>邮箱：</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="请输入邮箱"
              value={emailValue}
              onChangeText={(text) => setEmailValue(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              <Text>{emailErrText}</Text>
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button className="w-full mt-4" size="sm" onPress={handleSubmit}>
          {isPending && <ButtonSpinner color={colors.gray[400]} />}
          <ButtonText>注册</ButtonText>
        </Button>
      </VStack>
    </View>
  );
};



const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const handChangeTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
      <View className="flex flex-col justify-center items-center h-full bg-white flex-1">
        <Stack.Screen options={{ headerShown: false }} />
        <Box className="p-5 rounded-lg max-w-[360px] min-w-[320px] ">
          <Tabs
            label={["登录", "注册"]}
            onChange={(val) => handChangeTab(val)}
          ></Tabs>
          {activeTab === 0 ? (
            <LoginComponent></LoginComponent>
          ) : (
            <RegisterComponent></RegisterComponent>
          )}
        </Box>
      
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
