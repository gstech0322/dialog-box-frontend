import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";
import styles from "./Collection.module.sass";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";

const Collection = () => {

    const collectionId = useParams().id;
    const dispatch = useDispatch();

    const data = useSelector(state => state.nftReducer.data);

    useEffect(() => {
        if (collectionId) {
            dispatch(Actions.getNFTs(collectionId));
        }
    }, [collectionId]);

    return (
        <div className={cn("section", styles.section)} >
            <div className={cn("container", styles.container)}>
                <div className={styles.list}>
                    <div className={styles.grid}>
                        {
                            collectionId && data.length > 0 && data[0].collectionId === collectionId ? 
                            data.map((item, index) => {
                                return <Card className={styles.card} item={item} key={index} />
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;