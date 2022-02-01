import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../store/actions";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../../../utils/toast";
import cn from "classnames";
import styles from "./Charity.module.sass";

const Charity = () => {

    const dispatch = useDispatch();

    const [content, setContent] = useState("");

    const data = useSelector(state => state.articleReducer.data);

    useEffect(() => {
        dispatch(Actions.getCharity());
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setContent(data[0].content);
        }
    }, [data]);

    const save = async () => {
        try {
            const save_data = {
                content: content
            }
            let res = await Actions.saveCharity(save_data);
            if (res) {
                toast.success("Saved successfully!", toastOptions);
            } else {
                toast.error("Internal Server Error!", toastOptions);
            }
        } catch (error) {
            toast.error(error, toastOptions);
        }
    };

    return (
        <div className={styles.charity_container}>
            <Editor
                apiKey="tml0yagduli6m46sog6ws2bz3o1hh6hksmxafp3b26bi74fl"
                initialValue={`${data.length > 0 && data[0].content}`}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | fontsizeselect | bold italic | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | image help',
                    images_upload_handler: async (blobInfo, success, failure) => {
                        let formData = new FormData();
                        formData.append('file', blobInfo.blob(), blobInfo.filename());
                        let url = await Actions.uploadTinyMCEImage(formData);
                        success(`${process.env.REACT_APP_API_URL}/${url}`);
                    }
                }}
                onChange={(e) => setContent(e.target.getContent())}
            />
            <div className={styles.save_btn_flex}>
                <div className={cn("button-small", styles.save_btn)}
                    onClick={save}
                >
                    Save
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Charity;