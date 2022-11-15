import React, { useEffect, useState } from "react";
import Image from "next/image";
import Scrollbar from "smooth-scrollbar";
import styles from "../styles/Home.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

type modal = {
    show: boolean;
    onClose: Function;
    children: string;
    image: string | Array<string>;
    title: string;
    index: number;
    category: "activity" | "project";
};

const Modal = ({
    show,
    onClose,
    children = "",
    image = "",
    title = "",
    index,
    category,
}: modal) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const headerHeight = 16 * Number(styles.headerHeight.slice(0, -3));
    let scroll: any;

    // modal이 스크롤 할 때 fixed하게 이동시키기
    function modalScroller() {
        let modal = document.querySelectorAll("." + styles.modalOverlay)[
            index
        ] as HTMLElement;
        if (modal && scroll!.scrollTop >= headerHeight)
            modal.style.top = scroll!.scrollTop + "px";
        else if (modal && scroll!.scrollTop < headerHeight)
            modal.style.top = headerHeight + "px";
    }

    // modal close handler
    const handleCloseClick = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        onClose();
    };

    // image가 배열로 들어올 경우 image를 carousel로 구현
    function imageSlider(
        category: string,
        images: Array<string>,
        title: string
    ) {
        let result = [];
        for (let i = 0; i < images.length; i++) {
            result.push(
                <div key={"modal-images-" + i}>
                    <Image
                        src={"/" + category + "/" + images[i] + ".webp"}
                        alt={title + "_" + i}
                        className={styles.modalImage}
                        width={800}
                        height={400}
                    ></Image>
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        setIsBrowser(true);

        scroll = Scrollbar.get(document.querySelector("#root") as HTMLElement);
        scroll?.addListener(() => modalScroller());
        return scroll?.removeListener(() => modalScroller());
    }, []);

    const modalContent = (
        <div
            className={`${styles.modalOverlay} ${show ? styles.modalShow : ""}`}
        >
            <div className={styles.modal}>
                <div className={styles.modalHead}>
                    <div className={styles.modalHeader}>
                        <h3>{title}</h3>
                        <button
                            className={styles.modalClose}
                            onClick={handleCloseClick}
                        >
                            <svg
                                fill="#000000"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                                width="30px"
                                height="30px"
                            >
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                            </svg>
                        </button>
                    </div>
                    <div className={styles.modalBody}>{children}</div>
                    <div className={styles.modalDesc}>
                        * 이미지를 클릭하시면 새 탭에서 크게 보실 수 있습니다.
                    </div>
                </div>
                <div className={styles.modalContent}>
                    {typeof image === "string" ? (
                        <Image
                            src={"/" + category + "/" + image + ".webp"}
                            alt={title + " image"}
                            className={styles.modalImage}
                            width={800}
                            height={400}
                            onClick={() =>
                                window.open(
                                    "/" + category + "/" + image + ".webp",
                                    "_blank"
                                )
                            }
                        ></Image>
                    ) : (
                        <Carousel
                            showThumbs={false}
                            autoPlay
                            infiniteLoop
                            dynamicHeight
                            emulateTouch
                            transitionTime={1000}
                            showStatus={false}
                            interval={4000}
                            stopOnHover
                            onClickItem={(index) =>
                                window.open(
                                    "/" +
                                        category +
                                        "/" +
                                        image[index] +
                                        ".webp",
                                    "_blank"
                                )
                            }
                            className={styles.modalCarousel}
                        >
                            {imageSlider(category, image, title)}
                        </Carousel>
                    )}
                </div>
            </div>
        </div>
    );

    return isBrowser ? modalContent : null;
};

export default Modal;
