import React, { Component, lazy } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CInput,
  CLabel,
  CSelect
}from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { API_URL } from 'src/constans';
import customStyles from 'src/styles/stylesTable';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'


class StatusPasien extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          data:[],
        };
    }

    componentDidMount(){
     this.getPasien()
    }

    getPasien = async() => {
      try {
          await axios.get(`${API_URL}` + 'minum/index')
          .then(res => {
            this.setState({data :  res.data.data})
          })
      } catch (error) {
          console.log(error);
      }
    }
    
    render() {

        const Columns = [
            {
              name : "No",
              cell : row => row.id !== null ? row.id : '-',
              sortable : false,
              maxWidth: "12px"
            },
            {
              name : "Nama",
              cell : row => row.pasien.nama !== null ? row.pasien.nama  : '-', 
              sortable : false,  
            },
            {
              name : "No.Handphone",
              cell : row => row.pasien.notelppasien !== null ? row.pasien.notelppasien : '-', 
              sortable : false,  
            },
            {
              name : "Keterangan",
              cell : row => row.keterangan !== null ? row.keterangan : '-', 
              sortable : false,
            },   
        ]

        return (
            <>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                        <CRow className="p-2">
                            <CCol sm="12">
                                <h4 className="card-title mb-0">Daftar Status Minum Obat Pasien</h4>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <DataTable
                            columns={Columns}
                            data={this.state.data}
                            noHeader={true} 
                            highlightOnHover
                            customStyles={customStyles}
                        />
        
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>

            </>
        );
    }
}
export default StatusPasien;
