import React, { useState } from 'react';
import {   Label, Button, Row, Col, Card, Form, FormGroup, CardBody, CardTitle, CardSubtitle,Container } from "reactstrap";
import Dropzone from "react-dropzone";
import Select from "react-select";
import * as firebase from 'firebase';

// Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import { Link } from "react-router-dom";

const FormUpload = (props) => {

  const [selectedFiles, setselectedFiles] = useState([]);

  const [selectedFolder, setselectedFolder] = useState([]);

///   adherido >>>>>>>>>>>>>>>>>>>>><
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  let folders = [];


///   <<<<<<<<<<<<<<<<<<<<< adherido

  async function loadPicture(){

    var storage = firebase.storage().ref();

    var listRef = storage.child('/');

    // Find all the prefixes and items.
    listRef.listAll().then(function(res) {
      res.prefixes.forEach(function(folderRef) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        console.log('Folder: \n ' + folderRef);
        this.folders.push(folderRef);
      });
      res.items.forEach(function(itemRef) {
          // All the items under listRef.
          console.log('Archivos: \n' +  itemRef);

      });
    }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('UPS.....:' + error);
    });

  }



    function handleAcceptedFolder(folder)
    {
      setselectedFolder(folder);
    }

   function handleAcceptedFiles(files)
   {
    const storage = firebase.storage();
    const uploadTask = storage.ref(`productos/${files[0].name}`).put(files[0]);
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
          .child(files[0].name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url);
          });
      });

      Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
        formattedSize: formatBytes(files[0].size)
      });
     setselectedFiles(files);
  };

  /**
   * Formats the size
   */
 function formatBytes(bytes, decimals = 2){
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

// adherido >>>>>>>>>>>>>>>>>>><
 

console.log("image: ", image);

// <<<<<<<<<<<<  adherido


    return (
       <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>

            <Breadcrumbs title="Medios" breadcrumbItem="Gestion de Imágenes" />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>Zona Drop File</CardTitle>
                    <CardSubtitle className="mb-3"> Ingrese los archivos sobre la zona, para ingresarlos a la nube .Dichos Archivos serán cargados y visualizados.
                    <progress striped animated color="primary" value={progress} max="100" />
                    </CardSubtitle>
                    <Form>
                      <Dropzone
                        onDrop={acceptedFiles =>
                           { handleAcceptedFiles(acceptedFiles) }
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick mt-2"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                              </div>
                              <h4>Drop archivos aquí o click para subir.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        { selectedFiles.map((f, i) => {
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
            <Row>
              <Col className="col-12">
              <Card>
                <CardBody>
                <CardTitle>Carpetas Encontradas</CardTitle>
                <CardSubtitle className="mb-3">
                  Listado de Carpetas de Recursos
                </CardSubtitle>

                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label htmlFor="text">

                        </Label>
                        <Select  options={folders}  value={selectedFolder} onChange={acceptedFolder =>
                           { handleAcceptedFolder(acceptedFolder) }
                        } />
                      </FormGroup>

                      </Col>
                      <Col sm="6">
                        <FormGroup>
                          <Label htmlFor="text">

                          </Label>
                          <Button
                            type="submit"
                            color="primary"
                            onClick={loadPicture()}
                            className="mr-1 waves-effect waves-light"
                          >
                          Cargar Carpetas
                          </Button>
                        </FormGroup>
                        </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
      );
    }

export default FormUpload;
