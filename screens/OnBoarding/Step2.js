import React from "react";
import {Button, Flex, Text} from "native-base";
import CustomInput from "../../components/Input";
import CustomSelect from "../../components/CustomSelect";
import {userState} from "../../Atoms/userAtom";
import {useRecoilState} from "recoil";

const Step2 = ({ handleNextStep }) => {
  const [user, setUser] = useRecoilState(userState);

  const handleNext = () => {
    handleNextStep([
      { type: 'string', value: user.cpf },
      { type: 'string', value: user.sexo },
      { type: 'string', value: user.idade },
      { type: 'string', value: user.email },
      { type: 'string', value: user.telefone },
      { type: 'string', value: user.nomeCompleto },
    ])
  }

  const handleNomeCompleto = (value) => {
    setUser({
      ...user,
      nomeCompleto: value,
    })
  }

  const handleCpf = (value) => {
    setUser({
      ...user,
      cpf: value,
    })
  }

  const handleIdade = (value) => {
    setUser({
      ...user,
      idade: value,
    })
  }

  const handleEmail = (value) => {
    setUser({
      ...user,
      email: value,
    })
  }

  const handleTelefone = (value) => {
    setUser({
      ...user,
      telefone: value,
    })
  }

  const handleSexo = (value) => {
    setUser({
      ...user,
      sexo: value,
    })
  }

  return (
    <Flex w="100%" rounded="2xl" my="auto">
      <Text w="100%" textAlign="center" fontWeight="semibold" fontSize="2xl" color="#000">
        Olá, {user.nome.split(' ')[0]} {user.nome.split(' ')[1]}
      </Text>
      <Text mt={0} mb={4} fontSize='xl' color="#000" textAlign="center">
        Vamos realizar seu cadastro
      </Text>
      <CustomInput
        label='Nome completo'
        value={user.nomeCompleto}
        setValue={handleNomeCompleto}
      />
      <CustomInput
        label='CPF'
        value={user.cpf}
        setValue={handleCpf}
        keyboardType="numeric"
      />
      <CustomInput
        label='Idade'
        value={user.idade}
        setValue={handleIdade}
        keyboardType="numeric"
      />
      <CustomInput
        label='Telefone'
        value={user.telefone}
        keyboardType="numeric"
        setValue={handleTelefone}
      />
      <CustomInput
        label='Email'
        value={user.email}
        setValue={handleEmail}
      />
      <CustomSelect
        label='Sexo'
        value={user.sexo}
        setValue={handleSexo}
        options={['Feminino', 'Masculino', 'Não binário']}
      />
      <Button mt={8} px={1} py={2} rounded="full" shadow={1} onPress={handleNext}>
        <Text fontSize="md" color="#FFF" bold>
          Continuar
        </Text>
      </Button>
    </Flex>
  );
}

export default Step2;