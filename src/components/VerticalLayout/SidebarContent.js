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
                         <Link to="/#" className="waves-effect">
                                    <i className="bx bx-home-circle"></i><span className="badge badge-pill badge-info float-right">03</span>
                                    <span>{props.t('Dashboards') }</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/dashboard">{props.t('Default') }</Link></li>
                                    <li><Link to="/dashboard-saas">{props.t('Saas') }</Link></li>
                                </ul>
                     </li>

                    <li className="menu-title">{props.t('Apps') }</li>





                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bx-store"></i>
                            <span>{props.t('Ecommerce') }</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="ecommerce-products">{props.t('Productos') }</Link></li>
                            <li><Link to="ecommerce-product-detail">{props.t('Detalle de Productos') }</Link></li>
                            <li><Link to="ecommerce-orders">{props.t('Ordenes') }</Link></li>
                            <li><Link to="ecommerce-customers">{props.t('Customers') }</Link></li>
                            <li><Link to="ecommerce-cart">{props.t('Carrito de Compra') }</Link></li>
                            <li><Link to="ecommerce-checkout">{props.t('Conformar Compra') }</Link></li>
                            <li><Link to="ecommerce-shops">{props.t('Tiendas') }</Link></li>
                            <li><Link to="ecommerce-add-product">{props.t('Agregar Productos') }</Link></li>
                            <li><Link to="ecommerce-admin-product">{props.t('Gestión de Productos') }</Link></li>
                        </ul>
                    </li>


                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bx-envelope"></i>
                            <span>{props.t('Email')}</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="email-inbox">{props.t('Inbox')}</Link></li>
                            <li><Link to="email-read">{props.t('Read Email')} </Link></li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bx-receipt"></i>
                            <span>{props.t('Invoices')}</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="invoices-list">{props.t('Invoice List')}</Link></li>
                            <li><Link to="invoices-detail">{props.t('Invoice Detail')}</Link></li>
                        </ul>
                    </li>




                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bxs-user-detail"></i>
                            <span>{props.t('Contacts')}</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="contacts-grid">{props.t('User Grid')}</Link></li>
                            <li><Link to="contacts-list">{props.t('User List')}</Link></li>
                            <li><Link to="contacts-profile">{props.t('Profile')}</Link></li>
                        </ul>
                    </li>








                </ul>
            </div>
            </React.Fragment>
          );
        }

    export default withRouter(withNamespaces()(SidebarContent));
