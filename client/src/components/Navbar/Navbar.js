import React from "react";
import { Header as AntHeader } from "antd/es/layout/layout";
import styles from "./Navbar.module.scss";
import UserDropdown from "./UserDropdown/UserDropdown";
import { useSelector } from "react-redux";
import logo from "../../assets/logo-removebg-preview.png";
import { Link } from "react-router-dom";
import { routesData } from "../../constants/routesData";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <AntHeader className={styles.navbar_container}>
            <div className={styles.logo}>
                <Link to={routesData.posts.url} className={styles.logo_link}>
                    <img className={styles.logo_img} src={logo} alt="logo"/>
                </Link>
            </div>
            <div/>
            <div>
                {user && <UserDropdown user={user}/>}
            </div>
        </AntHeader>
    );
};

export default Navbar;
