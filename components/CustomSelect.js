import React from "react";
import {Flex, Text, Input, Select} from "native-base";

const CustomSelect = (props) => {
  const {label, value, setValue, options = []} = props;
  return (
    <Flex flexDirection="column" my={1}>
      <Text>
        {label}
      </Text>
      <Select
        mt={1}
        value={value}
        bgColor="#EFEAEB"
        onValueChange={setValue}
        borderColor="transparent"
        {...props}
      >
        {options.map(item => (
          <Select.Item label={item} value={item} />
        ))}
      </Select>
    </Flex>
  )
}

export default CustomSelect;