import React from "react";
import {Flex, Text, Input} from "native-base";

const CustomInput = (props) => {
  const {label, value, setValue} = props;
  return (
    <Flex flexDirection="column" my={1}>
      <Text>
        {label}
      </Text>
      <Input
        mt={2}
        value={value}
        bgColor="#EFEAEB"
        onChangeText={setValue}
        borderColor="transparent"
        {...props}
      />
    </Flex>
  )
}

export default CustomInput;