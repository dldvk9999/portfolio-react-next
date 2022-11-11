import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

type modal = {
    show: boolean;
    onClose: Function;
    children: string;
    image: string;
    title: string;
};

const Modal = ({
    show,
    onClose,
    children = "",
    image = "",
    title = "",
}: modal) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHead}>
                    <div className={styles.modalHeader}>
                        <h3>{title}</h3>
                        <button
                            className={styles.modalClose}
                            onClick={handleCloseClick}
                        >
                            x
                        </button>
                    </div>
                    <div className={styles.modalBody}>{children}</div>
                </div>
                <div className={styles.modalContent}>
                    {image && (
                        <Image
                            src={image}
                            alt={image}
                            width={
                                window.innerWidth > 700
                                    ? window.innerWidth * 0.6
                                    : 500
                            }
                            height={window.innerHeight * 0.5}
                        ></Image>
                    )}
                </div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return modalContent;
    } else {
        return null;
    }
};

export default Modal;
