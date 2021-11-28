import React from "react";
import {useRecoilState} from "recoil";
import {Button, Flex, Text} from "native-base";
import {userState} from "../../Atoms/userAtom";
import CustomInput from "../../components/Input";
import CustomRadioGroup from "../../components/CustomRadioGroup";

const Step4 = ({ handleNextStep }) => {
  const [user, setUser] = useRecoilState(userState);

  const options = [
    {value: 0, description: 'Não estou com nenhum sintoma.'},
    {value: 1, description: 'dor de cabeça, perda de olfato, dores musculares, tosse, dor no peito, com ou sem febre.'},
    {value: 2, description: 'dor de cabeça, perda de olfato, perda de apetite, diarreia, dor de garganta, dor no peito, com ou sem tosse.'},
    {value: 3, description: 'dor de cabeça, perda de olfato, perda de apetite, tosse, febre, rouquidão, dor de garganta, dor no peito, fadiga, confusão mental, dor muscular.'},
    {value: 4, description: 'dor de cabeça, perda do olfato, perda de apetite, tosse, febre, rouquidão, dor de garganta, dor no peito, fadiga, confusão mental, dor muscular, falta de ar, diarreia, dor abdominal.'},
  ]

  const handleNext = () => {
    // handleNextStep([])
    console.log(user)
  }

  const handleSintomas = (value) => {
    setUser({
      ...user,
      nivelSintomas: value,
    })
  }

  return (
    <Flex rounded="2xl" my="auto" p={2}>
      <Text textAlign="center" fontWeight="semibold" fontSize="2xl" color="#000" mb={2}>
        {user.nome.split(' ')[0]}, agora nos diga
      </Text>
      <CustomRadioGroup
        label="Qual opção descreve melhor os seus sintomas?"
        value={user.nivelSintomas}
        setValue={handleSintomas}
        options={options}
      />
      <Button mt={4} px={1} py={2} rounded="full" shadow={1} onPress={handleNext}>
        <Text fontSize="md" color="#FFF" bold>
          Continuar
        </Text>
      </Button>
    </Flex>
  )
}

export default Step4;