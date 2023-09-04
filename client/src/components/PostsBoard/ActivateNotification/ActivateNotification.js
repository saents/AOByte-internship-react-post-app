import React from 'react';
import { Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const ActivateNotification = () => {
    const openNotification = () => {
        notification.open({
            message: 'Account Activation Required',
            description: 'Please activate your account from your provided gmail, to have access to create your own posts.',
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
            duration: 5,
        });
    };

    const handleButtonClick = () => {
            openNotification();
    };

    return (
        <div>
            <Button type="primary" onClick={handleButtonClick}>
                Activate Account
            </Button>
        </div>
    );
};

export default ActivateNotification;