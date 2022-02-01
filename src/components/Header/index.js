import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";

const openseaIcon = "/images/icons/opensea.png";

const Headers = () => {

  const dispatch = useDispatch();

  const [visibleNav, setVisibleNav] = useState(false);
  const [visibleCollectionsNav, setVisibleCollectionsNav] = useState(false);
  const [state, setState] = useState(false);

  console.log("connection state:", state);

  const auth = useSelector(state => state.authReducer.data);
  const collections = useSelector(state => state.collectionReducer.data);

  useEffect(() => {
    dispatch(Actions.getCollections());
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        console.log("eth_accounts:", accounts);
        if (accounts.length > 0) {
          const address = accounts[0].toUpperCase();
          dispatch(Actions.getAuth(address));
          setState(true);
        } else {
          setState(false);
        }
      })
      window.ethereum.on('accountsChanged', function (accounts) {
        console.log("accountsChanged:", accounts);
        if (accounts.length === 0) {
          setState(false);
        } else {
          const address = accounts[0].toUpperCase();
          dispatch(Actions.getAuth(address));
          setState(true);
        }
      })
    }
  }, []);

  const setVisableNavBar = () => {
    setVisibleNav(!visibleNav);
    if (visibleCollectionsNav) {
      setVisibleCollectionsNav(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/" onClick={() => { setVisibleNav(false) }}>
          <Image
            className={styles.pic}
            src="/images/logo.png"
            srcDark="/images/logo.png"
            alt="Fitness Pro"
          />
          <div className={styles.site_title}>dialog box</div>
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            <div className={styles.dropdown}>
              <div className={styles.collection}>
                <div className={styles.collection_nav} onClick={() => { setVisibleCollectionsNav(true) }}>
                  <div className={styles.collection_name}>
                    <div>
                      Collections
                    </div>
                    <div className={styles.arrow_next_icon}>
                      <Icon name="arrow-next" fill='#777E90' size={20} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.dropdown_content}>
                {collections.length > 0 && collections.map((item, index) => {
                  return <Link key={index} to={{ pathname: `/collection/${item.collectionId}` }} className={styles.dropdown_content_item} onClick={() => { setVisibleNav(false) }}> {item.title} </Link>
                })}
              </div>
            </div>
            <Link className={styles.link} to="/about" onClick={() => { setVisibleNav(false) }}>
              About us
            </Link>
            <Link className={styles.link} to="/charity" onClick={() => { setVisibleNav(false) }}>
              Charity
            </Link>
            {
              state && Object.keys(auth).length > 0 && auth.address !== 'undefined'
                ?
                auth.role === "admin"
                  ?
                  <>
                    <Link className={styles.link} to="/dashboard" onClick={() => { setVisibleNav(false) }}>
                      Dashboard
                    </Link>
                    <Link className={styles.link} to="/create" onClick={() => { setVisibleNav(false) }}>
                      Create
                    </Link>
                  </>
                  : null
                : <Link className={styles.link} to="/connect-wallet" onClick={() => { setVisibleNav(false) }}>Connect Wallet</Link>
            }
          </nav>
        </div>
        <div className={cn(styles.collection_wrapper, { [styles.active]: visibleCollectionsNav })}>
          <nav className={styles.nav}>
            <div className={styles.collection_menu}>
              <div className={styles.collection_nav_menu} onClick={() => { setVisibleCollectionsNav(false) }}>
                <div className={styles.collection_nav_name}>
                  <div className={styles.arrow_prev_icon}>
                    <Icon name="arrow-prev" fill='#777E90' size={20} />
                  </div>
                  <div>
                    Collections
                  </div>
                </div>
              </div>
            </div>
            {collections.length > 0 && collections.map((item, index) => {
              return (
                <Link
                  className={styles.collection_nav_link}
                  to={{ pathname: `/collection/${item.collectionId}` }}
                  onClick={() => {
                    setVisibleCollectionsNav(false)
                    setVisibleNav(false)
                  }}
                  key={index}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
        {
          state && Object.keys(auth).length > 0 && auth.address !== 'undefined'
            ?
            auth.role === "admin"
              ?
              <>
                <Link className={cn("button-stroke button-small", styles.button)} to="/dashboard" onClick={setVisableNavBar}>Dashboard</Link>
                <Link className={cn("button-small", styles.button)} to="/create" onClick={setVisableNavBar}>Create</Link>
              </>
              :
              null
            :
            <Link className={cn("button-stroke button-small", styles.button)} to="/connect-wallet" onClick={setVisableNavBar}>Connect Wallet</Link>
        }
        <ul className={styles.social}>
          <li>
            <a href="https://twitter.com/dialogboxNFT">
              <Icon name="twitter" fill="#777E90" size={27} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/dialogbox_nft/">
              <Icon name="instagram" fill="#777E90" size={27} />
            </a>
          </li>
          <li>
            <a href="https://opensea.io">
              <img src={openseaIcon} className={styles.openseaIcon} />
            </a>
          </li>
        </ul>
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={setVisableNavBar}
        ></button>
      </div>
    </header>
  );
};

export default Headers;