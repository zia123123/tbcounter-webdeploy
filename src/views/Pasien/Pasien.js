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


class Pasien extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          data:[],
          collapse : false,
          collapseEdit : false,
          collapseDelete: false,
          nama:'',
          alamat:'',
          noktp:'',
          jeniskelamin:'',
          status:false,
          notelppasien:'',
          notelppmo:'',
          pekerjaan:'',
          jumlahhari:0,
          jumlahobat:0,
          jumlahPasien:0,
          jumlahMinumObat:0,
          id:null,
          date : new Date(),
          dateNoww : '',
        };
    }
    toggleCollapse = () => this.setState({collapse : !this.state.collapse})
    toggleCollapseEdit = () => this.setState({collapseEdit : !this.state.collapseEdit})
    toggleCollapseDelete = () => this.setState({collapseDelete : !this.state.collapseDelete})

    componentDidMount(){
     this.getPasien()
     this.getJumlahPasien()
     this.getJumlahMinumObat()
     var monthNames = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
     ];
      var day = ("0" + this.state.date.getDate()).slice(-2);
      var month = ("0" + (this.state.date.getMonth())).slice(-2);
      var dateNow = [ day,monthNames[month],this.state.date.getFullYear()].join(" ")
      this.setState({
        dateNoww : dateNow,
      })
    }

    getPasien = async() => {
      try {
          await axios.get(`${API_URL}` + 'pasien')
          .then(res => {
            this.setState({data :  res.data.data})
          })
      } catch (error) {
          console.log(error);
      }
    }
    getJumlahPasien = async() => {
      try {
          await axios.get(`${API_URL}` + 'pasien/jumlah')
          .then(res => {
            this.setState({jumlahPasien :  res.data.data})
          })
      } catch (error) {
          console.log(error);
      }
    }
    getJumlahMinumObat = async() => {
      try {
          await axios.get(`${API_URL}` + 'pasien/jumlahminum')
          .then(res => {
            this.setState({jumlahMinumObat :  res.data.data})
          })
      } catch (error) {
          console.log(error);
      }
    }

    storePasien = async() =>{
      try {
        
        await axios({
            method :"POST",
            url : `${API_URL}` + 'pasien/create',
            data :{
                nama: this.state.nama,
                alamat: this.state.alamat,
                noktp: this.state.noktp,
                jeniskelamin: this.state.jeniskelamin,
                status: this.state.status,
                notelppasien: this.state.notelppasien,
                notelppmo: this.state.notelppmo,
                pekerjaan: this.state.pekerjaan,
                jumlahhari: this.state.jumlahhari,
                jumlahobat: this.state.jumlahobat,
            }
        })
        .then(res => {
            if (res.status == 200) {
                alert( "Tambah Data Pasien" +  " Berhasil!")
                this.getPasien()
                this.toggleCollapse()
            }
        })
      } catch (error) {
          alert("Something Went Wrong!")
          console.log(error);
      }
    }

    showEdit = (id, nama,alamat, noktp,jeniskelamin,status,notelppasien,notelppmo,pekerjaan,jumlahhari,jumlahobat) => {
      this.setState({
          id : id, 
          nama : nama,
          alamat : alamat,
          noktp : noktp,
          jeniskelamin : jeniskelamin,
          status : status,
          notelppasien : notelppasien,
          notelppmo : notelppmo,
          pekerjaan : pekerjaan,
          jumlahhari : jumlahhari,
          jumlahobat : jumlahobat
      })
      this.toggleCollapseEdit()
    }

    editPasien = async() => {
      try {
          await axios({
              method : "PATCH",
              url : `${API_URL}` + 'pasien/update/' + this.state.id,
              data :{
                nama: this.state.nama,
                alamat: this.state.alamat,
                noktp: this.state.noktp,
                jeniskelamin: this.state.jeniskelamin,
                status: this.state.status,
                notelppasien: this.state.notelppasien,
                notelppmo: this.state.notelppmo,
                pekerjaan: this.state.pekerjaan,
                jumlahhari: this.state.jumlahhari,
                jumlahobat: this.state.jumlahobat,
              }
          })
          .then(res => {
              if (res.status == 200) {
                  alert( "Edit" +  " Pasien Berhasil!")
                  this.toggleCollapseEdit()
                  this.getPasien()
              }
          })
      } catch (error) {
          alert("Something Went Wrong!")
          console.log(error);
      }
    }

    showDelete = (id, nama) => {
      this.setState({id : id, nama : nama})
      this.toggleCollapseDelete()
    }

    deletePasien = async() => {
        try {
            await axios.patch(`${API_URL}` + "pasien/delete/" + this.state.id)
            .then(res => {
                alert("Pasien atas nama " + this.state.nama + " berhasil di hapus!")
                this.toggleCollapseDelete()
                this.getPasien()
            })
        } catch (error) {
            alert("Something Went Wrong!")
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
              cell : row => row.nama !== null ? row.nama : '-', 
              sortable : false,  
            },
            {
              name : "No.Handphone",
              cell : row => row.notelppasien !== null ? row.notelppasien : '-', 
              sortable : false,  
            },
            {
              name : "Status",
              cell : row => (
                <CRow>
                    <span className={row.status === false ? "text-danger font-weight-bold" : "text-success font-weight-bold"}>{row.status === false ? "Tidak Aktif" : "Aktif" }</span>
                </CRow>
              ),
              sortable : false,
            },
            {
              name : "Action",
              cell : row => (
                <CRow>
                   <CCol xs={12} sm={12}>
                     <CButton color="warning" className="text-white" onClick={() => this.showEdit(row.id, row.nama, row.alamat, row.noktp, row.jeniskelamin, row.status, row.notelppasien, row.notelppmo, row.pekerjaan, row.jumlahhari, row.jumlahobat)}><CIcon name="cil-pencil"/></CButton>
                   </CCol>
                </CRow>
              ),
              sortable : false,
            },
            
        ]


        return (
            <>
              <CCard>
                <CCardBody>
                  <CRow>
                    <CCol sm="5">
                      <h4 id="traffic" className="card-title mb-0">Puskesmas Baleendah</h4>
                      <div className="">{this.state.dateNoww}</div>
                    </CCol>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CRow className="text-center">
                  <CCol xs="12" lg="6" sm="6">
                    <CCard style={{backgroundColor:'#038283'}}>
                    <CCardBody>
                      <CRow className="text-white">
                        <CCol xs="5">
                          <CIcon name="cil-disabled" size={'6xl'}/>
                        </CCol>
                        <CCol xs="7" className="text-left">
                          <h4 className="card-title mb-4">Data Sakit</h4>
                          <h5 className="card-title ">{this.state.jumlahPasien} Pasien</h5>
                        </CCol>
                      </CRow>
                    </CCardBody>
                    </CCard>
                  </CCol>
                  <CCol xs="12" lg="6" sm="6">
                    <CCard style={{backgroundColor:'#038283'}}>
                      <CCardBody>
                        <CRow className="text-white">
                          <CCol xs="5">
                            <CIcon name="cil-hospital" size={'6xl'}/>
                          </CCol>
                          <CCol xs="7" className="text-left">
                            <h4 className="card-title mb-4">Konfirmasi Minum Obat</h4>
                            <h5 className="card-title ">{this.state.jumlahMinumObat} / {this.state.jumlahPasien} Pasien</h5>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
                </CCardFooter>
              </CCard>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                        <CRow className="p-2">
                            <CCol sm="6">
                                <h4 className="card-title mb-0">Daftar Pasien</h4>
                            </CCol>
                            <CCol sm="6" className="text-right">  
                                <CButton style={{backgroundColor:'#038283'}} className="text-white" onClick={() => this.toggleCollapse()}><CIcon name="cil-user-plus"/> Tambah Pasien</CButton>
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
              <Modal isOpen={this.state.collapse} toggle={() => this.toggleCollapse()} className="modal-lg">
                <ModalHeader toggle={() => this.toggleCollapse()} style={{backgroundColor:'#038283'}} className="text-white">
                <CIcon name="cil-user-plus"/>  Tambah Pasien 
                </ModalHeader>
                <ModalBody>
                    <CRow>
                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Nama Lengkap</CLabel>
                      <CInput type="text" placeholder="Masukkan Nama Lengkap Pasien" onChange={e => this.setState({nama : e.target.value})}></CInput>
                      <CLabel className="font-weight-bold mt-2">Nomor KTP</CLabel>
                      <CInput type="number" placeholder="Masukkan Nomor KTP" onChange={e => this.setState({noktp : e.target.value})}></CInput>
                      <CLabel className="font-weight-bold mt-2">Nomor Telepon Pasien </CLabel>
                      <CInput type="phone" placeholder="Masukkan Nomor Telepon Pasien" onChange={e => this.setState({notelppasien : e.target.value})}></CInput>
                      <CLabel className="font-weight-bold mt-2">Pekerjaan</CLabel>
                      <CInput type="text" placeholder="Masukkan Pekerjaan Pasien" onChange={e => this.setState({pekerjaan : e.target.value})}></CInput>
                      <CLabel className="font-weight-bold mt-2">Jumlah Hari</CLabel>
                      <CInput type="number" placeholder="Masukkan Jumlah Hari" onChange={e => this.setState({jumlahhari : e.target.value})}></CInput>
                      </CCol>

                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Alamat</CLabel>
                      <CInput type="text" placeholder="Masukkan Alamat Pasien" onChange={e => this.setState({alamat : e.target.value})}></CInput>
                      <CLabel className="font-weight-bold mt-2">Jenis Kelamin</CLabel>
                      <CSelect onChange={e => this.setState({jeniskelamin : e.target.value})}>
                        <option>Pilih Jenis Kelamin</option>
                        <option value="L">Laki-Laki</option>
                        <option value="P">Perempuan</option>
                      </CSelect>
                      <CLabel className="font-weight-bold mt-2">Nomor Telepon PMO </CLabel>
                      <CInput type="phone" placeholder="Masukkan Nomor Telepon PMO" onChange={e => this.setState({notelppmo : e.target.value})}></CInput>
                      <CLabel className="font-weight-bold mt-2" >Status</CLabel>
                      <CSelect onChange={e => this.setState({status : e.target.value})}>
                        <option>Pilih Status</option>
                        <option value={true}>Aktif</option>
                        <option value={false}>Tidak Aktif</option>
                      </CSelect>
                      <CLabel className="font-weight-bold mt-2">Jumlah Obat</CLabel>
                      <CInput type="number" placeholder="Masukkan Jumlah Obat" onChange={e => this.setState({jumlahobat : e.target.value})}></CInput>
                      </CCol>
                    </CRow>
                                    
                </ModalBody>
                <ModalFooter className="border-0">
                    <CButton 
                    style={{backgroundColor:'#038283', width:'100%'}}
                    onClick= {() => this.storePasien()}
                    className="text-white"
                    >Simpan</CButton>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.collapseEdit} toggle={() => this.toggleCollapseEdit()} className="modal-lg">
                <ModalHeader toggle={() => this.toggleCollapseEdit()} style={{backgroundColor:'#038283'}} className="text-white">
                <CIcon name="cil-pencil"/>  Edit Pasien 
                </ModalHeader>
                <ModalBody>
                    <CRow>
                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Nama Lengkap</CLabel>
                      <CInput type="text" placeholder="Masukkan Nama Lengkap Pasien" onChange={e => this.setState({nama : e.target.value})} value = {this.state.nama} ></CInput>
                      <CLabel className="font-weight-bold mt-2">Nomor KTP</CLabel>
                      <CInput type="number" placeholder="Masukkan Nomor KTP" onChange={e => this.setState({noktp : e.target.value})} value = {this.state.noktp} ></CInput>
                      <CLabel className="font-weight-bold mt-2">Nomor Telepon Pasien </CLabel>
                      <CInput type="phone" placeholder="Masukkan Nomor Telepon Pasien" onChange={e => this.setState({notelppasien : e.target.value})} value = {this.state.notelppasien} ></CInput>
                      <CLabel className="font-weight-bold mt-2">Pekerjaan</CLabel>
                      <CInput type="text" placeholder="Masukkan Pekerjaan Pasien" onChange={e => this.setState({pekerjaan : e.target.value})} value = {this.state.pekerjaan} ></CInput>
                      <CLabel className="font-weight-bold mt-2">Jumlah Hari</CLabel>
                      <CInput type="number" placeholder="Masukkan Jumlah Hari" onChange={e => this.setState({jumlahhari : e.target.value})} value = {this.state.jumlahhari} ></CInput>
                      </CCol>

                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Alamat</CLabel>
                      <CInput type="text" placeholder="Masukkan Alamat Pasien" onChange={e => this.setState({alamat : e.target.value})} value = {this.state.alamat} ></CInput>
                      <CLabel className="font-weight-bold mt-2">Jenis Kelamin</CLabel>
                      <CSelect onChange={e => this.setState({jeniskelamin : e.target.value})} value = {this.state.jeniskelamin}>
                        <option>Pilih Jenis Kelamin</option>
                        <option value="L">Laki-Laki</option>
                        <option value="P">Perempuan</option>
                      </CSelect>
                      <CLabel className="font-weight-bold mt-2">Nomor Telepon PMO </CLabel>
                      <CInput type="phone" placeholder="Masukkan Nomor Telepon PMO" onChange={e => this.setState({notelppmo : e.target.value})} value = {this.state.notelppmo} ></CInput>
                      <CLabel className="font-weight-bold mt-2" >Status</CLabel>
                      <CSelect onChange={e => this.setState({status : e.target.value})} value = {this.state.status} >
                        <option>Pilih Status</option>
                        <option value={true}>Aktif</option>
                        <option value={false}>Tidak Aktif</option>
                      </CSelect>
                      <CLabel className="font-weight-bold mt-2">Jumlah Obat</CLabel>
                      <CInput type="number" placeholder="Masukkan Jumlah Obat" onChange={e => this.setState({jumlahobat : e.target.value})} value = {this.state.jumlahobat} ></CInput>
                      </CCol>
                    </CRow>
                                    
                </ModalBody>
                <ModalFooter className="border-0">
                    <CButton 
                    style={{backgroundColor:'#038283', width:'100%'}}
                    onClick= {() => this.editPasien()}
                    className="text-white"
                    >Simpan</CButton>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.collapseDelete} toggle={() => this.toggleCollapseDelete()} className="modal-md">
                <ModalHeader toggle={() => this.toggleCollapseDelete()} style={{backgroundColor:'#038283'}} className="text-white">
                <CIcon name="cil-trash"/>  Delete Pasien 
                </ModalHeader>
                <ModalBody>
                    <CRow>
                      <CCol xs={12} sm={12} md={12}>
                        <h5>Apakah anda yakin akan menghapus data pasien atas nama {this.state.nama} ?</h5>
                      </CCol>
                    </CRow>
                      
                                    
                </ModalBody>
                <ModalFooter className="border-0">
                    <CButton 
                    style={{ width:'100%'}}
                    color="danger"
                    onClick= {() => this.deletePasien()}
                    className="text-white"
                    >Delete</CButton>
                </ModalFooter>
              </Modal>

            </>
        );
    }
}
export default Pasien;
