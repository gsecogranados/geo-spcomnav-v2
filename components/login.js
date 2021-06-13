import React, {useState, useEffect} from 'react';
import {
  Card,
  InputGroupText,
  FormGroup,
  Input,
  Modal,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas);
library.add(fab);

import SignUp from '../components/signup';

import {loginWithGitHub, loginWithGoogle, signInWithEmail} from '../firebase/client'

const Login = ({toggle, modal, setModal, setUser}) => {

  const [modalSignUp, setModalSignUp] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [pass, setPass] = useState(undefined);

  const signGitHub = () => {
    loginWithGitHub().then(user=>{console.log(user)})
    
  }
  const signGoogle = () => {
    loginWithGoogle().then(user=>{
      console.log(user)
      setUser(user)
      setModal(false)
    })
  }

  const signIn = () =>{
    signInWithEmail(email,pass).then((user)=>{
      setUser(user)
      setModal(false);
    })
  }
  
  const createAccount = () =>{
    setModal(!modal);
    setModalSignUp(!modalSignUp);
  }

  return (
    <>
      <Modal zIndex={2000} centered isOpen={modal} toggle={toggle}>
        <div>
          <Card>
            <div className="card-header d-block bg-white pt-4 pb-5">
              <div className="text-muted text-center mb-3">
                <small>Sign in or Sign up with</small>
              </div>
              <div className="text-center">
                <Button className="ml-2" color="danger" onClick={signGoogle} >
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fab', 'google']} />
                  </span>
                  <span className="btn-wrapper--label"> Google</span>
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button color="dark" onClick={signGitHub}>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fab', 'github']} />
                  </span>
                  <span className="btn-wrapper--label"> GitHub</span>
                </Button>
              </div>
            </div>
            <div className="card-body px-lg-5 py-lg-5 bg-white">
              <div className="text-center text-muted mb-4 mt-n2">
                <small>Or sign in with credentials</small>
              </div>              
                <div className="form-group mb-3">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <InputGroupText >&nbsp;
                        <FontAwesomeIcon icon={['fas', 'envelope']} />&nbsp;
                      </InputGroupText>
                    </div>
                    <Input placeholder="Email" type="email" onChange={event => setEmail(event.target.value)} />
                  </div>
                </div>
                <FormGroup>
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <InputGroupText>&nbsp;
                        <FontAwesomeIcon icon={['fas', 'unlock-alt']} />&nbsp;
                      </InputGroupText>
                    </div>
                    <Input placeholder="Password" type="password" onChange={event => setPass(event.target.value)}/>
                  </div>
                </FormGroup>
                <Button className="btn btn-light btn-sm mt-2" onClick={createAccount}>Create Account </Button>
                
                <div className="text-center">
                  <Button color="secondary" className="mt-4 shadow-lg" onClick={signIn}>
                    Sign in
                  </Button>
                </div>
              
            </div>
          </Card>
        </div>
      </Modal>
      {modalSignUp && <SignUp modalSignUp={modalSignUp} setModalSignUp={setModalSignUp} setModalLogin={setModal} setUser={setUser}/>}
    </>
  )
}

export default Login
