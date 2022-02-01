import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../store/actions";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from "@mui/material";
import TextInput from "../../../components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../../../utils/toast";
import cn from "classnames";
import styles from "./Admin.module.sass";
import Modal from "../../../components/Modal";

const Admin = () => {

    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [visibleModal, setVisibleModal] = useState(false);

    const admins = useSelector(state => state.adminReducer.data);

    useEffect(() => {
        dispatch(Actions.getAllAdmins());
    }, []);

    const addNewWallet = async () => {
        if (address) {
            let res = await Actions.saveAdmin(address);
            if (res) {
                toast.success("A new admin is added successfully!", toastOptions);
            } else {
                toast.error("Something went wrong!", toastOptions);
            }
            setVisibleModal(false);
        } else {
            toast.error("Please input wallet address!", toastOptions);
        }
        setAddress("");
        dispatch(Actions.getAllAdmins());
    };

    const deleteAddress = async (address) => {
        let res = await Actions.delAdmin(address);
        if (res) {
            toast.success("An admin is deleted successfully!", toastOptions);
        } else {
            toast.error("Something went wrong!", toastOptions);
        }
        dispatch(Actions.getAllAdmins());
    }

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
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableBody>
                            {admins.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.admin}</TableCell>
                                    <TableCell align="center">
                                        <p 
                                            className={styles.del_txt}
                                            onClick={() => deleteAddress(row.admin)}
                                        >
                                            DELETE
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            >
                <div className={styles.text_position}>
                    <TextInput
                        placeholder="Please input wallet address"
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                        className={cn("button-small")}
                        onClick={addNewWallet}
                    >
                        Add
                    </button>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default Admin;