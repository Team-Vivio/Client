import styles from "../../styles/ToneAnalyze/ToneAnalyze.module.css";
import { useEffect, useState } from "react";

import DropBox1 from "../../img/ToneAnalyze/DropBox.png";
import Coin1 from "../../img/ToneAnalyze/Coin.png";
import mark_O from "../../img/ToneAnalyze/mark_O.png";
import mark_X from "../../img/ToneAnalyze/mark_X.png";
import lock from "../../img/ToneAnalyze/lock.png";
import { useCookies } from "react-cookie";

function Btn({ left, top, img, size, active, event }) {
    const info = {
        position: "absolute",
        left: left,
        top: top,
        backgroundImage: `url(${img})`,
        backgroundSize: size,
    };

    return (
        <button
            style={info}
            className={
                active === 0
                    ? styles.Btn
                    : active === 1
                    ? styles.BtnUp
                    : styles.BtnDown
            }
            onClick={event}
        ></button>
    );
}

function Text({ left, top, size, text, color = "#FFFFFF" }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
        fontSize: size,
        color: color,
    };

    return (
        <div style={pos} className={styles.Text}>
            {text}
        </div>
    );
}

function ImgBox({ left, top, width, height, img, radius }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
        width: width,
        height: height,
        borderRadius: radius,
        backgroundImage: `url(${img})`,
    };

    return <div style={pos} className={styles.ImgBox} />;
}

function StartBox({ event }) {
    return (
        <>
            <div className={styles.ClosetImg}></div>
            <div className={styles.ClosetBox}>
                <span
                    className={styles.ClosetTitle}
                    style={{ color: "#00A3FF" }}
                >
                    쿨톤
                </span>
                <span className={styles.ClosetTitle}> & </span>
                <span
                    className={styles.ClosetTitle}
                    style={{ color: "#F8AAAA" }}
                >
                    웜톤
                </span>
                <span className={styles.ClosetTitle}> 찾기</span>
                <Text
                    left="54px"
                    top="222px"
                    size="35px"
                    text={
                        "내 얼굴이 쿨톤이 어울리는지\n웜톤이 어울리는지 궁금하신가요?\n걱정 마세요.\nViViO에서\n당신의 궁금증을 해결해드릴께요"
                    }
                />
                <StartBtn left="172px" top="598px" onClick={event} />
            </div>
        </>
    );
}

function StartBtn({ left, top, onClick }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
    };

    return (
        <button style={pos} className={styles.StartBtn} onClick={onClick}>
            <span>시작 </span>
            <img src={Coin1} alt="단추" className={styles.Coin}></img>
            <span>-5</span>
        </button>
    );
}

function LoadingBox({ event }) {
    return (
        <div className={styles.ResultBox}>
            <div className={styles.Spinner} />
            <div className={styles.LoadingText}>지식인에 물어보는 중...</div>
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
                <span className={styles.LoadingWarningText}>될 수 있어요!</span>
            </div>
        </div>
    );
}

function ResultBox({ viewModel, event }) {
    const name = viewModel.getName();
    let infoList = viewModel.getAllResultList();

    const season =
        infoList.session === "spring"
            ? "봄 "
            : infoList.session === "summer"
            ? "여름 "
            : infoList.session === "fall"
            ? "가을 "
            : infoList.session === "winter"
            ? "겨울 "
            : "?";
    const tone =
        infoList.tone === "warm"
            ? "웜톤 "
            : infoList.tone === "cool"
            ? "쿨톤 "
            : "?";

    return (
        <div className={styles.ResultBox}>
            <div className={styles.ResultImg}>
                <img
                    src={viewModel.getUploadedImg()}
                    alt=""
                    className={styles.ResultImg}
                />
            </div>
            {/* 멘트 추가 필요 */}
            <div className={styles.ResultTitle}>
                {name +
                    "님의 얼굴은 " +
                    season +
                    " " +
                    tone +
                    "이시네요.\n어떤 스타일이 잘 어울릴까요?"}
            </div>
            <button className={styles.RestartBtn} onClick={event}>
                <span>다시 하기</span>
                {/* <img src={Coin1} className={styles.Coin}></img>
                <span>-10</span> */}
            </button>
        </div>
    );
}

