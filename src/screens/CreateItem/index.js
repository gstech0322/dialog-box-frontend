import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./CreateItem.module.sass";
import Control from "../../components/Control";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Upload Item",
  },
];

const CreateItem = () => {
  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <h1 className={cn("h2", styles.title)}>Create item</h1>
            <div className={styles.info}>
              Choose <span>“Single”</span> if you want your collectible to be
              one of a kind or <span>“Multiple”</span> if you want to sell one
              collectible multiple times
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.preview}>
                <img srcSet={`/images/content/upload-pic-1@2x.jpg 2x`} src="/images/content/upload-pic-1.jpg" alt="Create Single" />
              </div>
              <Link className={cn("button-stroke", styles.button)} to="/create-details">
                Create Single
              </Link>
            </div>
            <div className={styles.item}>
              <div className={styles.preview}>
                <img srcSet={`/images/content/upload-pic-2@2x.jpg 2x`} src="/images/content/upload-pic-2.jpg" alt="Create Single" />
              </div>
              <Link className={cn("button-stroke disabled", styles.button)} to="/upload-details">
                Create Multiple
              </Link>
            </div>
          </div>
          <div className={styles.note}>
            We do not own your private keys and cannot access your funds without
            your confirmation.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
