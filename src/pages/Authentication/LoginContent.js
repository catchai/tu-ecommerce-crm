import React, { Component } from 'react';
import * as firebase from "firebase";
import Login from './Login';
import Home from '../Home';

class LoginContent extends Component {


  constructor(props){

      super(props);

      this.state = {
        user: null
      }
      this.login = this.login.bind(this)
      this.logout = this.logout.bind(this)
  }

  login() {
     let provider = new firebase.auth.GoogleAuthProvider();
     if(provider !== null) {
     firebase.auth().signInWithPopup(provider).then((result) => {

       this.setState({
           user: result.user
       })


     })
     }
   }

   componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user})
      }
    })
  }

   logout() {
       firebase.auth().signOut().then((result) => {
         this.setState({
           user: null
         })
       })
     }


    render() {

        let authButton = this.state.user ?
      '' :
      <Login />

        let uploader = this.state.user ?
        <Home/> :
        <h1> </h1>

        return (
                  <div>
                    {authButton}
                    {uploader}
                  </div>
      );}
}

export default LoginContent;
