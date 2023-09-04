import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./LoginPage.module.scss";
import { routesData } from "../../constants/routesData";
import { login } from "../../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";


const {Title, Text} = Typography;

function LoginPage() {
    const isLoading = useSelector((state) => state.auth.isLoading);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleRegistrationButton = () => {
        navigate(routesData.registration.url);
    };

    const handleLogin = async (values) => {
        try {
            const email = values.email;
            const password = values.password;
            dispatch(login({email, password}));
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    return (
        <Row justify="center" align="middle" className={styles.login_container}>
            <Row justify="center" align="middle" className={styles.login_table}>
                <Col className={styles.login_table_col}>
                    <Form onFinish={handleLogin}
                          initialValues={{remember: true}}>
                        <Title level={2} className={styles.login_title}>Login</Title>

                        <Form.Item
                            name="email"
                            rules={[
                                {required: true, message: "Please enter your email!"},
                                {type: "email", message: "Please enter a valid email address!"},
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined/>}
                                placeholder="Email"
                                disabled={isLoading}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: "Please enter your password!"}]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                placeholder="Password"
                                disabled={isLoading}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={isLoading}>
                                Log in
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Text>Don't have an account?</Text>
                            <Button type="default" block onClick={handleRegistrationButton}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Row>
    );
}

export default LoginPage;
