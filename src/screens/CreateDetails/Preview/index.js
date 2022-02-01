import React from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";

const Preview = ({ isUploaded, previewSrc, name }) => {
  return (
    <div className={cn(styles.wrap)}>
      <div className={styles.info}>Preview</div>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.preview}>
            {
              isUploaded && <div className={styles.preview_img} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${previewSrc})` }}></div>
            }
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>{name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
