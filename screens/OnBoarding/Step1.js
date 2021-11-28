import React from "react";
import {Button, Flex, Text} from "native-base";
import CustomInput from "../../components/Input";
import {useRecoilState} from "recoil";
import {userState} from "../../Atoms/userAtom";

const Step1 = ({handleNextStep}) => {
  const [user, setUser] = useRecoilState(userState);

  const handleNext = () => {
    handleNextStep([{
      type: 'string',
      value: user.nome
    }])
  }

  const handleName = (value) => {
    setUser({
      ...user,
      nome: value,
    })
  }

  return (
    <Flex rounded="2xl" my="auto" p={2}>
      <Text textAlign="center" fontWeight="semibold" fontSize="2xl" color="#000">
        Bem vindo ao Hospital Central COVID-19
      </Text>
      <Flex flexDirection="column" mb={4}>
        <Text mt={4} fontSize='xl' color="#000" textAlign="center">
          Para começar, informe seu nome
        </Text>
      </Flex>
      <CustomInput
        label='Nome e sobrenome'
        value={user.name}
        setValue={handleName}
        placeholder="Ex: Jose Rodrigues"
      />
      <Button mt={8} px={1} py={2} rounded="full" shadow={1} onPress={handleNext}>
        <Text fontSize="md" color="#FFF" bold>
          Continuar
        </Text>
      </Button>
    </Flex>
  );
}

export default Step1;