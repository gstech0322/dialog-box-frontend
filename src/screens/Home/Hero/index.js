import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { _Contract } from "../../../utils/_contract";
import cn from "classnames";
import Slider from "react-slick";
import SlickArrow from "../../../components/SlickArrow";
import styles from "./Hero.module.sass";
import Icon from "../../../components/Icon";
import Player from "../../../components/Player";
import Modal from "../../../components/Modal";
import Connect from "../../../components/Connect";

const Hero = () => {

  const [visibleModalBid, setVisibleModalBid] = useState(false);

  const collections = useSelector(state => state.collectionReducer.data);

  const settings = {
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
  };

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <Slider className="creative-slider" {...settings}>
              {collections.length > 0 && collections.map((item, index) => (
                <div className={styles.slide} key={index}>
                  <div className={styles.row}>
                    <Player className={styles.player} item={item} />
                    <div className={styles.details}>
                      <div className={cn("h3", styles.subtitle)}>{item.title}</div>
                      <div className={styles.btns}>
                        <Link
                          className={cn("button", styles.button)}
                          to={`/collection/${item.collectionId}`}
                        >
                          Open Gallery
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Modal
        visible={visibleModalBid}
        onClose={() => setVisibleModalBid(false)}
      >
        <Connect />
      </Modal>
    </>
  );
};

export default Hero;
