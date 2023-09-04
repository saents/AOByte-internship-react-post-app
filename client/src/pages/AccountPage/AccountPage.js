import React, { useState } from "react";
import styles from "./AccountPage.module.scss";
import { Button, Card, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import UserService from "../../services/UserService";

const AccountPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.auth.user);

    const onFinish = async (values) => {
        try {
            const {email, oldPassword, newPassword} = values;
            const {id} = user;
            const updatedUserData = {
                id, email, oldPassword, newPassword,
            };
            await UserService.update(updatedUserData);
            setLoading(false);
            message.success("Changes applied successfully!");
        } catch (error) {
            setLoading(false);
            message.error("Wrong old password. Please check.");
        }
    };

    return (
        <div className={styles.account_container}>
            <Card title="Profile Settings">
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        label="Email"
                        initialValue={user.email}
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email address",
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="oldPassword"
                        label="Old Password"
                        colon={true}
                        rules={[
                            {
                                required: true,
                                message: "Please enter your old password",
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your new password",
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Apply Changes
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AccountPage;
