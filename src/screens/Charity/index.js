import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import styles from "./Charity.module.sass";
import cn from "classnames";
import parse from "html-react-parser";

const Charity = () => {

    const dispatch = useDispatch();

    const data = useSelector(state => state.articleReducer.data);

    useEffect(() => {
        dispatch(Actions.getCharity());
    }, []);

    return (
        <div className={cn("container", styles.container)}>
            {data.length > 0 && parse(data[0].content)}
        </div>
    )
}

export default Charity;