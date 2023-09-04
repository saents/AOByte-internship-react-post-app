import React from "react";
import styles from "./Post.module.scss";
import "animate.css";

const Post = ({id, className, title, rating}) => {
    return (
        <div className={`${styles.post} post-${id} ${className.join(" ")}`}>
            <h3>{title}</h3>
            <p>{rating}</p>
        </div>
    );
};
export default React.memo(Post);
