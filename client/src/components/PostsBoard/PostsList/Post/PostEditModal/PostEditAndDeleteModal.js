import React, { useState } from 'react';
import { Button, Form, Input, message, Modal } from "antd";
import styles from "../Post.module.scss";
import PostService from "../../../../../services/PostService";
import { useDispatch } from "react-redux";
import { getAll } from "../../../../../store/reducers/postsReducer";

const {TextArea} = Input;

const PostEditAndDeleteModal = ({post}) => {

    const [editedPost, setEditedPost] = useState({...post});
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const dispatch = useDispatch();
    const handleDeleteModalCancel = () => {
        setIsDeleteModalVisible(false);
    };

    const showDeleteModal = () => {
        setIsDeleteModalVisible(true);
    };

    const handleDeleteModalSave = async () => {
        try {
            await PostService.delete(post._id);
            dispatch(getAll());
            setIsDeleteModalVisible(false);
        } catch (e) {
            console.log(e);
            setIsDeleteModalVisible(false);
        }
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };


    const showEditModal = () => {
        setIsEditModalVisible(true);
    };

    const handleEditModalSave = async () => {
        if (post.title !== editedPost.title || post.body !== editedPost.body) {
            try {
                await PostService.updateUserOwnPost(editedPost);
                dispatch(getAll());
                setIsEditModalVisible(false);
            } catch (e) {
                message.error('Something want wrong.');
            }
        } else {
            setIsEditModalVisible(false);
            return message.error('Post is not edited, please edit title or body, before click on edit button.');
        }
    };

    return (
        <>
            <Button type="primary" danger onClick={showDeleteModal} className={styles.delete_button}>
                Delete
            </Button>
            <Button type="primary" onClick={showEditModal} className={styles.edit_button}>
                Edit
            </Button>
            <Modal
                title="Edit Post"
                open={isEditModalVisible}
                onCancel={handleEditModalCancel}
                onOk={handleEditModalSave}
            >
                <Form>
                    <Form.Item label="Title">
                        <Input
                            value={editedPost.title}
                            onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
                        />
                    </Form.Item>
                    <Form.Item label="Body">
                        <TextArea
                            rows={4}
                            value={editedPost.body}
                            onChange={(e) => setEditedPost({...editedPost, body: e.target.value})}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Deleting confirmation."
                open={isDeleteModalVisible}
                onCancel={handleDeleteModalCancel}
                onOk={handleDeleteModalSave}
            >
            </Modal>
        </>
    );
};

export default PostEditAndDeleteModal;