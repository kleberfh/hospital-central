import React, {useState} from "react";
import {Button, Flex, Image, Text, useToast} from "native-base";

import Logo from '../assets/Images/logo.png';
import Hospital from '../assets/Images/hospital.png';
import {ImageBackground} from "react-native";
import CustomInput from "../components/Input";

const OnBoarding = () => {
  const toast = useToast();
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [currentStatus, setCurrentStatus] = useState(0);
  const [sexo, setSexo] = useState('Helicoptero de combate');

  const handleFirstStep = () => {
    console.log('proximo passo');
    if (name !== '') {
      setCurrentStatus(1)
    } else {
      toast.show({
        duration: 2500,
        placement: 'top',
        status: 'warning',
        title: 'Nome inválido',
        description: 'Digite seu nome para continuar.'
      })
    }
  }

  return (
    <ImageBackground source={Hospital} style={{flex: 1}}>
      <Image w={32} h={12} source={Logo} alt="Logo" top={4} left="auto" right={4} position="absolute" />
      <Flex p={4} mx={4} my="auto" alignItems="center" justifyContent="center" bgColor="rgba(255, 255, 255, 0.8)" rounded="3xl" shadow={2}>
        {currentStatus === 0 && (
          <Flex rounded="2xl" my="auto">
            <Text w="100%" textAlign="center" fontWeight="semibold" fontSize="2xl" color="#000">
              Bem vindo ao Hospital Central COVID-19
            </Text>
            <Flex flexDirection="column">
              <Text mt={4} fontSize='xl' color="#000" textAlign="center">
                Para começar, informe seu nome:
              </Text>
            </Flex>
            <CustomInput
              label='Nome'
              value={name}
              setValue={setName}
            />
            <Button mt={8} px={1} py={2} rounded="full" shadow={1} onPress={handleFirstStep}>
              <Text fontSize="md" color="#FFF" bold>
                Continuar
              </Text>
            </Button>
          </Flex>
        )}
        {currentStatus === 1 && (
          <Flex w="100%" rounded="2xl" my="auto">
            <Text w="100%" textAlign="center" fontWeight="semibold" fontSize="2xl" color="#000">
              Olá, {name.split(' ')[0]} {name.split(' ')[1]}
            </Text>
            <Text mt={0} mb={4} fontSize='xl' color="#000" textAlign="center">
              Vamos realizar seu cadastro
            </Text>
            <CustomInput
              label='Nome completo'
              value={fullName}
              setValue={setFullName}
            />
            <CustomInput
              label='CPF'
              value={cpf}
              setValue={setCpf}
            />
            <CustomInput
              label='Idade'
              value={idade}
              setValue={setIdade}
            />
            <CustomInput
              label='Telefone'
              value={telefone}
              setValue={setTelefone}
            />
            <CustomInput
              label='Email'
              value={email}
              setValue={setEmail}
            />
            <CustomInput
              label='Sexo'
              value={sexo}
              setValue={setSexo}
            />
            <Button mt={8} px={1} py={2} rounded="full" shadow={1}>
              <Text fontSize="md" color="#FFF" bold>
                Continuar
              </Text>
            </Button>
          </Flex>
        )}
      </Flex>
    </ImageBackground>
  )
}

export default OnBoarding;