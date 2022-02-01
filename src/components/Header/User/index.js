import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import { useWeb3React } from "@web3-react/core"
import Web3 from 'web3'
import ADVAR_ABI from '../../../config/abis/advarToken.json';
import { advarAddress } from '../../../config/constants';

const items = [
  {
    title: "My profile",
    icon: "user",
    url: "/profile",
  },
  {
    title: "My items",
    icon: "image",
    url: "/item",
  },
  {
    title: "Dark theme",
    icon: "bulb",
  },
  // {
  //   title: "Disconnect",
  //   icon: "exit",
  //   url: "/",
  // },
];

const User = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const web3 = (library)? new Web3(library):null;
  const contract = (web3)? new web3.eth.Contract(ADVAR_ABI, advarAddress): null;
  let newAccount = undefined;

  const disconnectWallet = async() => {
    await disconnect();
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  const getBalance = async() => {
    if(account !== undefined) {
      const _balance = await contract.methods.balanceOf(account).call();
      setBalance(_balance);
    }
  }

  useEffect(() => {
      getBalance().then();
  },[account]);

  return account? (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>

      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src="/images/content/avatar-user.jpg" alt="Avatar" />
          </div>
          <div className={styles.wallet}>
            { (balance / 1e9).toFixed(0)} <span className={styles.currency}>ADVAR</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>unknown</div>
            <div className={styles.code}>
              <div className={styles.number}>{account.slice(0,10) + "..." + account.slice(-4)}</div>
              <button className={styles.copy}>
                <Icon name="copy" size="16" />
              </button>
            </div>
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/images/content/etherium-circle.jpg"
                    alt="ADVAR"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>{ (balance / 1e9).toFixed(0)} ADVAR</div>
                </div>
              </div>
              <a target={'_blank'} href={'https://pancakeswap.finance/swap/0x67F182f0191156A52c1e517973aa81e04418339a'}>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                buy ADVAR
              </button>
              </a>
            </div>
            <div className={styles.menu}>
              {items.map((x, index) =>
                x.url ? (
                  x.url.startsWith("http") ? (
                    <a
                      className={styles.item}
                      href={x.url}
                      rel="noopener noreferrer"
                      key={index}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </a>
                  ) : (
                    <Link
                      className={styles.item}
                      to={x.url}
                      onClick={() => setVisible(!visible)}
                      key={index}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </Link>
                  )
                ) : (
                  <div className={styles.item} key={index}>
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
                    <Theme className={styles.theme} />
                  </div>
                )
              )}
              <button onClick={disconnectWallet}>
                <div className={styles.item}>
                  <div className={styles.icon}>
                    <Icon name={'exit'} size="20" />
                  </div>
                  <div className={styles.text}>{"Disconnect"}</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  ):(
      <></>
  );
};

export default User;
