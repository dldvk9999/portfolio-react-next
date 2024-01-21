import { useEffect, useState } from "react";
import { get, update, create, del } from "@api/api";
import styles from "@styles/Home.module.scss";
import { scrollUp } from "pages/common";
import type { infoCategory, skillCategory } from "@type/admin/type";

const Admin = () => {
    const [information, setInfo] = useState<infoCategory>({
        name: "",
        birth: "",
        lastgraduate: "",
        isnew: "",
        tel: "",
        email: "",
        blog: "",
        github: "",
    });
    const [infoskills, setSkills] = useState<skillCategory>({
        Language: [],
        Frontend: [],
        Backend: [],
        Platform: [],
        Communication: [],
        VersionControl: [],
        Deployment: [],
        Certification: [],
    });
    const [act, setAct] = useState([
        {
            id: 0,
            name: "",
            start: "",
            end: "",
            introduce: "",
            position: "",
            takeaway: "",
            image: "",
        },
    ]);
    const [pro, setPro] = useState([
        {
            id: 0,
            name: "",
            start: "",
            end: "",
            introduce: "",
            stack: "",
            takeaway: "",
            image: "",
        },
    ]);
    const [isEditInfo, setEditInfo] = useState(false);
    const [isEditAct, setEditAct] = useState(false);
    const [isEditPro, setEditPro] = useState(false);
    const [originAct, setOriginAct] = useState(act);
    const [originPro, setOriginPro] = useState(pro);
    const [key, setKey] = useState("");

    // DB에서 info 가져오기
    function getInfo() {
        get("about").then((res: any) => {
            let info = res.data.data[0];
            setInfo({
                name: info.name,
                birth:
                    new Date(info.birth).getFullYear() +
                    "." +
                    (new Date(info.birth).getMonth() + 1) +
                    "." +
                    new Date(info.birth).getDate(),
                lastgraduate: info.lastgraduate,
                isnew: info.isnew === 0 ? "신입" : info.isnew + "년",
                tel: info.tel,
                email: info.email,
                blog: info.blog,
                github: info.github,
            });
            setSkills({
                Language: info.language.split(","),
                Frontend: info.frontend.split(","),
                Backend: info.backend.split(","),
                Platform: info.platform.split(","),
                Communication: info.communication.split(","),
                VersionControl: info.versioncontrol.split(","),
                Deployment: info.deployment.split(","),
                Certification: info.certification.split(","),
            });
        });
    }

    // DB에서 Activity list 가져오기
    async function getActivity() {
        await get("activity").then((res: any) => {
            let info = res.data.data;
            let result = [];
            for (let i = 0; i < info.length; i++) {
                result.push({
                    id: info[i].id,
                    name: info[i].name,
                    start:
                        new Date(info[i].start).getFullYear() +
                        "." +
                        (new Date(info[i].start).getMonth() + 1) +
                        "." +
                        new Date(info[i].start).getDate(),
                    end:
                        new Date(info[i].end).getFullYear() +
                        "." +
                        (new Date(info[i].end).getMonth() + 1) +
                        "." +
                        new Date(info[i].end).getDate(),
                    introduce: info[i].introduce,
                    position: info[i].position,
                    takeaway: info[i].takeaway,
                    image: info[i].image,
                });
            }
            setAct(result);
            setOriginAct(result);
        });
    }

    // DB에서 Project list 가져오기
    async function getProject() {
        await get("project").then((res: any) => {
            let info = res.data.data;
            let result = [];
            for (let i = 0; i < info.length; i++) {
                result.push({
                    id: info[i].id,
                    name: info[i].name,
                    start:
                        new Date(info[i].start).getFullYear() +
                        "." +
                        (new Date(info[i].start).getMonth() + 1) +
                        "." +
                        new Date(info[i].start).getDate(),
                    end:
                        new Date(info[i].end).getFullYear() +
                        "." +
                        (new Date(info[i].end).getMonth() + 1) +
                        "." +
                        new Date(info[i].end).getDate(),
                    introduce: info[i].introduce,
                    stack: info[i].stack,
                    takeaway: info[i].takeaway,
                    image: info[i].image,
                });
            }
            setPro(result);
            setOriginPro(result);
        });
    }

    function printInfo() {
        let result = [];
        let keys = Object.keys(information);
        let values = Object.values(information);
        for (let i = 0; i < keys.length; i++) {
            result.push(
                <div className={styles.adminInput} key={"admin-info-" + i}>
                    <span>{keys[i]}:</span>
                    <input
                        type="text"
                        defaultValue={values[i]}
                        onChange={(e) => (information[keys[i]] = e.target.value)}
                        readOnly={!isEditInfo}
                    />
                </div>
            );
        }
        return result;
    }

    function printSkills() {
        let result = [];
        let keys = Object.keys(infoskills);
        let values = Object.values(infoskills);
        for (let i = 0; i < keys.length; i++) {
            result.push(
                <div className={styles.adminInput} key={"admin-skills-" + i}>
                    <span>{keys[i]}:</span>
                    <input
                        type="text"
                        defaultValue={values[i].toString()}
                        onChange={(e) => (infoskills[keys[i]] = e.target.value.split(","))}
                        readOnly={!isEditInfo}
                    />
                </div>
            );
        }
        return result;
    }

    function printActs() {
        let result = [];
        for (let i = 0; i < act.length; i++) {
            result.push(
                <div className={styles.adminInput} key={"admin-acts-" + i}>
                    <svg
                        className={`${styles.adminEdit} ${styles.adminDelete}`}
                        onClick={() => deleteAct(act[i].id)}
                        viewBox="0 0 1024 1024"
                    >
                        <path d="M0 281.296l0 -68.355q1.953 -37.107 29.295 -62.496t64.449 -25.389l93.744 0l0 -31.248q0 -39.06 27.342 -66.402t66.402 -27.342l312.48 0q39.06 0 66.402 27.342t27.342 66.402l0 31.248l93.744 0q37.107 0 64.449 25.389t29.295 62.496l0 68.355q0 25.389 -18.553 43.943t-43.943 18.553l0 531.216q0 52.731 -36.13 88.862t-88.862 36.13l-499.968 0q-52.731 0 -88.862 -36.13t-36.13 -88.862l0 -531.216q-25.389 0 -43.943 -18.553t-18.553 -43.943zm62.496 0l749.952 0l0 -62.496q0 -13.671 -8.789 -22.46t-22.46 -8.789l-687.456 0q-13.671 0 -22.46 8.789t-8.789 22.46l0 62.496zm62.496 593.712q0 25.389 18.553 43.943t43.943 18.553l499.968 0q25.389 0 43.943 -18.553t18.553 -43.943l0 -531.216l-624.96 0l0 531.216zm62.496 -31.248l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224zm31.248 -718.704l374.976 0l0 -31.248q0 -13.671 -8.789 -22.46t-22.46 -8.789l-312.48 0q-13.671 0 -22.46 8.789t-8.789 22.46l0 31.248zm124.992 718.704l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224zm156.24 0l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224z" />
                    </svg>
                    <span>이름: </span>
                    <input
                        type="text"
                        defaultValue={act[i].name}
                        onChange={(e) => (act[i].name = e.target.value)}
                        readOnly={!isEditAct}
                    />
                    <span>시작일: </span>
                    <input
                        type="text"
                        defaultValue={act[i].start}
                        onChange={(e) => (act[i].start = e.target.value)}
                        readOnly={!isEditAct}
                    />
                    <span>종료일: </span>
                    <input
                        type="text"
                        defaultValue={act[i].end}
                        onChange={(e) => (act[i].end = e.target.value)}
                        readOnly={!isEditAct}
                    />
                    <span>소개: </span>
                    <input
                        type="text"
                        defaultValue={act[i].introduce}
                        onChange={(e) => (act[i].introduce = e.target.value)}
                        readOnly={!isEditAct}
                    />
                    <span>포지션: </span>
                    <input
                        type="text"
                        defaultValue={act[i].position}
                        onChange={(e) => (act[i].position = e.target.value)}
                        readOnly={!isEditAct}
                    />
                    <span>배운점: </span>
                    <input
                        type="text"
                        defaultValue={act[i].takeaway}
                        onChange={(e) => (act[i].takeaway = e.target.value)}
                        readOnly={!isEditAct}
                    />
                    <span>이미지: </span>
                    <input
                        type="text"
                        defaultValue={act[i].image}
                        onChange={(e) => (act[i].image = e.target.value)}
                        readOnly={!isEditAct}
                    />
                </div>
            );
        }
        return result;
    }

    function printPro() {
        let result = [];
        for (let i = 0; i < pro.length; i++) {
            result.push(
                <div className={styles.adminInput} key={"admin-pros-" + i}>
                    <svg
                        className={`${styles.adminEdit} ${styles.adminDelete}`}
                        onClick={() => deletePro(pro[i].id)}
                        viewBox="0 0 1024 1024"
                    >
                        <path d="M0 281.296l0 -68.355q1.953 -37.107 29.295 -62.496t64.449 -25.389l93.744 0l0 -31.248q0 -39.06 27.342 -66.402t66.402 -27.342l312.48 0q39.06 0 66.402 27.342t27.342 66.402l0 31.248l93.744 0q37.107 0 64.449 25.389t29.295 62.496l0 68.355q0 25.389 -18.553 43.943t-43.943 18.553l0 531.216q0 52.731 -36.13 88.862t-88.862 36.13l-499.968 0q-52.731 0 -88.862 -36.13t-36.13 -88.862l0 -531.216q-25.389 0 -43.943 -18.553t-18.553 -43.943zm62.496 0l749.952 0l0 -62.496q0 -13.671 -8.789 -22.46t-22.46 -8.789l-687.456 0q-13.671 0 -22.46 8.789t-8.789 22.46l0 62.496zm62.496 593.712q0 25.389 18.553 43.943t43.943 18.553l499.968 0q25.389 0 43.943 -18.553t18.553 -43.943l0 -531.216l-624.96 0l0 531.216zm62.496 -31.248l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224zm31.248 -718.704l374.976 0l0 -31.248q0 -13.671 -8.789 -22.46t-22.46 -8.789l-312.48 0q-13.671 0 -22.46 8.789t-8.789 22.46l0 31.248zm124.992 718.704l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224zm156.24 0l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224z" />
                    </svg>
                    <span>이름: </span>
                    <input
                        type="text"
                        defaultValue={pro[i].name}
                        onChange={(e) => (pro[i].name = e.target.value)}
                        readOnly={!isEditPro}
                    />
                    <span>시작일: </span>
                    <input
                        type="text"
                        defaultValue={pro[i].start}
                        onChange={(e) => (pro[i].start = e.target.value)}
                        readOnly={!isEditPro}
                    />
                    <span>종료일: </span>
                    <input
                        type="text"
                        defaultValue={pro[i].end}
                        onChange={(e) => (pro[i].end = e.target.value)}
                        readOnly={!isEditPro}
                    />
                    <span>소개: </span>
                    <input
                        type="text"
                        defaultValue={pro[i].introduce}
                        onChange={(e) => (pro[i].introduce = e.target.value)}
                        readOnly={!isEditPro}
                    />
                    <span>기술스택: </span>
                    <input
                        type="text"
                        defaultValue={pro[i].stack}
                        onChange={(e) => (pro[i].stack = e.target.value)}
                        readOnly={!isEditPro}
                    />
                    <span>배운점: </span>
                    <input
                        type="text"
                        defaultValue={pro[i].takeaway}
                        onChange={(e) => (pro[i].takeaway = e.target.value)}
                        readOnly={!isEditPro}
                    />
                    <span>이미지: </span>
                    <input
                        type="text"
                        defaultValue={pro[i].image}
                        onChange={(e) => (pro[i].image = e.target.value)}
                        readOnly={!isEditPro}
                    />
                </div>
            );
        }
        return result;
    }

    async function updateInfo() {
        if (confirm("수정하시겠습니까?")) {
            let data = {
                name: information.name,
                birth: information.birth,
                lastgraduate: information.lastgraduate,
                isnew: information.isnew === "신입" ? 0 : Number(information.isnew.slice(0, -1)),
                tel: information.tel,
                email: information.email,
                blog: information.blog,
                github: information.github,
                language: infoskills.Language.toString(),
                frontend: infoskills.Frontend.toString(),
                backend: infoskills.Backend.toString(),
                platform: infoskills.Platform.toString(),
                communication: infoskills.Communication.toString(),
                versioncontrol: infoskills.VersionControl.toString(),
                deployment: infoskills.Deployment.toString(),
                certification: infoskills.Certification.toString(),
            };
            if (key !== "") {
                await update("about", data, key).then((res) => {
                    if (res) {
                        alert("수정되었습니다.");
                        setEditInfo(false);
                    } else {
                        alert("입력된 key가 올바르지 않습니다.");
                    }
                });
            } else {
                alert("key 입력은 필수입니다.");
            }
        }
    }

    function cancelInfo() {
        getInfo();
        setEditInfo(false);
    }

    function addAct() {
        setAct([
            ...act,
            {
                id: 0,
                name: "",
                start: "",
                end: "",
                introduce: "",
                position: "",
                takeaway: "",
                image: "",
            },
        ]);
    }

    function cancelAct() {
        if (confirm("되돌리겠습니까? 작성한 내용은 복구되지 않습니다.")) {
            getActivity();
            setEditAct(false);
        }
    }

    async function updateAct() {
        if (confirm("수정하시겠습니까?")) {
            if (key !== "") {
                let updateResult: boolean[] = [];
                // 기존 Acts 수정
                for (let i = 0; i < originAct.length; i++) {
                    await update("activity", act[i], key).then((res) => {
                        updateResult.push(res);
                    });
                }

                // 신규 Acts 생성
                for (let i = originAct.length; i < act.length; i++) {
                    await create("activity", act[i], key).then((res) => {
                        updateResult.push(res);
                    });
                }

                if (updateResult.every((x) => x)) {
                    alert("수정되었습니다.");
                    getActivity();
                    setEditAct(false);
                } else {
                    alert("수정에 실패했습니다. 콘솔을 확인 바랍니다.");
                }
            } else {
                alert("key 입력은 필수입니다.");
            }
        }
    }

    async function deleteAct(id: number) {
        if (confirm("삭제하시겠습니까? 삭제 후 복구는 불가합니다.")) {
            if (key !== "") {
                await del("activity", id, key)
                    .then((res) => {
                        if (res) {
                            alert("삭제하였습니다.");
                            getActivity();
                            setEditAct(false);
                        } else {
                            alert("삭제 오류! 콘솔을 확인해주세요.");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                alert("key 입력은 필수입니다.");
            }
        }
    }

    function addPro() {
        setPro([
            ...pro,
            {
                id: 0,
                name: "",
                start: "",
                end: "",
                introduce: "",
                stack: "",
                takeaway: "",
                image: "",
            },
        ]);
    }

    function cancelPro() {
        if (confirm("되돌리겠습니까? 작성한 내용은 복구되지 않습니다.")) {
            getProject();
            setEditPro(false);
        }
    }

    async function updatePro() {
        if (confirm("수정하시겠습니까?")) {
            if (key !== "") {
                let updateResult: boolean[] = [];
                // 기존 Pros 수정
                for (let i = 0; i < originPro.length; i++) {
                    await update("project", pro[i], key).then((res) => {
                        updateResult.push(res);
                    });
                }

                // 신규 Pros 생성
                for (let i = originPro.length; i < pro.length; i++) {
                    await create("project", pro[i], key).then((res) => {
                        updateResult.push(res);
                    });
                }

                if (updateResult.every((x) => x)) {
                    alert("수정되었습니다.");
                    getProject();
                    setEditPro(false);
                } else {
                    alert("수정에 실패했습니다. 콘솔을 확인 바랍니다.");
                }
            } else {
                alert("key 입력은 필수입니다.");
            }
        }
    }

    async function deletePro(id: number) {
        if (confirm("삭제하시겠습니까? 삭제 후 복구는 불가합니다.")) {
            if (key !== "") {
                await del("project", id, key)
                    .then((res) => {
                        if (res) {
                            alert("삭제하였습니다.");
                            getProject();
                            setEditPro(false);
                        } else {
                            alert("삭제 오류! 콘솔을 확인해주세요.");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("삭제 오류! 콘솔을 확인해주세요.");
                    });
            } else {
                alert("key 입력은 필수입니다.");
            }
        }
    }

    useEffect(() => {
        scrollUp();

        // 각 페이지에 최초로 출력되는 타이틀 자동으로 숨겨지게 처리
        setTimeout(() => {
            let pageTitle = document.querySelector("#pageTitle") as HTMLElement;
            pageTitle.style.opacity = "0";
        }, 1000);
        setTimeout(() => {
            let pageTitle = document.querySelector("#pageTitle") as HTMLElement;
            pageTitle.style.display = "none";
        }, 2000);

        getInfo();
        getActivity();
        getProject();
    }, []);

    return (
        <main className={styles.main}>
            <h1 id="pageTitle">Admin</h1>
            <section className={styles.adminSection}>
                <h2 className={styles.adminTitle}>
                    About
                    {!isEditInfo ? (
                        <svg
                            onClick={() => setEditInfo(true)}
                            className={styles.adminEdit}
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                            <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
                        </svg>
                    ) : (
                        <span>
                            <svg
                                className={styles.adminEdit}
                                onClick={() => updateInfo()}
                                viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M3172 2967 l-1542 -1542 -608 608 c-334 334 -612 607 -617 607 -6 0 -100 -90 -210 -200 l-200 -200 810 -810 c445 -446 814 -810 820 -810 6 0 794 784 1753 1743 l1742 1742 -203 203 -202 202 -1543 -1543z" />
                                </g>
                            </svg>
                            <svg className={styles.adminEdit} onClick={() => cancelInfo()} viewBox="0 0 50 50">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                            </svg>
                            <input type="password" placeholder="password" onChange={(e) => setKey(e.target.value)} />
                        </span>
                    )}
                </h2>
                <div className={styles.adminAreaCustom}>
                    <div>{printInfo()}</div>
                    <div>{printSkills()}</div>
                </div>
            </section>

            <section className={styles.adminSection}>
                <h2 className={styles.adminTitle}>
                    Activity
                    {!isEditAct ? (
                        <svg onClick={() => setEditAct(true)} className={styles.adminEdit} viewBox="0 0 1024 1024">
                            <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                            <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
                        </svg>
                    ) : (
                        <span>
                            <svg
                                onClick={() => addAct()}
                                className={styles.adminEdit}
                                viewBox="0 0 122.875 122.648"
                                enableBackground="new 0 0 122.875 122.648"
                            >
                                <g>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M108.993,47.079c7.683-0.059,13.898,6.12,13.882,13.805 c-0.018,7.683-6.26,13.959-13.942,14.019L75.24,75.138l-0.235,33.73c-0.063,7.619-6.338,13.789-14.014,13.78 c-7.678-0.01-13.848-6.197-13.785-13.818l0.233-33.497l-33.558,0.235C6.2,75.628-0.016,69.448,0,61.764 c0.018-7.683,6.261-13.959,13.943-14.018l33.692-0.236l0.236-33.73C47.935,6.161,54.209-0.009,61.885,0 c7.678,0.009,13.848,6.197,13.784,13.818l-0.233,33.497L108.993,47.079L108.993,47.079z"
                                    />
                                </g>
                            </svg>
                            <svg
                                className={styles.adminEdit}
                                onClick={() => updateAct()}
                                viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M3172 2967 l-1542 -1542 -608 608 c-334 334 -612 607 -617 607 -6 0 -100 -90 -210 -200 l-200 -200 810 -810 c445 -446 814 -810 820 -810 6 0 794 784 1753 1743 l1742 1742 -203 203 -202 202 -1543 -1543z" />
                                </g>
                            </svg>
                            <svg className={styles.adminEdit} onClick={() => cancelAct()} viewBox="0 0 50 50">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                            </svg>
                            <input type="password" placeholder="password" onChange={(e) => setKey(e.target.value)} />
                        </span>
                    )}
                </h2>
                <div className={styles.adminAreaCustom}>{printActs()}</div>
            </section>

            <section className={styles.adminSection}>
                <h2 className={styles.adminTitle}>
                    Project
                    {!isEditPro ? (
                        <svg onClick={() => setEditPro(true)} className={styles.adminEdit} viewBox="0 0 1024 1024">
                            <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                            <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
                        </svg>
                    ) : (
                        <span>
                            <svg
                                onClick={() => addPro()}
                                className={styles.adminEdit}
                                viewBox="0 0 122.875 122.648"
                                enableBackground="new 0 0 122.875 122.648"
                            >
                                <g>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M108.993,47.079c7.683-0.059,13.898,6.12,13.882,13.805 c-0.018,7.683-6.26,13.959-13.942,14.019L75.24,75.138l-0.235,33.73c-0.063,7.619-6.338,13.789-14.014,13.78 c-7.678-0.01-13.848-6.197-13.785-13.818l0.233-33.497l-33.558,0.235C6.2,75.628-0.016,69.448,0,61.764 c0.018-7.683,6.261-13.959,13.943-14.018l33.692-0.236l0.236-33.73C47.935,6.161,54.209-0.009,61.885,0 c7.678,0.009,13.848,6.197,13.784,13.818l-0.233,33.497L108.993,47.079L108.993,47.079z"
                                    />
                                </g>
                            </svg>
                            <svg
                                className={styles.adminEdit}
                                onClick={() => updatePro()}
                                viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M3172 2967 l-1542 -1542 -608 608 c-334 334 -612 607 -617 607 -6 0 -100 -90 -210 -200 l-200 -200 810 -810 c445 -446 814 -810 820 -810 6 0 794 784 1753 1743 l1742 1742 -203 203 -202 202 -1543 -1543z" />
                                </g>
                            </svg>
                            <svg className={styles.adminEdit} onClick={() => cancelPro()} viewBox="0 0 50 50">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                            </svg>
                            <input type="password" placeholder="password" onChange={(e) => setKey(e.target.value)} />
                        </span>
                    )}
                </h2>
                <div className={styles.adminAreaCustom}>{printPro()}</div>
            </section>
        </main>
    );
};

export default Admin;
