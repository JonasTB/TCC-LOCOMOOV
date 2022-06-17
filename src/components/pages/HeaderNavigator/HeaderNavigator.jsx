import React, { useState } from 'react';
import Logo from '../../../assets/images/logo.png';
import '../../../assets/css/Global.scss';
import {
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
  Modal,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../services/api.js';

export default function HeaderNavigator() {
  function Logout() {
    sessionStorage.clear();
    toast.success('Tchau :)!');
    setTimeout(() => (document.location.href = '/'), 3000);
  }

  const [show, setShow] = useState(false);
  // const [id, setId] = useState("");
  const [senha, setSenha] = useState('');
  // const [token, setToken] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function Senha(event) {
    event.preventDefault();

    const headers = {
      Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
    };

    let user = {
      id: sessionStorage.getItem('userID'),
      password: senha,
    };

    console.log(user);

    api
      .put(`/admin/change_password`, user, { headers: headers })
      .then((response) => {
        console.log(response);

        const token = sessionStorage.getItem('accessToken');
        if (token) {
          toast.success('Reset efetuado!');
          setTimeout(() => (document.location.href = '/users'), 3000);
        }
      })
      .catch((err) => {
        toast.error('Ocorreu algum erro!');
        console.log(err);
      });
  }

  return (
    <div className="__header">
      <img src={Logo} className="__imgHeader"></img>
      {/* <span className="__spanHeader">Administrativo</span> */}
      {/* <InputGroup className="mb-3"> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <div
        className="dropdownHeader"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <span className="hello">Olá, {sessionStorage.getItem('name')}</span>
        <DropdownButton
          variant="light"
          title="Adminstrativo"
          id="input-group-dropdown-1"
          // className="__spanHeader"
        >
          <Dropdown.Item href="/createUsers">Criar Usuário</Dropdown.Item>
          <Dropdown.Item href="/users_super">Listar SuperAdmins</Dropdown.Item>
          <Dropdown.Item href="/users_admin">Listar Admins</Dropdown.Item>
          <Dropdown.Item href="/users">Listar Usuários</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/createScooters">Criar Patinetes</Dropdown.Item>
          <Dropdown.Item href="/scooters">Listar Patinetes</Dropdown.Item>
          {/* <Dropdown.Item href="/createUsers">Criar usuário</Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleShow}>Resetar Senha</Dropdown.Item>
          <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
        </DropdownButton>
      </div>
      {/* <FormControl aria-label="Text input with dropdown button" /> */}
      {/* </InputGroup> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resetar senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {/* <div>
              <text>Id</text>
            </div>
            <input
              disabled
              type="text"
              value={sessionStorage.getItem('userID')}
            ></input> */}
            <div>
              <text>Nova senha</text>
            </div>
            <input
              type="text"
              placeholder="Senha"
              onChange={(event) => setSenha(event.target.value)}
            ></input>
            {/* <div>
              <text>Token</text>
            </div>
            <input
              disabled
              type="text"
              value={sessionStorage.getItem('accessToken')}
            ></input> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={Senha}>
            Salvar senha
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