function ResultDetailed({ viewModel }) {
    const infoList = viewModel.getAllResultList();
    const gender =
        infoList.gender === "male"
            ? "남자 "
            : infoList.gender === "female"
            ? "여자 "
            : "?";
    const season =
        infoList.session === "spring"
            ? "봄 "
            : infoList.session === "summer"
            ? "여름 "
            : infoList.session === "fall"
            ? "가을 "
            : infoList.session === "winter"
            ? "겨울 "
            : "?";
    const tone =
        infoList.tone === "warm"
            ? "웜톤 "
            : infoList.tone === "cool"
            ? "쿨톤 "
            : "?";
    const info = gender + season + tone;

    return (
        <div className={styles.ResultDetailed}>
            <div className={styles.ResultInfoTitle}>{info + "헤어"}</div>
            {infoList.hair.colors.map((element, key) => (
                <ColorBox color={"#" + element.code} key={key} />
            ))}
            <div className={styles.ResultInfoContent}>
                {infoList.hair.description}
            </div>

            <div className={styles.ResultInfoTitle}>{info + "퍼스널 컬러"}</div>
            {infoList.personalColor.colors.map((element, key) => (
                <ColorBox color={"#" + element.code} key={key} />
            ))}
            <div className={styles.ResultInfoContent}>
                {infoList.personalColor.description}
            </div>

            <div className={styles.ResultInfoTitle}>{info + "화장법"}</div>
            <div className={styles.ResultInfoContent}>
                {infoList.beauty.description}
            </div>
        </div>
    );
}

function ColorBox({ color }) {
    return (
        <div
            style={{
                backgroundColor: color,
                width: "75px",
                height: "75px",
                marginLeft: "30px",
                marginBottom: "20px",
                display: "inline-block",
            }}
        ></div>
    );
}

