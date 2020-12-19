import React, {  useEffect } from 'react';

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from 'react-i18next';

const SidebarContent = (props) => {

    // Use ComponentDidMount and ComponentDidUpdate method symultaniously
     useEffect(() => {

        var pathName = props.location.pathname;

        const initMenu = () => {
            new MetisMenu("#side-menu");
            var matchingMenuItem = null;
            var ul = document.getElementById("side-menu");
            var items = ul.getElementsByTagName("a");
            for (var i = 0; i < items.length; ++i) {
                if (pathName === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }
            if (matchingMenuItem) {
                activateParentDropdown(matchingMenuItem);
            }
        }
         initMenu();
      }, [props.location.pathname]);


    function  activateParentDropdown(item) {
        item.classList.add("active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

          return (

            <React.Fragment>
                 <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                    <li className="menu-title">{props.t('Menu') }  </li>
                    <li>
                        <Link to="/calendar" className="waves-effect">
                                   <i className="bx bx-calendar"></i><span className="badge badge-pill badge-info float-right"></span>
                                   <span>{'Calendario'}</span>
                               </Link>
                      </li>
                     <li>
                         <Link to="/#" className="waves-effect">
                                    <i className="bx bx-money"></i><span className="badge badge-pill badge-info float-right"></span>
                                    <span>{'Módulo Venta'}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/dashboard-saas"> {'Controller' }</Link></li>
                                    <li><Link to="/ecommerce-orders">  <span>{props.t('Pedidos') }</span></Link></li>
                                    <li><Link to="/ecommerce-customers">{props.t('Clientes') }</Link></li>
                                </ul>
                     </li>

                     <li>
                         <Link to="/#" className="waves-effect">
                                    <i className="bx bx-money"></i><span className="badge badge-pill badge-info float-right"></span>
                                    <span>{'Módulo Bodega'}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/ecommerce-admin-product">{props.t('Productos') }</Link></li>
                                    <li><Link to="/ecommerce-admin-provider">  <span>{props.t('Proveedores') }</span></Link></li>
                                    <li><Link to="/ecommerce-admin-category">{props.t('Categorías') }</Link></li>
                                    <li><Link to="/ecommerce-admin-flavor">{props.t('Ingredientes') }</Link></li>
                                    <li><Link to="/ecommerce-products">{props.t('Vista Productos') }</Link></li>
                                </ul>
                     </li>
                     <li>
                         <Link to="/#" className="waves-effect">
                                    <i className="bx bx-money"></i><span className="badge badge-pill badge-info float-right"></span>
                                    <span>{'Módulo Delivery'}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/ecommerce-status-buy">  {'Estado de Compra' }</Link></li>
                                    <li><Link to="/ecommerce-feedback-customer">  <span>{props.t('Satisfacción del Cliente') }</span></Link></li>
                                </ul>
                     </li>

                    <li className="menu-title">{'Herramientas'}</li>


                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bx-image-add"></i>
                            <span>{props.t('Medios') }</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="/form-uploads"> {props.t('Gestión de Imágenes') }</Link></li>
                            <li><Link to="/ui-image-cropper"> {props.t('Editor de Imágenes') }</Link></li>
                        </ul>
                    </li>




                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bxs-user-detail"></i>
                            <span>{props.t('Contactos')}</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="contacts-grid">{props.t('Base de Usuario')}</Link></li>
                            <li><Link to="contacts-list">{props.t('Lista de Usuarios')}</Link></li>
                            <li><Link to="contacts-profile">{props.t('Perfiles')}</Link></li>
                        </ul>
                    </li>








                </ul>
            </div>
            </React.Fragment>
          );
        }

    export default withRouter(withNamespaces()(SidebarContent));
