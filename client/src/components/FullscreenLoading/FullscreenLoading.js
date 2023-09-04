import React from "react";

import styles from "./FullscreenLoading.module.scss";
import Loader from "../Loader/Loader";

const FullscreenLoading = () => {
    return (
        <div>
            <div className={styles.loading_comp}>
                <Loader size={"big"}/>
            </div>
        </div>
    );
};

export default FullscreenLoading;
