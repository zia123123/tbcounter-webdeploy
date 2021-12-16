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


class Artikel extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          data:[],
          collapse : false,
          collapseEdit : false,
          collapseDelete: false,
          id:null,
          judul:'',
          pembuat:'',
          content:'',
        };
    }
    toggleCollapse = () => this.setState({collapse : !this.state.collapse})
    toggleCollapseEdit = () => this.setState({collapseEdit : !this.state.collapseEdit})
    toggleCollapseDelete = () => this.setState({collapseDelete : !this.state.collapseDelete})

    componentDidMount(){
     this.getFeed()
    }

    getFeed = async() => {
      try {
          await axios.get(`${API_URL}` + 'feed')
          .then(res => {
            this.setState({data :  res.data.data})
          })
      } catch (error) {
          console.log(error);
      }
    }

    storeArtikel = async() =>{
      try {
        if (this.state.judul !== null && this.state.pembuat !== null && this.state.content !== null ) {

            await axios({
                method :"POST",
                url : `${API_URL}` + 'feed/create',
                data : {
                    judul: this.state.judul,
                    pembuat: this.state.pembuat,
                    content: this.state.content,
                },
            })
            .then(res => {
                if (res.status == 200) {
                    alert( "Tambah Data Artikel" +  " Berhasil!")
                    this.getFeed()
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

    showEdit = (id, judul,content, pembuat) => {
      this.setState({
          id : id, 
          judul : judul,
          content : content,
          pembuat : pembuat,
      })
      this.toggleCollapseEdit()
    }

    editArtikel = async() => {
        if (this.state.pembuat !== null && this.state.judul !== null && this.state.content !== null ) {

            await axios({
                method :"PATCH",
                url : `${API_URL}` + 'feed/update/' + this.state.id,
                data : {
                    judul: this.state.judul,
                    pembuat: this.state.pembuat,
                    content: this.state.content,
                },
            })
            .then(res => {
                if (res.status == 200) {
                    alert( "Edit" +  " Artikel Berhasil!")
                    this.toggleCollapseEdit()
                    this.getFeed()
                }
            })
            .catch(error => alert(error));
        }else{
            alert("Harap isi semua data")
        }
    }

    showDelete = (id, judul) => {
      this.setState({id : id, judul : judul})
      this.toggleCollapseDelete()
    }

    deleteArtikel = async() => {
        try {
            await axios.delete(`${API_URL}` + "feed/delete/" + this.state.id)
            .then(res => {
                alert("Artikel dengan judul " + this.state.judul + " berhasil di hapus!")
                this.toggleCollapseDelete()
                this.getFeed()
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
              name : "Judul",
              cell : row => row.judul !== null ? row.judul : '-', 
              sortable : false,  
            },
            {
                name : "Pembuat",
                cell : row => row.pembuat !== null ? row.pembuat : '-', 
                sortable : false,  
            },
            {
              name : "Content",
              cell : row => row.content !== null ? row.content.substr(0,80) + '...' : '-', 
              sortable : false,  
            },
            {
              name : "Action",
              cell : row => (
                <CRow>
                   <CCol xs={12} sm={12}>
                     <CButton color="warning" className="text-white" onClick={() => this.showEdit(row.id, row.judul, row.pembuat, row.content)}><CIcon name="cil-pencil"/></CButton>
                     <CButton color="danger" className="text-white ml-2" onClick={() => this.showDelete(row.id, row.judul)}><CIcon name="cil-trash"/></CButton>
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
                                <h4 className="card-title mb-0">Daftar Artikel</h4>
                            </CCol>
                            <CCol sm="6" className="text-right">  
                                <CButton style={{backgroundColor:'#038283'}} className="text-white" onClick={() => this.toggleCollapse()}><CIcon name="cil-user-plus"/> Tambah Artikel</CButton>
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
                <CIcon name="cil-user-plus"/>  Tambah Artikel 
                </ModalHeader>
                <ModalBody>
                    <CRow>
                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Judul</CLabel>
                      <CInput type="text" placeholder="Masukkan Judul Berita" onChange={e => this.setState({judul : e.target.value})}></CInput>
                      <CLabel className="font-weight-bold mt-2">Pembuat</CLabel>
                      <CInput type="text" placeholder="Masukkan Pembuat Artikel" onChange={e => this.setState({pembuat : e.target.value})}></CInput>
                      </CCol>

                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Content</CLabel>
                      <CTextarea placeholder="Masukkan Content Artikel" onChange={e => this.setState({content : e.target.value})} rows="5"></CTextarea>
                      </CCol>
                    </CRow>         
                </ModalBody>
                <ModalFooter className="border-0">
                    <CButton 
                    style={{backgroundColor:'#038283', width:'100%'}}
                    onClick= {() => this.storeArtikel()}
                    className="text-white"
                    >Simpan</CButton>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.collapseEdit} toggle={() => this.toggleCollapseEdit()} className="modal-lg">
                <ModalHeader toggle={() => this.toggleCollapseEdit()} style={{backgroundColor:'#038283'}} className="text-white">
                <CIcon name="cil-pencil"/>  Edit Artikel 
                </ModalHeader>
                <ModalBody>
                <CRow>
                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Judul</CLabel>
                      <CInput type="text" placeholder="Masukkan Judul Berita" onChange={e => this.setState({judul : e.target.value})} value={this.state.judul}></CInput>
                      <CLabel className="font-weight-bold mt-2">Pembuat</CLabel>
                      <CInput type="text" placeholder="Masukkan Pembuat Artikel" onChange={e => this.setState({pembuat : e.target.value})} value={this.state.pembuat}></CInput>
                      </CCol>

                      <CCol xs={12} sm={6} md={6}>
                      <CLabel className="font-weight-bold mt-2">Deskripsi</CLabel>
                      <CTextarea placeholder="Masukkan Content Artikel" onChange={e => this.setState({content : e.target.value})} rows="5" value={this.state.content}></CTextarea>
                      </CCol>
                    </CRow>            
                </ModalBody>
                <ModalFooter className="border-0">
                    <CButton 
                    style={{backgroundColor:'#038283', width:'100%'}}
                    onClick= {() => this.editArtikel()}
                    className="text-white"
                    >Simpan</CButton>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.collapseDelete} toggle={() => this.toggleCollapseDelete()} className="modal-md">
                <ModalHeader toggle={() => this.toggleCollapseDelete()} style={{backgroundColor:'#038283'}} className="text-white">
                <CIcon name="cil-trash"/>  Delete Artikel 
                </ModalHeader>
                <ModalBody>
                    <CRow>
                      <CCol xs={12} sm={12} md={12}>
                        <h6>Apakah anda yakin akan menghapus Artikel dengan judul {this.state.judul} ?</h6>
                      </CCol>
                    </CRow>
                      
                                    
                </ModalBody>
                <ModalFooter className="border-0">
                    <CButton 
                    style={{ width:'100%'}}
                    color="danger"
                    onClick= {() => this.deleteArtikel()}
                    className="text-white"
                    >Delete</CButton>
                </ModalFooter>
              </Modal>

            </>
        );
    }
}
export default Artikel;
