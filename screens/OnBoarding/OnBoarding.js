import React, {useState} from "react";
import {ImageBackground, Platform} from "react-native";
import {Flex, Image, KeyboardAvoidingView, StatusBar, useToast} from "native-base";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import Logo from '../../assets/Images/logo.png';
import Hospital from '../../assets/Images/hospital.png';
import Step4 from "./Step4";
import MapResult from "../MapResult/MapResult";

const OnBoarding = () => {
  const toast = useToast();
  const [currentStatus, setCurrentStatus] = useState(4);

  const handleNextStep = (validations) => {
    let hasEmptyValue = false;

    validations.map(validation => {
      if (validation.type === 'string') {
        if (validation.value === '') {
          hasEmptyValue = true
        }
      }
    })

    if (hasEmptyValue) {
      toast.show({
        duration: 2500,
        placement: 'top',
        status: 'warning',
        title: 'Campos inválidos',
        description: 'Todos os campos precisam estar preenchidos para continuar.'
      })
    } else {
      setCurrentStatus(currentStatus + 1)
    }
  }

  const handleGoBack = () => {
    setCurrentStatus(currentStatus - 1)
  }

  return (
    <ImageBackground source={Hospital} style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <Image w={32} h={12} source={Logo} alt="Logo" top={[10, 10, 10, 4]} right="auto" left={4} position="absolute" />
      <KeyboardAvoidingView
        my="auto"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Flex p={4} mx={4} my="auto" alignItems="center" justifyContent="center" bgColor="rgba(255, 255, 255, 0.8)" rounded="3xl" shadow={2}>
          {currentStatus === 0 && (
            <Step1 handleNextStep={handleNextStep} />
          )}
          {currentStatus === 1 && (
            <Step2 handleNextStep={handleNextStep} handleGoBack={handleGoBack} />
          )}
          {currentStatus === 2 && (
            <Step3 handleNextStep={handleNextStep} handleGoBack={handleGoBack} />
          )}
          {currentStatus === 3 && (
            <Step4 handleNextStep={handleNextStep} handleGoBack={handleGoBack} />
          )}
          {currentStatus === 4 && (
            <MapResult handleNextStep={handleNextStep} handleGoBack={handleGoBack} />
          )}
        </Flex>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default OnBoarding;