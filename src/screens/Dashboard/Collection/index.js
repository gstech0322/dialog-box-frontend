import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../store/actions";
import TextInput from "../../../components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../../../utils/toast";
import cn from "classnames";
import Dropzone from "react-dropzone";
import Icon from "../../../components/Icon";
import styles from "./Collection.module.sass";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Collection = () => {

    const dispatch = useDispatch();

    const dropRef = useRef();
    const scrollRef = useRef();

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleDelModal, setVisibleDelModal] = useState(false);
    const [collectionId, setCollectionId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    // const [token, setToken] = useState("");
    // const [marketplace, setMarketplace] = useState("");

    const collections = useSelector(state => state.collectionReducer.data);

    useEffect(() => {
        dispatch(Actions.getCollections());
    }, []);

    useEffect(() => {
        (visibleModal || visibleDelModal) ? disableBodyScroll(scrollRef) : enableBodyScroll(scrollRef);
    }, [visibleModal, visibleDelModal]);

    const onDrop = async (files) => {
        try {
            if (files.length > 0 && files[0].type.slice(0, 6) === "image/") {
                const uploadedFile = files[0];
                var formData = new FormData();
                formData.append("file", uploadedFile);

                let url = await Actions.uploadCollectionImage(formData);
                setImageUrl(url);
                setFile(uploadedFile);
            } else {
                toast.warn("This is not image. Please upload only image!", toastOptions);
            }
        } catch (error) {
            toast.error(error.message, toastOptions);
        }
    };

    const removeImage = () => {
        Actions.removeImage(imageUrl);
        setImageUrl("");
        setFile(null);
    };

    const save = async () => {
        if (imageUrl && title) {
            let data = {};
            let result = false;
            data.title = title;
            data.img = imageUrl;
            // data.tokenAddress = token;
            // data.marketplaceAddress = marketplace;
            if (collectionId) {
                data.collectionId = collectionId;
                result = await Actions.updateCollection(data);
            } else {
                result = await Actions.saveCollection(data);
            }
            if (result) {
                dispatch(Actions.getCollections());
                if (collectionId) {
                    toast.success("Updated successfully!", toastOptions);
                } else {
                    toast.success("Added successfully!", toastOptions);
                }
                setVisibleModal(false);
            } else {
                toast.error("Something went wrong!", toastOptions);
                setVisibleModal(false);
            }
        } else {
            toast.error("Fill in all fields completely!", toastOptions);
        }
    };

    const cancel = () => {
        setVisibleModal(false);
        setCollectionId("");
        setImageUrl("");
        setTitle("");
        // setToken("");
        // setMarketplace("");
    };

    const update = (data) => {
        setVisibleModal(true);
        setCollectionId(data.collectionId);
        setImageUrl(data.img);
        setTitle(data.title);
        // setToken(data.tokenAddress);
        // setMarketplace(data.marketplaceAddress);
    };

    const deleteModal = (data) => {
        setVisibleDelModal(true);
        setImageUrl(data.img);
        setCollectionId(data.collectionId);
    };

    const deleteItem = async () => {
        Actions.removeImage(imageUrl);
        let res = await Actions.deleteCollection(collectionId);
        if (res) {
            dispatch(Actions.getCollections());
            toast.success("Deleted successfully!", toastOptions);
            setVisibleDelModal(false);
            setImageUrl("");
            setCollectionId("");
        } else {
            toast.error("Something went wrong!", toastOptions);
        }
    };

    const cancelDelete = () => {
        setVisibleDelModal(false);
        setCollectionId("");
    };

    return (
        <div className={styles.table_container}>
            <div className={styles.btn_position}>
                <button
                    className={cn("button-small")}
                    onClick={() => setVisibleModal(true)}
                >
                    Add
                </button>
            </div>
            {
                collections.map((item, index) => (
                    <div className={styles.collection_card} key={index}>
                        <div className={styles.column}>
                            <img src={`${process.env.REACT_APP_API_URL}/${item.img}`} className={styles.collection_img} />
                        </div>
                        <div className={styles.column}>
                            {/* <p>Title</p> */}
                            <div className={cn("h4", styles.title_size)}>{item.title}</div>
                            {/* <p>Token Address</p> */}
                            {/* <h5>{item.tokenAddress}</h5> */}
                            {/* <p>Marketplace Address</p> */}
                            {/* <h5>{item.marketplaceAddress}</h5> */}
                            <div className={styles.car_btns}>
                                <button className={cn("button-small button-stroke")} onClick={() => update(item)}>Update</button>
                                <button className={cn("button-small")} disabled onClick={() => deleteModal(item)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div>
            </div>
            {
                visibleModal &&
                <div className={styles.add_modal} ref={scrollRef}>
                    <div className={styles.add_modal_content}>
                        <div className={styles.list}>
                            <div className={styles.category}>Collection Details</div>
                            <div className={styles.note}>
                                Drag or choose your file to upload
                            </div>
                            <div>
                                {imageUrl ?
                                    <div className={styles.preview_}>
                                        <div className={styles.preview_img} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${imageUrl})` }}>
                                            <div className={styles.close_img} onClick={removeImage}>
                                                <Icon name="close" size="25" />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <Dropzone onDrop={onDrop} accept="image/*">
                                        {({ getRootProps, getInputProps }) => (
                                            <div
                                                {...getRootProps({ className: "drop-zone" })}
                                                ref={dropRef}
                                                className={styles.file}
                                            >
                                                <input {...getInputProps()} className={styles.load} />
                                                <div className={styles.icon}>
                                                    <Icon name="upload-file" size="24" />
                                                </div>
                                                <div className={styles.format}>
                                                    PNG, JPG, JPEG, GIF, WEBP
                                                </div>
                                                {file && (
                                                    <div>
                                                        <strong>Selected file:</strong> {file.name}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Dropzone>
                                }
                            </div>
                            <div className={styles.fieldset}>
                                <TextInput
                                    className={styles.field}
                                    label="Collection Name"
                                    name="Title"
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                                {/* <TextInput
                                    className={styles.field}
                                    label="Token Address"
                                    name="Token"
                                    type="text"
                                    onChange={(e) => setToken(e.target.value)}
                                    value={token}
                                    required
                                />
                                <TextInput
                                    className={styles.field}
                                    label="Marketplace Address"
                                    name="Marketplace"
                                    type="text"
                                    onChange={(e) => setMarketplace(e.target.value)}
                                    value={marketplace}
                                    required
                                /> */}
                                <div className={styles.modal_btns}>
                                    <button
                                        className={cn("button-small", styles.update_btn)}
                                        onClick={save}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className={cn("button-small button-stroke")}
                                        onClick={cancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                visibleDelModal &&
                <div className={styles.add_modal} ref={scrollRef}>
                    <div className={styles.del_modal_content}>
                        <h4>Do you want to delete this collection?</h4>
                        <div className={styles.del_btn_position}>
                            <button className={cn("button-small")} onClick={deleteItem}>Yes</button>
                            <button className={cn("button-small button-stroke")} onClick={cancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            }
            <ToastContainer />
        </div>
    )
};

export default Collection;