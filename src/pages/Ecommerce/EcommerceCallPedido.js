import React, { Component } from "react";

import Pedidos from './EcommercePedidos';
import { MDBInput, MDBBtn} from "mdbreact";
import "./datatables.scss";

// comunicarnos con firebase
import * as firebase from "firebase";

class EcommerceCallPedidos extends Component {



  constructor(props){
    super(props);
    this.putDelivery=this.putDelivery.bind(this);
    this.peticionGet=this.peticionGet.bind(this);
    this.loadData=this.loadData.bind(this);

    this.state = {
        uid: '',
        keypedido: '',
        redirect: null,
        productlist: [],
        cantidad: 0,
        rows: [],
        rows2: [],
        data: [],
        modalInsertar: false,
        modalEditar: false,
        form: {
          title: '',
          price: ''
        },
        pedido: {
          Date: "",
          badgeclass:"",
          billingName: "",
          delivery: "Preparando Pedido",
          fechaPedido: '',
          id: "",
          methodIcon: "",
          orderId: "",
          paymentMethod: "",
          paymentStatus: "",
          productos: [],
          creditcard: {
            code: "",
            expiry: "",
            number: "",
            zip: ""
          },
          requestInfo: "",
          subtotal: 0,
          total: 0
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

/**
* actualiza la transicion del flujo delivery
* Preparando pedido - en camino - entregado
**/
putDelivery(userid, id, estadoNew){
  var columns = [];
  var data = [];
  var data2 = [];
  var displayName = '';
  var ped = {};
  console.log(userid, id, estadoNew);

  firebase.database().ref(`Empresas/PollosKing/Users/${userid}/pedidos/${id}`).on("value", snapshot => {

    // snapshot.forEach(snap1 => {
    //         this.setState({pedido: snap1.val()});
    //   });

    console.log('================================');
    console.log(snapshot.val());
    ped = snapshot.val();
    console.log('================================');

   });

   // alteramos su al estadoNew
   switch (estadoNew) {
     case 'Preparando Pedido':
       ped.delivery = 'En Camino';
       break;
     case 'En Camino':
       ped.delivery = 'Entregado';
       break;
     default:
   }
   // alteracion del pedido
   this.setState({pedido: ped});

   console.log('2================================');
   console.log(this.state.pedido);
   console.log('2================================');

  // actualizacion state pedido
  firebase.database().ref(`Empresas/PollosKing/Users/${userid}/pedidos/${id}`).set(
      ped,
    error=>{
      if(error) {
        console.log(error)
      } else {
        console.log('Actualizado Satisfactoriamente !!!')
        console.log('... Enviando a detalle de la Orden')
        //this.setState({redirect: 'order-details'})
        this.loadData();
      }

    });

}



// cargar datos de pedidos
loadData(){

  var columns = [];
  var data = [];
  var data2 = [];
  var displayName = '';
  let ref = firebase.database().ref(`Empresas/PollosKing/Users`);
  ref.on("value", snap => {
      snap.forEach(snapshot => {

          //console.log(snapshot.key);
          ref.child(`/${snapshot.key}/info`).on("value", snap0 => {
              displayName = snap0.child('displayName').val();
          })

          ref.child(`/${snapshot.key}/pedidos`).on("value", snap1 => {

              //console.log(snap1.val());

              snap1.forEach(item => {

                var obj = {
                  //check: <MDBInput label=" " type="checkbox" id={item.child("orderId").val()} />,
                  orderId: item.child("orderId").val(),
                  displayName: displayName,
                  paymentStatus: item.child("paymentStatus").val(),
                  delivery: item.child("delivery").val(),
                  fechaPedido: item.child("fechaPedido").val(),
                  total: item.child("total").val(),
                  paymentMethod: item.child("paymentMethod").val()
                }
                var obj2 = {
                  //check: <MDBInput label=" " type="checkbox" id={item.child("orderId").val()} />,
                  orderId: item.child("orderId").val(),
                  displayName: displayName,
                  paymentStatus: item.child("paymentStatus").val(),
                  //delivery: item.child("delivery").val(),
                  fechaPedido: item.child("fechaPedido").val(),
                  total: item.child("total").val(),
                  paymentMethod: item.child("paymentMethod").val(),
                  action: <MDBBtn color="primary" size="sm"  onClick={ () => {this.putDelivery(snapshot.key,item.key,item.child("delivery").val())}}>{item.child("delivery").val()}</MDBBtn>
                }
                if(item.child("paymentStatus").val() === 'Delivery'){
                  data2.push(obj2);
                }
                data.push(obj);
              })
          })

      })

  })
 this.setState({ rows: data})
 this.setState({ rows2: data2})

}


  // Se carga al incio del componente
  componentDidMount() {
    // this.peticionGet();
     // this.authListener();
     this.loadData();
   }

  render() {

    return (
           <React.Fragment>
                <Pedidos item2={this.state.rows2} item={this.state.rows} />
            </React.Fragment>
          )};
    }

export default EcommerceCallPedidos;
