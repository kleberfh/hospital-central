import {atom} from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    cpf: '',
    sexo: '',
    nome: '',
    idade: '',
    email: '',
    telefone: '',
    fumante: false,
    pulmonar: false,
    nivelSintomas: 0,
    obesidade: false,
    nomeCompleto: ''
  },
});