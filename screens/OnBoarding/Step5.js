import React, {useEffect} from "react";
import {useRecoilState} from "recoil";
import {Button, Flex, Spinner, Text} from "native-base";
import {userState} from "../../Atoms/userAtom";
import CustomInput from "../../components/Input";
import CustomRadioGroup from "../../components/CustomRadioGroup";
import axios from "axios";

const Step5 = ({ handleNextStep, handleGoBack }) => {
  const [user, setUser] = useRecoilState(userState);

  const handleNext = () => {
    handleNextStep([])
    // console.log(user)
  }

  const handleSintomas = (value) => {
    setUser({
      ...user,
      nivelSintomas: value,
    })
  }

  const boolToInt = (value) => {
    if (value) {
      return 1
    }
    return 0
  }

  useEffect(() => {
    if (user && !user.risk) {
      axios.post('http://3571-187-85-18-193.ngrok.io/api/predict_risk' , {
        "idade": user.idade,
        "fumante": boolToInt(user.fumante),
        "obeso": boolToInt(user.obeso),
        "doenca_pulmonar": boolToInt(user.pulmonar),
        "nivel_sintomas": user.nivelSintomas
      })
      .then(response => {
        setUser({
          ...user,
          risk: response.data.risk
        })
      })
      .catch(error => console.log(error))
    }
  }, []);


  if (!user || !user.risk) {
    return (
      <Flex flexDir="column">
        <Spinner />
        <Text> Analisando seus dados... </Text>
      </Flex>
    )
  }

  return (
    <Flex rounded="2xl" my="auto" p={2}>
      <Text textAlign="center" fontWeight="semibold" fontSize="2xl" color="#000" mb={2}>
        {user.nome.split(' ')[0]}
      </Text>
      <Text textAlign="center" fontSize="lg" color="#000" mb={4}>
        Fizemos uma avaliação rápida e com base nos dados informados recomendamos que:
      </Text>
      <Text textAlign="center" fontSize="lg" color="#000" fontWeight="semibold">
        {user.risk === 1 && 'Vá até um hospital caso seus sintomas piore.'}
        {user.risk === 2 && 'Vá até um hospital e informe a um especialista como você sente.'}
        {user.risk === 3 && 'Vá até um hospital o quanto antes para receber ajuda de um especialista.'}
        {user.risk >= 4 && 'Vá até um hospital imediatamente para receber ajuda de um especialista e ser atendido o mais rápido possivel.'}
      </Text>
      <Text textAlign="left" color="#000" mt={4}>
        Na tela seguinde você verá alguns hospitais mais próximos a você.
      </Text>
      <Button mt={4} px={1} py={2} rounded="full" shadow={1} onPress={handleNext}>
        <Text fontSize="md" color="#FFF" bold>
          Continuar
        </Text>
      </Button>
      <Text textAlign="center" color="#000" mt={2} fontSize="sm" fontWeight="semibold">
        Para melhores resultados, precisaremos que você permita o acesso sua localização.
      </Text>
    </Flex>
  )
}

export default Step5;