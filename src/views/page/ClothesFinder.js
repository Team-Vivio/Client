import React, { useEffect, useState } from "react";
import styles from "../../styles/ClothesFinder/ClothesFinder.module.css";

import img_top from "../../img/ClothesFinder/clothes_top.png";
import img_bot from "../../img/ClothesFinder/clothes_bottom.png";
import dropBox from "../../img/ClothesFinder/dropBox.png";

function DropBox({ viewModel }) {
    const [uploadedInfo, setUploadedInfo] = useState(null);

    const setImage = (file) => {
        const { name, type } = file;
        const size = (file.size / (1024 * 1024)).toFixed(2) + "mb";

        const reader = new FileReader();
        reader.onload = () => {
            const img = {
                name,
                size,
                type,
                imageUrl: String(reader.result),
            };
            setUploadedInfo(img);
            viewModel.setUploadedImgLink(img.imageUrl);
            viewModel.setUploadedImg(file);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        setImage(file);
    };

    const handleUpload = ({ target }) => {
        const file = target.files[0];
        setImage(file);
    };

    return (
        <div className={styles.DropBox}>
            <label
                className={styles.DropLabel}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className={styles.DropInput}
                    onChange={handleUpload}
                />
                {uploadedInfo !== null ? (
                    <img
                        src={uploadedInfo.imageUrl}
                        alt="DropBox"
                        className={styles.InfoImg}
                    ></img>
                ) : (
                    <>
                        <img
                            className={styles.DropImg}
                            src={dropBox}
                            alt="DropBox"
                        ></img>
                        <p className={styles.DropText}>
                            클릭 혹은 파일을 이곳에 드롭 하세요
                        </p>
                    </>
                )}
            </label>
        </div>
    );
}

function Modal({ viewModel, state, type, event, close }) {
    const modalMessage = [
        {
            message: "이동하시겠어요?\n작업한 내용이 삭제 되요",
            btn: "이동하기",
        },
        {
            message: "제대로 입력했는지 확인해주세요\n기존 작업물은 저장됩니다",
            btn: "시작하기",
        },
        {
            message: "상의 & 하의 여부 및 이미지는 필수로 입력해주세요",
            btn: "입력하기",
        },
        {
            message: "추천에 실패했어요\n정보를 다시 입력하고 다시 해주세요",
            btn: "입력하기",
        },
    ];
    return (
        <div>
            {state ? (
                <div className={styles.ModalBackground}>
                    <div className={styles.Modal}>
                        <button
                            className={styles.ModalClose}
                            onClick={close}
                        ></button>
                        <div className={styles.ModalContent}>
                            <div className={styles.ModalItem1}>*주의!</div>
                            <div className={styles.ModalItem2}>
                                {modalMessage[type].message}
                            </div>
                            <button
                                className={styles.ModalEnter}
                                onClick={event}
                            >
                                {modalMessage[type].btn}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function InputSetting({ viewModel }) {
    const [btn1, setBtn1] = useState(true);
    const [btn2, setBtn2] = useState(true);
    const [btnValue, setBtnValue] = useState(0);

    function ClickBtn1() {
        setBtnValue(1);
        setBtn1(true);
        setBtn2(false);
        viewModel.setType("top");
    }
    function ClickBtn2() {
        setBtnValue(2);
        setBtn1(false);
        setBtn2(true);
        viewModel.setType("bottom");
    }
    return (
        <div>
            <div className={styles.title}>비슷한 옷 찾기</div>
            <div className={styles.question_1}>
                Q. 찾고 싶은 옷의 종류를 선택해주세요
            </div>
            <div className={styles.question_2}>
                Q. 찾고 싶은 옷의 사진을 업로드 해주세요
            </div>
            <button
                className={
                    !btn1
                        ? styles.BtnDown
                        : btn1 && btnValue === 0
                        ? styles.Btn
                        : styles.BtnUp
                }
                style={{
                    position: "absolute",
                    width: "97px",
                    height: "85px",
                    left: "606px",
                    top: "281px",
                    backgroundImage: "url(" + img_top + ")",
                }}
                onClick={ClickBtn1}
            />
            <button
                className={
                    !btn2
                        ? styles.BtnDown
                        : btn2 && btnValue === 0
                        ? styles.Btn
                        : styles.BtnUp
                }
                style={{
                    position: "absolute",
                    width: "97px",
                    height: "85px",
                    left: "776px",
                    top: "281px",
                    backgroundImage: "url(" + img_bot + ")",
                }}
                onClick={ClickBtn2}
            />
            <DropBox viewModel={viewModel} />
        </div>
    );
}

function ResultBox({ viewModel, state, result, event, select }) {
    const [resultList, setResultList] = useState(result);

    // const getNewResultList = () => {
    //     setResultList(viewModel.getResultList());
    // }

    // useEffect(() => {
    //     setResultList(viewModel.getResultList());
    // }, [viewModel]);
    // console.log("---------------");
    // console.log(result);
    // console.log("---------------");
    let type =
        viewModel.getType() === "top"
            ? "상의"
            : viewModel.getType() === "bottom"
            ? "하의"
            : "?";

    return (
        <div>
            {(state === "main" && (
                <div className={styles.MainBox}>
                    <div className={styles.MainTitle}>
                        <span>비슷한 </span>
                        <span style={{ color: "#FFD439" }}>옷</span>
                        <span> 찾기</span>
                    </div>
                    <div className={styles.MainContent}>
                        유명인이나 연예인이 입은 옷 한번 쯤 궁금하지 않았나요?
                        ViViO에서 찾아드립니다!
                    </div>
                    <button className={styles.StartBtn} onClick={event} onMouse>
                        시작
                    </button>
                </div>
            )) ||
                (state === "loading" && (
                    <div className={styles.ResultBox}>
                        <div className={styles.Spinner} />
                        <div className={styles.LoadingText}>
                            지식인에 물어보는 중...
                        </div>
                        <div className={styles.LoadingWarning}>*주의!</div>
                        <div className={styles.LoadingWarningTextPosition}>
                            <span
                                className={styles.LoadingWarningText}
                                style={{ color: "red" }}
                            >
                                새로고침
                            </span>
                            <span className={styles.LoadingWarningText}>
                                을 하면 작업이
                            </span>
                            <span
                                className={styles.LoadingWarningText}
                                style={{ color: "red" }}
                            >
                                {" "}
                                취소{" "}
                            </span>
                            <span className={styles.LoadingWarningText}>
                                될 수 있어요!
                            </span>
                        </div>
                    </div>
                )) ||
                (state === "result" && (
                    <div className={styles.ResultBox}>
                        <span className={styles.ResultTitle}>
                            검색 결과입니다
                        </span>
                        <div className={styles.ResultCategory}>
                            <span>종류: </span>
                            <span>{type} </span>
                        </div>
                        <button className={styles.RestartBtn} onClick={event}>
                            다시 검색하기
                        </button>
                        <img
                            className={styles.ResultImg}
                            alt=""
                            src={viewModel.getUploadedImgLink()}
                        ></img>
                        <div
                            className={styles.SortBtnBox}
                            // style={{ display: "inline-block" }}
                        >
                            <button
                                className={styles.SortBtn}
                                id="1"
                                onClick={(event) => {
                                    // setResultList(viewModel.getResultList());
                                    select(event);
                                }}
                            >
                                유사도순
                            </button>
                            <button
                                className={styles.SortBtn}
                                id="2"
                                onClick={(event) => {
                                    // setResultList(
                                    //     viewModel.getResultListDesc()
                                    // );
                                    select(event);
                                }}
                            >
                                가격 높은 순
                            </button>
                            <button
                                className={styles.SortBtn}
                                id="3"
                                onClick={(event) => {
                                    // setResultList(viewModel.getResultListAsc());
                                    select(event);
                                }}
                            >
                                가격 낮은 순
                            </button>
                        </div>
                        {/* result.map()으로 요소 나열 */}
                        {console.log("-----------")}
                        {console.log(resultList)}
                        {console.log("-----------")}
                        {result.map((value, id) => (
                            <div className={styles.ResultPos} key={id}>
                                <div className={styles.ResultLine}></div>
                                <img
                                    className={styles.ResultItemImg}
                                    src={value.image}
                                    alt="Searched Img"
                                ></img>
                                <span className={styles.ResultItemText}>
                                    {value.title}
                                    {"\n\n"}
                                    {value.price}
                                    {"원"}
                                </span>
                                <button
                                    className={styles.ResultLinkBtn}
                                    onClick={() => window.open(value.link)}
                                >
                                    보러가기
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
}

function ClothesFinder({ viewModel }) {
    const [state, setState] = useState("main"); //"main", "loading", "result"
    const [result, setResult] = useState(viewModel.getResultList());
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState(0);

    async function postClothes() {
        setState("loading");
        await viewModel.postClothes();
        if (viewModel.getResultList() !== null) {
            setState("result"); //성공
            setResult(viewModel.getResultListItem());
        } else {
            setState("main");
            setModal(true);
            setModalType(3);
        }
    }

    function start() {
        setModal(true);
        if (viewModel.dataCheck()) {
            setModalType(1);
        } else {
            setModalType(2);
        }
    }
    function select(e) {
        console.log(e.target.id);

        switch (e.target.id) {
            case "1":
                setResult(viewModel.getResultListItem());
                // console.log(viewModel.getResultListItem());
                break;
            case "2":
                setResult(viewModel.getResultListItemDesc());
                // console.log(viewModel.getResultListItemDesc());
                break;
            case "3":
                setResult(viewModel.getResultListItemAsc());
                // console.log(viewModel.getResultListItemAsc());
                break;
            default:
                break;
        }
    }

    function modalEvent() {
        setModal(false);
        switch (modalType) {
            case 0: //이동하기
                break;
            case 1: //시작하기
                viewModel.update();
                postClothes();
                break;
            case 2: //닫기
            case 3:
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.background}>
            <Modal
                viewModel={viewModel}
                state={modal}
                type={modalType}
                event={modalEvent}
                close={() => setModal(false)}
            />
            <InputSetting viewModel={viewModel} />
            <ResultBox
                viewModel={viewModel}
                state={state}
                // 버튼 클릭시 result에 resultList, resultByPrice
                result={result}
                event={start}
                select={select}
            />
        </div>
    );
}

export default ClothesFinder;
