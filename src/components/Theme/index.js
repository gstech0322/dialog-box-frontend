import React from "react";
import cn from "classnames";
import styles from "./Theme.module.sass";

const Theme = ({ className }) => {

  return (
    <label
      className={cn(
        styles.theme,
        { [styles.theme]: className === "theme" },
        { [styles.themeBig]: className === "theme-big" }
      )}
    >
      <input
        className={styles.input}
        type="checkbox"
      />
      <span className={styles.inner}>
        <span className={styles.box}></span>
      </span>
    </label>
  );
};

export default Theme;
