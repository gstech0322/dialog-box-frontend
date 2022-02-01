import React from "react";
import cn from "classnames";
import styles from "./TextInput.module.sass";

const TextInput = ({ className, label, value, ...props }) => {

  return (
    <div className={cn(styles.field, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <input className={styles.input} {...props} value={value} />
      </div>
    </div>
  );
};

export default TextInput;
