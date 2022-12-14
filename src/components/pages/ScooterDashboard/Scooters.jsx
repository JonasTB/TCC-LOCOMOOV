import React, { useState, useEffect } from 'react'
import "../../../assets/css/Global.scss"
import HeaderNavigator from '../HeaderNavigator/HeaderNavigator.jsx'
import api from '../../../services/api.js'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import styles from "../UserDashboard/App.module.css";
import Table from "../../Table/index2";

export default function Scooters() {

    const [scooters, setScooters] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const headers = {
            'Authorization': "Bearer " + sessionStorage.getItem('accessToken'),
        }

        api.get(`/admin/scooter/find`, { headers: headers })

            .then(res => {

                console.log(res.data)
                setScooters(res.data)

            }).catch(err => {
                console.log(err)
            })

    }, [])

    function Deletar(scooter) {

        const headers = {
            'Authorization': "Bearer " + sessionStorage.getItem('accessToken'),
        }

        let id = scooter._id

        console.log(id)

        api.delete(`/admin/scooter/${id}`, { headers: headers })

            .then(res => {

                toast.success("Patinete deletado!")
                setTimeout(() =>
                    document.location.reload(), 3000
                )

            }).catch(err => {
                console.log('erro', err)
            })
    };

    function updateSearch(event) {
        setSearch(event.target.value.substr(0, 20))
    }

    const searchScooters = scooters.filter(
        (scooter) => {
            if(scooter.status === 1){
                scooter.status = "Disponível"
            }
            if(scooter.status === 2){
                scooter.status = "Carregando"
            }
            if(scooter.status === 3){
                scooter.status = "Defeituoso"
            }
            return (scooter.code).indexOf(search) === 0;
        }
    )

    return (
        <div className='__backgroundUsersList'>
            <div>
                <HeaderNavigator></HeaderNavigator>
            </div>
            <div className='__divTitle'>
                <text className='__title'>Lista de patinetes</text>
                <div>__________________________________________</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: "0px 10px 0px 0px", width: "98%" }}>
                <input type='text' placeholder='Pesquisar usuário' className='inputSearch' onChange={updateSearch} value={search} style={{ marginLeft: "20px" }}></input>
                <div style={{ backgroundColor: "gray", height: "30px", width: "30px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "2px" }}>
                    <AiOutlineSearch></AiOutlineSearch>
                </div>
            </div>
            {/* <div className = '__usersList'>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Localização</th>
                        <th>Bateria</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {searchScooters.map(scooter =>
                        <tr key = {scooter._id}>
                            <td>
                                {scooter.code}
                            </td>
                            <td>
                                {scooter.localization}
                            </td>
                            <td>
                                {scooter.battery}
                            </td>
                            <td>
                                {scooter.status}
                            </td>
                            <td>
                                <Button variant="danger" onClick = {(e) => Deletar(scooter,e)}> <AiFillDelete></AiFillDelete> </Button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div> */}
            <main className={styles.container}>
                <div className={styles.wrapper}>
                    <Table data={searchScooters} rowsPerPage={3} />
                </div>
            </main>
        </div>
    )
}
