import React, { useState } from "react";
import { Avatar, Button, Card, Divider, Form, Input, List, message, Rate, Typography } from "antd";
import { Comment } from "@ant-design/compatible";

import { composeInitials } from "../../../../helpers";
import { errorMassageIfCommentEmpty } from "../../../../constants/errorMassages";
import { defaultCommentRating } from "../../../../constants/defaultData";

import styles from "./Post.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { customIcons, desc } from "../../../../constants/postRateOptions";
import PostEditAndDeleteModal from "./PostEditModal/PostEditAndDeleteModal";
import { getAll } from "../../../../store/reducers/postsReducer";
import PostService from "../../../../services/PostService";


const {Title, Paragraph} = Typography;
const {TextArea} = Input;


const Post = ({post}) => {
    const {user} = useSelector((state) => state.auth);

    const [comments, setComments] = useState(post.comments || []);
    const [submitting, setSubmitting] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(defaultCommentRating);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            if (!newComment) {
                return message.error(errorMassageIfCommentEmpty);
            }

            const newCommentObject = {
                id: user.id,
                email: user.email,
                comment: newComment,
                rate: rating,
            };

            const updatedPost = {...post, comments: [...comments, newCommentObject]};
            await PostService.update(updatedPost);

            dispatch(getAll());

            setComments((prevState) => [...prevState, newCommentObject]);
            setNewComment("");
            setRating(5);
            setSubmitting(false);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <Card className={styles.post_card}
              type="inner"
              title={
                  <div className={styles.post_title_main}>
                      <Title className={styles.post_title}>{post.title}</Title>
                      {
                          post.author.id === user.id && <PostEditAndDeleteModal post={post}/>
                      }
                  </div>
              }>
            <Paragraph className={styles.post_body}>{post.body}</Paragraph>
            <div className={styles.post_information}>
                <div className={styles.post_author_section}>
                    <Divider>Author</Divider>
                    <div className={`${styles.post_author_container}`}>
                        <Avatar className={styles.avatar_letter} size="large">
                            <p className={styles.avatar_letter}>{composeInitials(post.author.email)}</p>
                        </Avatar>
                        <span className={styles.author_name}>{post.author.email}</span>
                    </div>
                </div>
                <div className={styles.post_rating_section}>
                    <Divider>Rating</Divider>
                    <Paragraph className={styles.post_rating_paragraph}>
                        {post.rating.toFixed(2) || 0} {customIcons[`${Math.round(post.rating)}`]}
                    </Paragraph>
                </div>
            </div>
            <Divider>Comments</Divider>
            <List
                itemLayout="vertical"
                dataSource={comments}
                renderItem={(comment) => (
                    <Comment
                        className={styles.post_comment}
                        author={
                            <div className={styles.comment_author_section}>
                                <Avatar className={styles.avatar_letter} size="default">
                                    <p className={styles.avatar_letter}>{composeInitials(comment.email)}</p>
                                </Avatar>
                                <div className={styles.comment_author_name_section}>
                                    <span className={styles.comment_user_email}>{comment.email}</span>
                                    {post.author.id === comment.id &&
                                        <span className={styles.comment_author}>Author</span>}
                                </div>
                            </div>
                        }
                        content={comment.comment}
                        actions={[<span>{`Rate: ${comment.rate}`}</span>]}
                    />
                )}
            />
            <Divider>Leave a Comment</Divider>
            <Form>
                <Form.Item>
                    <TextArea
                        rows={4}
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                        placeholder={comments.length === 0 ?
                            "No comments available. Be the first to comment!" :
                            "Write your comment here..."
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <span style={{marginRight: 5}}>Rate this post: </span>
                    <Rate tooltips={desc} value={rating} onChange={(value) => setRating(value)}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Post;

