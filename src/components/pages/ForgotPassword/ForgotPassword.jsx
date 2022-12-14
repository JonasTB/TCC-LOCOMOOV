import React, { useState, useEffect } from 'react';
import '../../../assets/css/Global.scss';
import HeaderNavigator from '../HeaderNavigator/HeaderNavigator.jsx';
import api from '../../../services/api.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export default function ForgotPassword() {
  const [password, setPassword] = useState(0);
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const search = useLocation().search;

  useEffect(() => {
    const user_token = new URLSearchParams(search).get('token');
    setToken(user_token);

    const user_id = new URLSearchParams(search).get('id');
    setId(user_id);
    // console.log('Token e id', token);
  }, [id, token]);

  function ResetPassword(event) {
    event.preventDefault();

    let new_password = {
      password: password,
      id: id,
      token: token,
    };

    const headers = {
      Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
    };

    api
      .put('/auth/reset_password', new_password, { headers: headers })
      .then((response) => {
        console.log(response);

        toast.success('Senha modificada!');
        setTimeout(() => (document.location.href = '/'), 3000);
      })
      .catch((err) => {
        toast.error('Ocorreu algum erro!');
        console.log(err);
      });
  }

  return (
    <div className="__backgroundLogin">
      <div>
        <HeaderNavigator></HeaderNavigator>
      </div>
      <div className="__areaRegister">
        <div className="__divTitle">
          <text className="__title">Resetar senha</text>
          <div>_____________________</div>
        </div>
        <div className="__Register">
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                flexDirection: 'column',
              }}
            >
              <div style={{ marginTop: '30px' }}>
                <text>Nova senha</text>
              </div>
              <input
                type="password"
                placeholder="Nova senha"
                onChange={(event) => setPassword(event.target.value)}
                style={{ height: '50%' }}
              ></input>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              type="submit"
              onClick={ResetPassword}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              Enviar
            </button>
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
  );
}
