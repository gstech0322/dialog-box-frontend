import React from "react";
import cn from "classnames";
import styles from "./Connect.module.sass";
import Icon from "../Icon";
import { Link } from "react-router-dom";

const Connect = ({ className }) => {
  return (
    <div className={cn(className, styles.connect)}>
      <div className={styles.icon}>
        <Icon name="wallet" size="24" />
      </div>
      <div className={styles.info}>
        You need to connect your wallet first to sign messages and send
        transaction to Ethereum network
      </div>
      <div className={styles.btns}>
        <Link className={cn("button", styles.button)} to="/connect-wallet">Connect wallet</Link>
        {/* <button className={cn("button-stroke", styles.button)}>Cancel</button> */}
      </div>
    </div>
  );
};

export default Connect;
