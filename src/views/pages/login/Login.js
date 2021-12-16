import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ImageLogin from '../../../assets/tbc-c-logo.png'




const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

const Login = () => {
  const username = useFormInput('');
  const password = useFormInput('');
  const reset = useFormInput('');
  const [errMessage, setErrMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleLogin = async (event) => {
    setLoader(true)
    event.preventDefault();
  
    // var requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: 'email=' + username.value + '&password=' + password.value
    // }
  
    // const api = await fetch(`http://45.13.132.252:3000/api/ethos/login`, requestOptions)
    // const res = await api.json();
    // console.log(res)
    
    if (username.value === "puskesmas" && password.value === "puskesmas") {
      sessionStorage.setItem('auth','puskesmas baleendah')
      setLoader(false)
      setRedirect(true)
      setOpen(false);
    }else{
      setLoader(false)
      alert('Username Atau Password Yang Anda Masukkan Tidak Sesuai!')
      setOpen(true);
    }
  }

  if ( redirect === true ) {
    return window.location.reload()
  } else if( sessionStorage.getItem('auth') !== null ) {
    return (<Redirect exact from="/login" to="/pasien" />)
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{backgroundColor:'#EBFCF7'}}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6" className="mt-2">
            <div>
              <CForm onSubmit={ handleLogin } >
                <CCol md="11">
                  <h1 className="font-weight-bold mb-5" style={{color:'#038283'}}> TBC COUNTER</h1>
                  <h2 className="mb-5">Selamat Datang di TBC Counter</h2>
                  <CLabel className="mt-4 text-lg">Username</CLabel>
                  <CInput placeholder='Username' size="lg" type="text" {...username} className="mt-2"></CInput>
                  <CLabel className="mt-2 text-lg">Kata Sandi</CLabel>
                  <CInput placeholder='Kata Sandi' size="lg" type="password" className="mt-2 text-lg" {...password} ></CInput>
                  <CButton type="submit" block style={{marginTop:'20%' , backgroundColor:'#038283'}} className="p-3 text-white"> {loader === true ? <CSpinner size="sm"/> : 'Masuk'}</CButton>
                </CCol>
              </CForm>
            </div>
          </CCol>
          <CCol md="6">
            <img src={ImageLogin} style={{width: '100%'}} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
