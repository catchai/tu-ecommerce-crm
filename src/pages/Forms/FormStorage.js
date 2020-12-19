  import React, { useState } from "react";
import { render } from "react-dom";
import * as firebase from 'firebase';

const FormStorage = () => {

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // async function loadPicture(){
  //
  //   var storage = firebase.storage();
  //
  //   var listRef = storage.child('productos');
  //
  //   // Find all the prefixes and items.
  //   listRef.listAll().then(function(res) {
  //     res.prefixes.forEach(function(folderRef) {
  //       // All the prefixes under listRef.
  //       // You may call listAll() recursively on them.
  //       console.log(folderRef);
  //     });
  //     res.items.forEach(function(itemRef) {
  //         // All the items under listRef.
  //         console.log(itemRef);
  //     });
  //   }).catch(function(error) {
  //       // Uh-oh, an error occurred!
  //       console.log('UPS.....:' + error);
  //   });
  //
  // }



    /**
    Paginacion
    **/
    // async function pageTokenExample(){
    //
    //   var storage = firebase.storage();
    //
    //   // Create a reference under which you want to list
    //   var listRef = storage.child('productos');
    //   // Fetch the first page of 100.
    //   var firstPage = await listRef.list({ maxResults: 100});
    //   // Use the result.
    //   // processItems(firstPage.items)
    //   // processPrefixes(firstPage.prefixes)
    //   // Fetch the second page if there are more elements.
    //   if (firstPage.nextPageToken) {
    //     var secondPage = await listRef.list({
    //     maxResults: 100,
    //     pageToken: firstPage.nextPageToken,
    //   });
    //   // processItems(secondPage.items)
    //   // processPrefixes(secondPage.prefixes)
    //   }
    // }

   /**
     Sube imagenes al Storage
   **/
   const handleUpload = () => {

    var storage = firebase.storage();

    const uploadTask = storage.ref(`productos/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("productos")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  console.log("image: ", image);

  return (
    <React.Fragment>
     <div className="page-content">


      <progress  color="primary" value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
    </div>
      </React.Fragment>
  );
};

render(<FormStorage />, document.querySelector("#root"));

export default FormStorage;