function DropBox({ viewModel, imgUpload, setformData }) {
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const handleDragStart = () => setIsActive(true);
    const handleDragEnd = () => setIsActive(false);

    const setFileInfo = (file) => {
        const { name, type } = file;
        const isImage = type.includes("image");
        const size = (file.size / (1024 * 1024)).toFixed(2) + "mb";

        if (!isImage) {
            setUploadedInfo({ name, size, type });
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const img = {
                name,
                size,
                type,
                imageUrl: String(reader.result),
            };
            setUploadedInfo(img);
            imgUpload(img.imageUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsActive(false);
        const file = event.dataTransfer.files[0];
        setformData(file);
        setFileInfo(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = ({ target }) => {
        const file = target.files[0];
        setformData(file);
        setFileInfo(file);
    };

    return (
        <div className={styles.DropBox}>
            <label
                className={styles.DropLabel}
                onDragEnter={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragEnd}
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
                        alt=""
                        className={styles.InfoImg}
                    ></img>
                ) : (
                    <>
                        <img
                            className={styles.DropImg}
                            src={DropBox1}
                            alt=""
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

function HistoryItem({ history, event }) {
    const ID = history.perColId;
    return (
        <div className={styles.HistoryList} onClick={() => event(ID)}>
            <div className={styles.Historyline}></div>
            <img
                src={history.image}
                className={styles.HistoryImg}
                alt="h_i"
            ></img>
            <div className={styles.HistoryText}>{history.tone}</div>
        </div>
    );
}

function HistoryBar({ list, event }) {
    const [barPosition, setBarPosition] = useState(170);

    //애니메이션
    const handleScroll = () => {
        const position =
            300 < 30 + window.scrollY
                ? 300
                : 170 > 30 + window.scrollY
                ? 170
                : 30 + window.scrollY;
        setBarPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={styles.HistoryBar} style={{ top: barPosition }}>
            <div className={styles.HistoryTitle}>History</div>
            {list !== null
                ? list.map((history, id) => (
                      <HistoryItem history={history} key={id} event={event} /> // add onClick
                  ))
                : null}
        </div>
    );
}

function Modal({ active, msgIndex, closeEvent, enterEvent }) {
    const ModalMessage = [
        {
            message: "이동하시겠어요?\n작업한 내용이 삭제 되요",
            btn: "이동하기",
        },
        {
            message: "제대로 입력했는지 확인해주세요\n기존 작업물은 저장됩니다",
            btn: "시작하기",
        },
        {
            message: "성별 선택과 파일 업로드는\n필수입니다",
            btn: "입력하기",
        },
        {
            message: "분석에 실패했어요\n정보를 다시 입력하고 다시 해주세요",
            btn: "입력하기",
        },
    ];
    return (
        <>
            {active ? (
                <div className={styles.ModalBackground}>
                    <div className={styles.Modal}>
                        <button
                            className={styles.ModalClose}
                            onClick={closeEvent}
                        ></button>
                        <div className={styles.ModalContent}>
                            <div className={styles.ModalItem1}>*주의!</div>{" "}
                            <div className={styles.ModalItem2}>
                                {ModalMessage[msgIndex].message}{" "}
                            </div>
                            <button
                                className={styles.ModalEnter}
                                onClick={enterEvent}
                            >
                                {ModalMessage[msgIndex].btn}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

function ToneAnalyze(props) {
    const [renderFlag, setRenderFlag] = useState(false);

    function setGender(value) {
        props.viewModel.setGender(value);
        setRenderFlag((renderFlag) => !renderFlag);
    }
    function setUploadedImg(file) {
        props.viewModel.setUploadedImg(file);
        setRenderFlag((renderFlag) => !renderFlag);
    }
    function setState(value) {
        props.viewModel.setState(value);
        setRenderFlag((renderFlag) => !renderFlag);
    }
    function setModal(type) {
        switch (type) {
            case 0: //뒤로가기 모달
                props.viewModel.setModalIndex(0);
                break;
            case 1: //시작버튼을 누른 경우 데이터 체크
                props.viewModel.dataCheck() //필수 데이터가 있는지
                    ? props.viewModel.setModalIndex(1)
                    : props.viewModel.setModalIndex(2);
                break;
            case 2: //검사 실패
                props.viewModel.setModalIndex(3);
                break;
            default:
                break;
        }
        props.viewModel.setModalActive(true);
        setRenderFlag((renderFlag) => !renderFlag);
    }
    function modalClose() {
        props.viewModel.setModalActive(false);
        setRenderFlag((renderFlag) => !renderFlag);
    }
    async function modalEvent() {
        modalClose();
        if (modalIndex === 1) {
            setBoxState("loading");
            await props.viewModel.postPerCol();
            if (props.viewModel.getAllResultList() === null) {
                setModal(2); //결과를 못받으면
                props.viewModel.setModalActive(true);
                setBoxState("main");
            } else {
                getHistory();
                setBoxState("result");
            }
        } else if (modalIndex === 0) {
            // different
            setBoxState("main");
        }
    }
    function setFormData(img) {
        props.viewModel.setFormData(img);
    }
    async function getHistory() {
        await props.viewModel.getHistory();
        setHistory(props.viewModel.getAllHistoryList());
    }
    async function getPerCol(fashionID) {
        await props.viewModel.getPerCol(fashionID);
        if (props.viewModel.getAllResultList() === null) {
            setModal(2); //결과를 못받으면
            props.viewModel.setModalActive(true);
            setBoxState("main");
        } else {
            setBoxState("result");
            setRenderFlag((renderFlag) => !renderFlag);
        }
    }

    let modalIndex = props.viewModel.getModalIndex(); //모달 메세지 유형 인덱스
    // 로딩 끝나면 "main"으로 변경하기@@@
    const [boxState, setBoxState] = useState("main");
    const [history, setHistory] = useState(props.viewModel.getAllHistoryList());

    useEffect(() => {
        getHistory();
    }, []);

    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const [isUser, setUser] = useState(false);

    useEffect(() => {
        if (!cookies.token || cookies.token === "undefined") {
            //비회원
            setUser(false);
        } else {
            //회원
            setUser(true);
        }
    }, [cookies]);

    return (
        <div className={styles.Background}>
            {/* {비회원 모달} */}
            {!isUser ? (
                <div className={styles.ModalBackground}>
                    <div className={styles.Modal}>
                        <button
                            className={styles.ModalClose}
                            onClick={() => {
                                window.location.href = "/";
                            }}
                        ></button>
                        <div className={styles.ModalContent}>
                            <img className={styles.ModalLock} src={lock} />
                            <div className={styles.ModalMessage}>
                                로그인 시 이용할 수 있어요!
                            </div>
                            <button
                                className={styles.ModalEnter}
                                onClick={() => {
                                    window.location.href = "/Login";
                                }}
                            >
                                로그인 하러 가기
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <Modal
                active={props.viewModel.getModalActive()}
                msgIndex={modalIndex}
                closeEvent={modalClose}
                enterEvent={modalEvent}
            />

            {/* 나만의 패션 찾기 */}
            {(boxState === "main" && (
                <>
                    <StartBox event={() => setModal(1)} />

                    {props.viewModel.textList.map((value, index) => (
                        <Text
                            key={index}
                            left={value.left}
                            top={value.top}
                            size={value.size}
                            text={value.text}
                        />
                    ))}
                    {props.viewModel.GenderBtns.map((value) => (
                        <Btn
                            key={value.id}
                            left={value.left}
                            top={value.top}
                            img={value.img}
                            size={value.size}
                            active={value.active}
                            event={() => setGender(value.id)}
                        />
                    ))}
                    {props.viewModel.ImgBoxList.map((value, index) => (
                        <ImgBox
                            key={index}
                            left={value.left}
                            top={value.top}
                            width={value.width}
                            height={value.height}
                            img={value.img}
                            borderRadius={value.radius}
                        />
                    ))}
                    <>
                        <img
                            src={mark_O}
                            alt="O"
                            style={{
                                position: "absolute",
                                left: "851px",
                                top: "590px",
                            }}
                        ></img>
                        <img
                            src={mark_X}
                            alt="X"
                            style={{
                                position: "absolute",
                                left: "1050px",
                                top: "590px",
                            }}
                        ></img>
                    </>
                    <DropBox
                        viewModel={props.viewModel}
                        imgUpload={setUploadedImg}
                        setformData={setFormData}
                    />
                </>
            )) ||
                (boxState === "loading" && (
                    <>
                        <LoadingBox event={setState} />

                        {props.viewModel.textList.map((value, index) => (
                            <Text
                                key={index}
                                left={value.left}
                                top={value.top}
                                size={value.size}
                                text={value.text}
                            />
                        ))}
                        {props.viewModel.GenderBtns.map((value) => (
                            <Btn
                                key={value.id}
                                left={value.left}
                                top={value.top}
                                img={value.img}
                                size={value.size}
                                active={value.active}
                                event={() => setGender(value.id)}
                            />
                        ))}
                        {props.viewModel.ImgBoxList.map((value, index) => (
                            <ImgBox
                                key={index}
                                left={value.left}
                                top={value.top}
                                width={value.width}
                                height={value.height}
                                img={value.img}
                                borderRadius={value.radius}
                            />
                        ))}
                        <>
                            <img
                                src={mark_O}
                                alt="O"
                                style={{
                                    position: "absolute",
                                    left: "851px",
                                    top: "590px",
                                }}
                            ></img>
                            <img
                                src={mark_X}
                                alt="X"
                                style={{
                                    position: "absolute",
                                    left: "1050px",
                                    top: "590px",
                                }}
                            ></img>
                        </>
                        <DropBox
                            viewModel={props.viewModel}
                            imgUpload={setUploadedImg}
                            setformData={setFormData}
                        />
                    </>
                )) ||
                (boxState === "result" && (
                    <>
                        <ResultBox
                            viewModel={props.viewModel}
                            event={() => {
                                setModal(0);
                            }}
                        />
                        <div className={styles.middleLine} />
                        <ResultDetailed viewModel={props.viewModel} />
                    </>
                ))}
            {/* 맨 왼쪽 기록 바 */}
            <HistoryBar list={history} event={getPerCol} />
        </div>
    );
}

export default ToneAnalyze;
