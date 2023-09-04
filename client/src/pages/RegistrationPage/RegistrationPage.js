import React from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.scss";
import { routesData } from "../../constants/routesData";
import { IdentityUrlController } from "../../constants/apiRoutes";
import { registration } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import useApi from "../../hooks/useApi";


const {Title, Text} = Typography;

function RegistrationPage() {
    const dispatch = useDispatch();

    const {isLoading} = useApi(IdentityUrlController.registration);

    const navigate = useNavigate();

    const handleRegister = (values) => {
        const userData = {email: values.email, password: values.password};
        dispatch(registration(userData));
    };

    const handleLoginButton = () => {
        navigate(routesData.login.url);
    };

    return (
        <Row justify="center" align="middle" className={styles.registration_container}>
            <Row justify="center" align="middle" className={styles.registration_table}>
                <Col className={styles.registration_table_col}>
                    <Form
                        onFinish={handleRegister}
                        initialValues={{remember: true}}
                    >
                        <Title level={2} className={styles.registration_title}>Registration</Title>

                        <Form.Item
                            name="email"
                            rules={[
                                {required: true, message: "Please enter your email!"},
                                {type: "email", message: "Please enter a valid email address!"},
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined/>}
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

                        <Form.Item
                            name="confirmPassword"
                            dependencies={["password"]}
                            rules={[
                                {required: true, message: "Please confirm your password!"},
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("The two passwords do not match!"));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                placeholder="Confirm Password"
                                disabled={isLoading}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={isLoading}>
                                Register
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Text>Already have an account?</Text>

                            <Button type="default" block onClick={handleLoginButton}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Row>
    );
}

export default RegistrationPage;
