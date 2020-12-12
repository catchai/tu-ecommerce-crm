import React, { useState, useEffect } from 'react'; 
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
} from "reactstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


// Accion 1 Paso importar la libreria de Firebase
import * as firebase from "firebase";


const EcommerceAddProduct = (props) => {

  const [selectedFiles, setselectedFiles] = useState([]);
  var [productObjects, setProductObjects] = useState({});
  const [currentId, setCurrentId] = useState('');  

  const options = [
    { value: "AK", label: "Alaska" },
    { value: "HI", label: "Hawaii" },
    { value: "CA", label: "California" },
    { value: "NV", label: "Nevada" },
    { value: "OR", label: "Oregon" },
    { value: "WA", label: "Washington" },
  ];


  useEffect(() => {  
    firebase.database().ref("data").child("product").on('value', snapshot => {  
        if (snapshot.val() != null) {  
            setProductObjects({  
                ...snapshot.val()  
            });  
        }  else{
            setProductObjects({});
        }
    })  
}, [])  

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setselectedFiles(files);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }



  function addProductData(productId, title, price) {

    var postData = {
        title: title,
        price: price
      };

    
      // Get a key for a new Post.
      var newPostKey = firebase.database().ref("data").child("product").push().key;
    
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
    //   updates['/Products/' + newPostKey] = postData;
      updates['/data/product/' + productId + '/' + newPostKey] = postData;
    
      return firebase.database().ref().update(updates);
    
  }


  function updateProductDataWithCompletion(productname,price) {

    console.log(':::::::::::::::::::::');
    console.log(productname);
    console.log(price);
   // var newPostKey = firebase.database().ref("data").child("productos").push().key;

    // [START rtdb_write_new_user_completion]
    firebase.database().ref("data").child("product").set({
        id: 1,
        title: productname,
        price: price
    }, function(error) {
      if (error) {
        // The write failed...
      } else {
        // Data saved successfully!
        console.log('Exito CSM!!!!');
      }
    });
    // [START rtdb_write_new_user_completion]
  }




  const addOrEdit = (obj) => {  
    if (currentId === '')  
    firebase.database().ref("data").child("product").push(  
            obj,  
            err => {  
                if (err)  
                    console.log(err)  
                else  
                    setCurrentId('')  
            })  
    else  
            firebase.database().ref("data").child(`Student/${currentId}`).set(  
            obj,  
            err => {  
                if (err)  
                    console.log(err)  
                else  
                    setCurrentId('')  
            })  
}  




  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Comercio" breadcrumbItem="Agregar Producto" />

          <table className="table table-bordered heading-hvr">  
                                        <thead>  
                                            <tr>  
                                                <th className="active">Full Name</th>  
                                                <th>Roll No</th>  
                                                <th>Subject</th>  
                                                <th>Class</th>  
                                                <th width="60"> </th>  
                                                <th width="60"> </th>  
                                            </tr>  
                                        </thead>  
                                        <tbody>  
                                            {  
                                                Object.keys(productObjects).map((key) => (  
                                                    <tr key={key}>  
                                                        <td>{productObjects[key].title}</td>  
                                                        <td>{productObjects[key].price}</td>  
                                                        <td>{productObjects[key].label}</td>  
                                                        <td>{productObjects[key].text}</td>  
  
                                                        <td className="case-record">  
                                                            <button type="button" className="btn btn-info"  
                                                                onClick={() => { setCurrentId(key) }}>Edit</button>  
  
                                                        </td>  
                                                    </tr>  
                                                ))  
                                            }  
                                            </tbody>
                                            </table>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Información Básica</CardTitle>
                  <CardSubtitle className="mb-3">
                    Completar toda la información requerida
                  </CardSubtitle>

                  <Form>
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <Label htmlFor="productname">Nombre del Producto</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="manufacturername">
                            Manufacturer Name
                          </Label>
                          <Input
                            id="manufacturername"
                            name="manufacturername"
                            type="text"
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="manufacturerbrand">
                            Manufacturer Brand
                          </Label>
                          <Input
                            id="manufacturerbrand"
                            name="manufacturerbrand"
                            type="text"
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            name="price"
                            type="text"
                            className="form-control"
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="6">
                        <FormGroup>
                          <Label className="control-label">Category</Label>
                          <select className="form-control select2">
                            <option>Select</option>
                            <option value="AK">Alaska</option>
                            <option value="HI">Hawaii</option>
                          </select>
                        </FormGroup>
                        <FormGroup className="select2-container">
                          <Label className="control-label">Features</Label>
                          <Select
                            classNamePrefix="select2-selection"
                            placeholder="Chose..."
                            title="Country"
                            options={options}
                            isMulti
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="productdesc">
                            Product Description
                          </Label>
                          <textarea
                            className="form-control"
                            id="productdesc"
                            rows="5"
                          ></textarea>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      color="primary"
                      onClick={updateProductDataWithCompletion}
                      className="mr-1 waves-effect waves-light"
                    >
                      Guardar Cambios
                    </Button>
                    <Button
                      type="submit"
                      color="secondary"
                      className="waves-effect"
                    >
                      Cancelar
                    </Button>
                  </Form>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Product Images</CardTitle>
                  <Form>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleAcceptedFiles(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </Form>
                </CardBody>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceAddProduct;
