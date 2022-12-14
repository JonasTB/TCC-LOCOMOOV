import React, { useState } from "react";

import useTable from "../useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AiFillDelete, AiOutlineSearch } from 'react-icons/ai';
import api from '../../services/api'
import {
  Modal
} from "react-bootstrap";

function Deletar(el) {

  const headers = {
    'Authorization': "Bearer " + sessionStorage.getItem('accessToken'),
  }

  let id = el._id

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

const Table = ({ data, rowsPerPage }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Código</th>
            <th className={styles.tableHeader}>Localização</th>
            <th className={styles.tableHeader}>Bateria</th>
            <th className={styles.tableHeader}>Status</th>
            {/* <th className={styles.tableHeader}>Tipo de Usuário</th> */}
            <th className={styles.tableHeader}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.code}</td>
              <td className={styles.tableCell}>{el.localization}</td>
              <td className={styles.tableCell}>{el.battery}</td>
              <td className={styles.tableCell}>{el.status}</td>
              <td>
                <Button style={{ margin: 5, display: "flex", justifyContent: "center", alignItems: "center" }} variant="danger" onClick={handleShow}> <AiFillDelete></AiFillDelete> </Button>
              </td>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Deletar patinete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
                    <div>
                      <text>Você quer mesmo deletar esse patinete?</text>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={(e) => Deletar(el, e)}>
                    Deletar patinete
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* <td className={styles.tableCell}>{el.cpfUser}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};

export default Table;
