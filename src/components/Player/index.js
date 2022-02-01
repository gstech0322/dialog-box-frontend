import React from "react";
import cn from "classnames";
import styles from "./Player.module.sass";
const { REACT_APP_API_URL } = process.env;

const Player = ({ className, item }) => {
  return (
    <div className={cn(styles.player, className)}>
      <div style={{ backgroundImage: `url(${REACT_APP_API_URL}/${item.img})`}} className={styles.player_img}></div>
      {/* <img
        srcSet={`${REACT_APP_API_URL}/${item.img} 2x`}
        src={`${REACT_APP_API_URL}/${item.img}`}
        alt="collection preview"
      /> */}
    </div>
  );
};

export default Player;
