import React, {useState} from 'react'
import "../../../assets/css/Global.scss"
import HeaderNavigator from '../HeaderNavigator/HeaderNavigator.jsx'
import api from '../../../services/api.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Create() {

    const [matricula, setMatricula] = useState(0);
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [tipo, setTipo] = useState(0);

    function Create(event) {  

        event.preventDefault()
        
        let user = {
        typeUser: Number(tipo),
        name: name,
        email: email,
        cpfUser: cpf,
        matriculation: Number(matricula),
        password: senha
        }

        console.log(user)
      
      api.post(`/auth/create`, user)
        .then(response => {

          console.log(response)

          const token = sessionStorage.getItem('accessToken')
          if(token){
              toast.success("Cadastro efetuado!")
              setTimeout(() =>
              document.location.href = '/users', 3000
              )
          }

        }).catch(err =>{
          toast.error("Ocorreu algum erro!")
          console.log(err);
        })
      };

  return (
      <div className = '__backgroundLogin'>
        <div>
            <HeaderNavigator></HeaderNavigator>
        </div>
        <div className = '__areaRegister'>
            <div className = '__divTitle'>
                <text className = '__title'>Cadastrar Usuário</text>
                <div>_____________________</div>
            </div>
            <div className = '__Register'>
                <div>
                    <div style = {{display: "flex", alignItems: "baseline", flexDirection: "column", margin: "15px"}}>
                        <div>
                            <text>Matrícula</text>
                        </div>
                        <input type = 'text' placeholder = 'Matrícula' onChange = {(event) => setMatricula(event.target.value)}></input>
                        <div>
                            <text>Senha</text>
                        </div>
                        <input type = 'password' placeholder = 'Senha' onChange = {(event) => setSenha(event.target.value)}></input>
                        <div>
                            <text>Email</text>
                        </div>
                        <input type = 'text' placeholder = 'Email' onChange = {(event) => setEmail(event.target.value)}></input>
                    </div>
                    <div style = {{display: "flex", alignItems: "baseline", flexDirection: "column", margin: "15px"}}>
                        <div>
                            <text>CPF</text>
                        </div>
                        <input type = 'text' placeholder = 'CPF' onChange = {(event) => setCpf(event.target.value)}></input>
                        <div>
                            <text>Nome</text>
                        </div>
                        <input type = 'text' placeholder = 'Name' onChange = {(event) => setName(event.target.value)}></input>
                        <div>
                            <text>Tipo</text>
                        </div>
                        <input type = 'text' placeholder = 'Tipo' onChange = {(event) => setTipo(event.target.value)}></input>
                    </div>
                </div>
                <div style = {{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                    <button type = 'submit' onClick = {Create}>Cadastrar</button>
                </div>
            </div>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        />
    </div>
  )
}
