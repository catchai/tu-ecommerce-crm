import React, {   Component   } from "react"; 

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import Clientes from './EcommerceCliente';

// comunicarnos con firebase
import * as firebase from "firebase";

class EcommerceCustomers extends Component {



  constructor(props){
    super(props);
    this.peticionGet=this.peticionGet.bind(this);

    this.state = {
        uid: '',
        keypedido: '',
        redirect: null,
        productlist: [],
        cantidad: 0,
        rows: [],
        data: [],
        modalInsertar: false,
        modalEditar: false,
        form: {
          title: '',
          price: ''
        },
        id: 0,
        total:0
      };
  }


  authListener() {

  //   var user = firebase.auth().currentUser;
  //   if(user){
  //     let  pedidosRef = firebase.database().ref(`Empresas/PollosKing/Users/${user.uid}/info`);
  //
  //
  //       pedidosRef.once("value", (currentuser) => {
  //       if (currentuser.val() !== null) {
  //         this.setState({ ...this.state.info, info: currentuser.val() });
  //       }
  //     });
  // } else {
  //   var info = { displayName : 'Invitado' };
  //   this.setState({ ...this.state.info, info: info });
  // }
}


peticionGet = () => {

  let  usersRef = firebase.database().ref(`Empresas/PollosKing/Users`);
        usersRef.on("value", snapshot => {
        if(snapshot.val()) {
          console.log(JSON.stringify(snapshot.val()));
          if (snapshot.val() !== null) {
            this.setState({ ...this.state.data, data: snapshot.val() });
          } else {
            this.setState({ data: [] });
          }
        }else {
          return;
        }
  });
}


example = () => {

  var columns = [];
  var data = [];
  firebase.database().ref(`Empresas/PollosKing/Users`).once("value", function(snap){
      snap.forEach(snapshot => {
          Object.keys(snapshot.val()).map(k => {
                columns.push(Object.assign({}, {"data":k}))
                //data.push(Object.assign({}, {k:snapshot.val()[k]}))
                console.log(snapshot.val())
                data.push(snapshot.val()[k])
          })
      })

  })

  this.setState({ rows: data})



}


  // Se carga al incio del componente
  componentDidMount() {
     this.peticionGet();
     this.authListener();
     this.example();
   }

  render() {



    return (
           <React.Fragment>
                <Clientes item={this.state.rows} />
            </React.Fragment>
          )};
    }

export default EcommerceCustomers;
