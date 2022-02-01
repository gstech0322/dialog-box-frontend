import React from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../../utils/toast";
import cn from "classnames";
import styles from "./ConnectWallet.module.sass";
import Icon from "../../components/Icon";

const Connect = () => {

  const dispatch = useDispatch();

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            toast.success("Wallet connected Successfully!", toastOptions);
            const address = accounts[0].toUpperCase();
            dispatch(Actions.getAuth(address));
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            toast.error("Please connect to MetaMask!", toastOptions);
          } else {
            toast.error(err.message, toastOptions);
          }
        });
    } else {
      toast.error("Please install MetaMask!", toastOptions);
    }
  }

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <Link className={styles.back} to="/">
            <Icon name="arrow-prev" size="24" />
            <div className={cn("h2", styles.stage)}>Connect your wallet</div>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.menu}>

            <div className={cn(styles.link)} onClick={connectMetaMask}>
              <div className={styles.icon} style={{ backgroundColor: "#9757D7" }}>
                <Icon name="wallet" size="24" />
                <Icon name="check" size="18" fill={"#9757D7"} />
              </div>
              <span>MetaMask Wallet</span>
              <div className={styles.arrow}>
                <Icon name="arrow-next" size="14" />
              </div>
            </div>

          </div>
          {/* <div className={styles.wrapper}>
            <div className={styles.bg}>
              <img
                srcSet="/images/content/connect-bg@2x.jpg 2x"
                src="/images/content/connect-bg.jpg"
                alt="Connect wallet"
              />
            </div>
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Connect;
