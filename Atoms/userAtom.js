import {atom} from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    cpf: '',
    sexo: '',
    nome: '',
    idade: '',
    email: '',
    risk: null,
    telefone: '',
    fumante: false,
    pulmonar: false,
    nivelSintomas: 0,
    obesidade: false,
    nomeCompleto: ''
  },
});