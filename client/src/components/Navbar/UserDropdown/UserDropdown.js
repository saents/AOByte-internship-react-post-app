import React from "react";
import { Avatar, Divider, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./UserDropdown.module.scss";
import { Link } from "react-router-dom";
import { routesData } from "../../../constants/routesData";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/reducers/authReducer";
// import { getUserPosts, setFilterOption } from "../../../store/reducers/postsReducer";

const UserDropdown = ({user}) => {
    const dispatch = useDispatch();

    const items = [
        // {
        //     label: (<Link onClick={() => {
        //         dispatch(setFilterOption(['author', user.email]))
        //         dispatch(getUserPosts());
        //     }} to={routesData.userPosts.url}>{routesData.userPosts.text}</Link>),
        //     key: "0",
        // },
        // {
        //     label: (<Divider style={{margin: 0, padding: 0}}/>),
        //     key: "1",
        // },
        {
            label: (<Link to={routesData.account.url}>{routesData.account.text}</Link>),
            key: "2",
        },
        {
            label: (<Divider style={{margin: 0, padding: 0}}/>),
            key: "3",
        },
        {
            label: (<Link onClick={() => {
                dispatch(logout());
            }} to={routesData.login.url}>Logout</Link>),
            key: "4",
        },
    ];


    return (
        <div className={styles.user_control_section}>
            <Dropdown menu={{items}}>
                <div className={styles.user_control}>
                    <Avatar
                        size={36}
                        src={user.avatar} // add later
                        icon={<UserOutlined/>}
                        style={{backgroundColor: "#00deff"}}
                    />
                    <span style={{marginLeft: 8}}>{user.email}</span>
                </div>
            </Dropdown>
        </div>
    );
};

export default UserDropdown;
