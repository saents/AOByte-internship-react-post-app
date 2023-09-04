import React, { useState } from "react";
import { Button, Form, Input, Modal, Space, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { create, getAll } from "../../../store/reducers/postsReducer";
import { PostsCreateSelectOptions } from "../../../constants/SelectOptions";

const { Option } = Select;

const PostCreate = () => {
    const {user} = useSelector((state) => state.auth);
    const {isLoading} = useSelector(state => state.posts);
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleChange = (value) => {
        console.log(value);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        const postData = {...values, author: user, rating: 0};
        await dispatch(create(postData));
        await dispatch(getAll());
        form.resetFields();
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type={"primary"} onClick={showModal}>
                Create Post
            </Button>
            <Modal
                title={"Create New Post"}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} name={"createPostForm"} onFinish={onFinish} initialValues={{categories: [PostsCreateSelectOptions[0].value]}}>
                    <Form.Item
                        label={"Post Title"}
                        name={"title"}
                        rules={[{required: true, message: "Please input the title!"}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={"Post Categories"}
                        name={"categories"}
                        rules={[{required: true, message: "Please input the title!"}]}
                    >
                        <Select
                            mode="multiple"
                            style={{width: '100%'}}
                            placeholder="Select post categories"
                            onChange={handleChange}
                            optionLabelProp="label"
                        >
                            {
                                PostsCreateSelectOptions.map((option, index) =>
                                    <Option key={index} value={option.value} label={option.label}>
                                        <Space>
                                            {option.label}
                                        </Space>
                                    </Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"Post Body"}
                        name={"body"}
                        rules={[{required: true, message: "Please input the body!"}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={isLoading} type={"primary"} htmlType={"submit"}>
                            Create Post
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default PostCreate;
