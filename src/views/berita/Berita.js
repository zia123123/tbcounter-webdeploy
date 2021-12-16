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
  CSelect,
  CTextarea,
  CImg
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


class Berita extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          data:[],
          collapse : false,
          collapseEdit : false,
          collapseDelete: false,
          id:null,
          judul:'',
          deskripsi:'',
          getPhoto:'',
          photo:null,
        };
    }
    toggleCollapse = () => this.setState({collapse : !this.state.collapse})
    toggleCollapseEdit = () => this.setState({collapseEdit : !this.state.collapseEdit})
    toggleCollapseDelete = () => this.setState({collapseDelete : !this.state.collapseDelete})

    componentDidMount(){
     this.getBerita()
    }

    onImageChange = event => {
        this.setState({ 
            photo: event.target.files[0],
            getPhoto: URL.createObjectURL(event.target.files[0])
        });
    }

    getBerita = async() => {
      try {
          await axios.get(`${API_URL}` + 'berita')
          .then(res => {
            this.setState({data :  res.data.data})
          })
      } catch (error) {
          console.log(error);
      }
    }

    storeBerita = async() =>{
      try {
        if (this.state.judul !== null && this.state.deskripsi !== null ) {
            let data = new FormData();
            data.set("judul", this.state.judul);
            data.set("deskripsi", this.state.deskripsi);
            data.append("photo", this.state.photo);

            await axios({
                method :"POST",
                url : `${API_URL}` + 'berita/create',
                data : data,
            })
            .then(res => {
                if (res.status == 200) {
                    alert( "Tambah Data Berita" +  " Berhasil!")
                    this.getBerita()
                    this.toggleCollapse()
                }
            })
            .catch(error => alert(error));
        }else{
            alert("Harap isi semua data")
        }
    } catch (error) {
        alert("Something Went Wrong!")
        console.log(error);
    }
    }

    showEdit = (id, judul,deskripsi, photo) => {
      this.setState({
          id : id, 
          judul : judul,
          deskripsi : deskripsi,
          photo : photo,
      })
      this.toggleCollapseEdit()
    }

    editBerita = async() => {
        if (this.state.judul !== null && this.state.deskripsi !== null ) {
            let data = new FormData();
            data.set("judul", this.state.judul);
            data.set("deskripsi", this.state.deskripsi);
            // data.append("photo", this.state.photo);

            await axios({
                method :"PATCH",
                url : `${API_URL}` + 'berita/update/' + this.state.id,
                data : data,
            })
            .then(res => {
                if (res.status == 200) {
                    alert( "Edit" +  " Berita Berhasil!")
                    this.toggleCollapseEdit()
                    this.getBerita()
                }
            })
            .catch(error => alert(error));
        }else{
            alert("Harap isi semua data")
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
              name : "Judul",
              cell : row => row.judul !== null ? row.judul : '-', 
              sortable : false,  
            },
            {
              name : "Deskripsi",
              cell : row => row.deskripsi !== null ? row.deskripsi.substr(0,80) + '...' : '-', 
              sortable : false,  
            },
            {
              name : "Action",
              cell : row => (
                <CRow>
                   <CCol xs={12} sm={12}>
                     <CButton color="warning" className="text-white" onClick={() => this.showEdit(row.id, row.judul, row.deskripsi, row.photo)}><CIcon name="cil-pencil"/></CButton>
                   </CCol>
                </CRow>
              ),
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
                            <CCol sm="6">
                                <h4 className="card-title mb-0">Daftar Berita</h4>
                            </CCol>
                            <CCol sm="6" className="text-right">  
                                <CButton style={{backgroundColor:'#038283'}} className="text-white" onClick={() => this.toggleCollapse()}><CIcon name="cil-user-plus"/> Tambah Berita</CButton>
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
              <Modal isOpen={this.state.collapse} toggle={() => this.toggleCollapse()} className="modal-xl">
                <ModalHeader toggle={() => this.toggleCollapse()} style={{backgroundColor:'#038283'}} className="text-white">
                <CIcon name="cil-user-plus"/>  Tambah Berita 
                </ModalHeader>
                <ModalBody>
                    <CRow>
                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Judul</CLabel>
                      <CInput type="text" placeholder="Masukkan Judul Berita" onChange={e => this.setState({judul : e.target.value})}></CInput>
                      {/* <CLabel className="font-weight-bold mt-4">Gambar</CLabel>
                      <CInput type="file" placeholder="Choose Image" onChange={this.onImageChange} accept="image/png, image/gif, image/jpeg" name="photo"></CInput> */}
                      </CCol>

                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Deskripsi</CLabel>
                      <CTextarea placeholder="Masukkan Deskripsi Berita" onChange={e => this.setState({deskripsi : e.target.value})} rows="5"></CTextarea>
                      </CCol>
                    </CRow>

                    {/* {this.state.getPhoto === null ? '' : 
                        <CRow className="mt-3">
                            <CCol xs={12} sm={12} md={12}>
                                <CImg src={this.state.getPhoto} style={{width:'100%', height:'100%'}}></CImg>
                            </CCol>
                        </CRow>
                    }             */}
                </ModalBody>
                <ModalFooter className="border-0">
                    <CButton 
                    style={{backgroundColor:'#038283', width:'100%'}}
                    onClick= {() => this.storeBerita()}
                    className="text-white"
                    >Simpan</CButton>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.collapseEdit} toggle={() => this.toggleCollapseEdit()} className="modal-lg">
                <ModalHeader toggle={() => this.toggleCollapseEdit()} style={{backgroundColor:'#038283'}} className="text-white">
                <CIcon name="cil-pencil"/>  Edit Berita 
                </ModalHeader>
                <ModalBody>
                <CRow>
                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Judul</CLabel>
                      <CInput type="text" placeholder="Masukkan Judul Berita" onChange={e => this.setState({judul : e.target.value})} value={this.state.judul}></CInput>
                      {/* <CLabel className="font-weight-bold mt-4">Gambar</CLabel>
                      <CInput type="file" placeholder="Choose Image" onChange={this.onImageChange} accept="image/png, image/gif, image/jpeg" name="photo"></CInput> */}
                      </CCol>

                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Deskripsi</CLabel>
                      <CTextarea placeholder="Masukkan Deskripsi Berita" onChange={e => this.setState({deskripsi : e.target.value})} rows="5" value={this.state.deskripsi}></CTextarea>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                        <CCol xs={12} sm={12} md={12}>
                            <CImg src={this.state.getPhoto !== null ? this.state.getPhoto : this.state.photo} style={{width:'100%', height:'100%'}}></CImg>
                        </CCol>
                    </CRow>
                   
                                    
                </ModalBody>
                <ModalFooter className="border-0">
                    <CButton 
                    style={{backgroundColor:'#038283', width:'100%'}}
                    onClick= {() => this.editBerita()}
                    className="text-white"
                    >Simpan</CButton>
                </ModalFooter>
              </Modal>

            </>
        );
    }
}
export default Berita;
