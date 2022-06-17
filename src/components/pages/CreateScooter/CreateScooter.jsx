import React, {useState} from 'react'
import "../../../assets/css/Global.scss"
import HeaderNavigator from '../HeaderNavigator/HeaderNavigator.jsx'
import api from '../../../services/api.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Create() {

    const [codigo, setCodigo] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [bateria, setBateria] = useState("");
    const [status, setStatus] = useState(0);

    function CreateScooter(event) {  

        event.preventDefault()
        
        let scooter = {
            code: codigo,
            localization: localizacao,
            battery: bateria,
            status: Number(status)
        }

        const headers = {
            'Authorization': "Bearer " + sessionStorage.getItem('accessToken'),
            }

        console.log(scooter)
      
      api.post("admin/scooter/create", scooter, {headers: headers})
        .then(response => {

          console.log(response)

          const token = sessionStorage.getItem('accessToken')
          if(token){
              toast.success("Cadastro efetuado!")
              setTimeout(() =>
              document.location.href = '/scooters', 3000
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
                <text className = '__title'>Cadastro de patinete</text>
                <div>_____________________</div>
            </div>
            <div className = '__Register'>
                <div>
                    <div style = {{display: "flex", alignItems: "baseline", flexDirection: "column"}}>
                        <div>
                            <text>Código</text>
                        </div>
                        <input type = 'text' placeholder = 'Código' onChange = {(event) => setCodigo(event.target.value)}></input>
                        <div>
                            <text>Localização</text>
                        </div>
                        <input type = 'text' placeholder = 'Localização' onChange = {(event) => setLocalizacao(event.target.value)}></input>
                        <div>
                            <text>Bateria</text>
                        </div>
                        <input type = 'text' placeholder = 'Bateria' onChange = {(event) => setBateria(event.target.value)}></input>
                        <div>
                            <text>Status</text>
                        </div>
                        <input type = 'text' placeholder = 'Status' onChange = {(event) => setStatus(event.target.value)}></input>
                    </div>
                </div>
                <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button type = 'submit' onClick = {CreateScooter} style = {{display: 'flex', justifyContent: "center", alignItems: "center", width: "100%"}}>Cadastrar</button>
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
