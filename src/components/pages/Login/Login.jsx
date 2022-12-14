import React, { useState } from 'react';
import '../../../assets/css/Global.scss';
import HeaderNavigator from '../HeaderNavigator/HeaderNavigator.jsx';
import api from '../../../services/api.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../../assets/images/logo.png';
import { FaStream } from 'react-icons/fa';

export default function Login() {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState(0);

  const [show, setShow] = useState(false);
  // const [id, setId] = useState("");
  const [email, setEmail] = useState('');
  // const [token, setToken] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function Login(event) {
    event.preventDefault();

    let user = {
      email: matricula,
      password: password,
    };

    api
      .post(`/auth/login`, user)
      .then((response) => {
        console.log(response);
        response.headers['token-type'] = `Bearer`;
        sessionStorage.setItem('accessToken', response.data.token);
        sessionStorage.setItem('userID', response.data.user._id);
        sessionStorage.setItem('contentType', response.headers['content-type']);
        sessionStorage.setItem('tokenType', response.headers['token-type']);
        sessionStorage.setItem('name', response.data.user.name);
        sessionStorage.setItem('type', response.data.typeUser);

        const token = sessionStorage.getItem('accessToken');
        if (token) {
          toast.success('Login efetuado!');
          setTimeout(() => (document.location.href = '/users'), 3000);
        }
      })
      .catch((err) => {
        toast.error('Ocorreu algum erro!');
        console.log(err);
      });
  }

  function ForgotPassword(event) {
    event.preventDefault();

    let user = {
      email: email,
    };

    api
      .post(`/auth/forgot_password`, user)
      .then((response) => {
        console.log(response);
        response.headers['token-type'] = `Bearer`;
        sessionStorage.setItem('accessToken', response.data.token);
        sessionStorage.setItem('contentType', response.headers['content-type']);
        sessionStorage.setItem('tokenType', response.headers['token-type']);

        const token = sessionStorage.getItem('accessToken');
        if (token) {
          toast.success('Um email foi enviado ao email informado!');
        }
      })
      .catch((err) => {
        toast.error('Ocorreu algum erro!');
        console.log(err);
      });
  }

  return (
    <div className="__backgroundLogin">
      <div>{/* <HeaderNavigator></HeaderNavigator> */}</div>
      <div className="__areaLogin">
        <div className="__divTitle">
          <img src={Logo} className="__imgHeader"></img>
        </div>
        <div
          className="onda"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: '5px',
          }}
        >
          <FaStream size={20}></FaStream>
          <div
            style={{
              fontSize: '40px',
              fontWeight: 'bold',
              marginBottom: '30px',
              letterSpacing: 5,
              display: 'flex',
            }}
          >
            <label className="labelOnda">L</label>
            <label className="labelOnda">O</label>
            <label className="labelOnda">C</label>
            <label className="labelOnda">O</label>
            <label className="labelOnda">M</label>
            <label className="labelOnda">O</label>
            <label className="labelOnda">O</label>
            <label className="labelOnda">V</label>
          </div>
        </div>
        <div className="__Login">
          <div>
            <text>Matrícula</text>
          </div>
          <input
            type="text"
            placeholder="Matrícula"
            onChange={(event) => setMatricula(event.target.value)}
          ></input>
          <div>
            <text>Senha</text>
          </div>
          <input
            type="password"
            placeholder="Senha"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <div>
            <a
              onClick={handleShow}
              style={{ textDecoration: 'underline', color: '#6da0eb' }}
            >
              Esqueci minha senha
            </a>
          </div>
          <button type="submit" onClick={Login}>
            Acessar
          </button>
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
            <div>
              <text>Email</text>
            </div>
            <input
              type="text"
              placeholder="Informe seu email"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={ForgotPassword}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
