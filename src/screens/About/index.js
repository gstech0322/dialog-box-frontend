import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import cn from "classnames";
import styles from "./About.module.sass";
import parse from "html-react-parser";

const About = () => {

    const dispatch = useDispatch();

    const data = useSelector(state => state.articleReducer.data);

    useEffect(() => {
        dispatch(Actions.getAboutus());
    }, []);

    return (
        <div className={cn("container", styles.container)}>
            {data.length > 0 && parse(data[0].content)}
        </div>
    )
}

export default About;