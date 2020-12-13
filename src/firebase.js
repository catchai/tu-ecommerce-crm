import * as firebase from 'firebase';

var firebaseConfig = {
     apiKey: "AIzaSyCCvZM2B4036G9qMvkeCa_8_r-1EFXzXDg",
     authDomain: "tuecommerce-9aca3.firebaseapp.com",
     databaseURL: "https://tuecommerce-9aca3.firebaseio.com",
     projectId: "tuecommerce-9aca3",
     storageBucket: "tuecommerce-9aca3.appspot.com",
     messagingSenderId: "13854964639",
     appId: "1:13854964639:web:eac8280f24bebcac919baa"
}

var fireDB=firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();
