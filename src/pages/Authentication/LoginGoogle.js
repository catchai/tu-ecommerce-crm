import React, { Component  } from 'react';

import * as firebase from "firebase/app";
import google from '../../assets/images/google-logo.png';

export default class LoginGoogle extends Component {

  constructor(props){
      super(props);

      this.state = {
          logued: '----',
          autorizado: false,
          message: ''
        }

      this.loginAuthGoogle = this.loginAuthGoogle.bind(this);
      this.peticionGet = this.peticionGet.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);

  }
  componentDidMount() {
    // firebase.auth().onAuthStateChanged(userAuth => {
    //   this.setState({ user: userAuth});
    // });
     this.peticionGet();
   }

  peticionGet(){

    const user = firebase.auth().currentUser;
    console.log(JSON.stringify(user));
    if(user != null){
      this.setState({logued: 'logued!!!'});
    }else{
      this.setState({logued: 'NO logued!!!'});
    }

  }


  loginAuthGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
     firebase.auth().signInWithPopup(provider).then(result=>{
       console.log(JSON.stringify(result));
       this.setState({logued: 'logued!!!'});
       // existe
       this.login();

     })

  }

  login(){

    var user = firebase.auth().currentUser;
    if(user){
      let  pedidosRef = firebase.database().ref(`Empresas/PollosKing/Users/${user.uid}/info`);
        pedidosRef.once("value", (currentuser) => {
        if (currentuser.val() !== null) {

            if(currentuser.child("rolUser").val() === 'Owner') {
              this.setState({ ...this.state.info, info: currentuser.val() });
              console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',currentuser.val());
              this.setState({ autorizado: true});
            }
        }
      });
    }

    if(this.state.autorizado === false)
    {
        this.logout();
        this.setState({message: 'Usted no se encuentra autorizado'});
    }
  }

  logout(){
        firebase.auth().signOut().then(() => {
      // Sign-out successful.
         // window.location.assign('https://accounts.google.com/logout');
         console.log('sign-out','satisfactorio');
         this.setState({redirect: '/'});
       }).catch((error) => {
      // An error happened.
         console.log('Ocurrio un error el realizar signOut');
       });
  }

  signup(uid,email,photoURL,displayName){  
             firebase.database().ref(`Empresas/PollosKing/Users/${uid}/info`)
               .set({
                 uid: uid,
                 email: email,
                 displayName: displayName,
                 photoURL: photoURL,
                 address: '',
                 phone: '',
         })
         .catch(function(error) {
           console.log(error.message);
         });

  }


  render(){

      return(
        <div className="flex center">
          {this.state.message}
          <button type="submit"  onClick={this.loginAuthGoogle}  className="btn-second btn-google full-width flex">
            <img src={google} alt="logo" />Inicia con Google</button>
        </div>
      );
  }
}
