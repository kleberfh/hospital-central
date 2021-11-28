import React from "react";
import {useRecoilState} from "recoil";
import {Button, Flex, Text} from "native-base";
import {userState} from "../../Atoms/userAtom";
import CustomInput from "../../components/Input";
import CustomRadioGroup from "../../components/CustomRadioGroup";

const Step3 = ({ handleNextStep }) => {
  const [user, setUser] = useRecoilState(userState);

  const handleNext = () => {
    handleNextStep([])
  }

  const handlePulmonar = (value) => {
    setUser({
      ...user,
      pulmonar: value,
    })
  }

  const handleFumante = (value) => {
    setUser({
      ...user,
      fumante: value,
    })
  }

  const handleObesidade = (value) => {
    setUser({
      ...user,
      obesidade: value,
    })
  }

  return (
    <Flex rounded="2xl" my="auto" p={2}>
      <Text textAlign="center" fontWeight="semibold" fontSize="2xl" color="#000" mb={4}>
        {user.nome.split(' ')[0]}, você possui algum desses graus de risco?
      </Text>
      <CustomRadioGroup
        label="Possui alguma doença pulmonar?"
        value={user.pulmonar}
        setValue={handlePulmonar}
      />
      <CustomRadioGroup
        label="Possui algum grau de obesidade?"
        value={user.obesidade}
        setValue={handleObesidade}
      />
      <CustomRadioGroup
        label="É fumante?"
        value={user.fumante}
        setValue={handleFumante}
      />
      <Button mt={4} px={1} py={2} rounded="full" shadow={1} onPress={handleNext}>
        <Text fontSize="md" color="#FFF" bold>
          Continuar
        </Text>
      </Button>
    </Flex>
  )
}

export default Step3;