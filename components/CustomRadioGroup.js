import React from "react";
import {Flex, Text, Radio, Divider} from "native-base";
import RadioGroup from "native-base/src/components/primitives/Radio/RadioGroup";

const CustomRadioGroup = (props) => {
  const {label, value, setValue, options = null} = props;
  return (
    <Flex flexDirection="column" my={2} bgColor="#EFEAEB" py={2} px={4} rounded="xl">
      <Text fontSize="lg">
        {label}
      </Text>
      <RadioGroup
        mt={2}
        value={value}
        onValueChange={setValue}
        borderColor="transparent"
        onChange={setValue}
        {...props}
      >
        {options ? (
          <>
            {options.map((option, key) => (
              <>
                <Radio value={option.value} my={1}>
                  {option.description}
                </Radio>
                {(key + 1) !== options.length && <Divider bgColor="#525252" thickness={.5} my={1}/>}
              </>
            ))}
          </>
        ) : (
          <>
            <Radio value={true} my={1}>
              Sim
            </Radio>
            <Radio value={false} my={1}>
              Não
            </Radio>
          </>
        )}
      </RadioGroup>
    </Flex>
  )
}

export default CustomRadioGroup;