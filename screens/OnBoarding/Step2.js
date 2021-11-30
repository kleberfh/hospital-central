import React from "react";
import {useRecoilState} from "recoil";
import {Button, Flex, Text} from "native-base";
import {userState} from "../../Atoms/userAtom";
import CustomInput from "../../components/Input";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import CustomSelect from "../../components/CustomSelect";

const Step2 = ({ handleNextStep }) => {
  const [user, setUser] = useRecoilState(userState);

  function mphone(v) {
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }

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
      cpf: cpfValidator.format(value),
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
      telefone: mphone(value),
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
        size="lg"
        label='Nome completo'
        value={user.nomeCompleto}
        setValue={handleNomeCompleto}
      />
      <CustomInput
        size="lg"
        label='CPF'
        value={user.cpf}
        setValue={handleCpf}
        keyboardType="numeric"
      />
      <CustomInput
        size="lg"
        label='Idade'
        value={user.idade}
        setValue={handleIdade}
        keyboardType="numeric"
      />
      <CustomInput
        size="lg"
        label='Telefone'
        value={user.telefone}
        keyboardType="numeric"
        setValue={handleTelefone}
        placeholder="Ex: (12) 93456-7891"
      />
      <CustomInput
        size="lg"
        label='Email'
        value={user.email}
        setValue={handleEmail}
        autoCapitalize={false}
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