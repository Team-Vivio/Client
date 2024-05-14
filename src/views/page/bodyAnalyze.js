import styles from "../../styles/bodyAnalyze/bodyAnalyze.module.css";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "../../styles/bodyAnalyze/slick.css";
import { SketchPicker } from "react-color";
import { useCookies } from "react-cookie";

//이미지
import DropBox1 from "../../img/bodyAnalyze/DropBox.png";
import Coin1 from "../../img/bodyAnalyze/Coin.png";
import { Link } from "react-router-dom";

function Btn({ left, top, img, size, active, event }) {
    const info = {
        position: "absolute",
        left: left,
        top: top,
        backgroundColor: active ? "#00ff00" : "#ffffff",
        backgroundImage: `url(${img})`,
        backgroundSize: size,
    };

    return (
        <button style={info} className={styles.ImgBtn} onClick={event}></button>
    );
}

function Text({ left, top, size, text }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
        fontSize: size,
    };

    return (
        <div style={pos} className={styles.Text}>
            {text}
        </div>
    );
}

function Input({ left, top, changeEvent, blurEvent, min, max }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
    };

    return (
        <input
            type="number"
            onChange={(e) => {
                changeEvent(e);
            }}
            onBlur={blurEvent}
            style={pos}
            className={styles.Input}
            onWheel={(e) => e.target.blur()}
        ></input>
    );
}

function DropBox({ imgUpload, setformData }) {
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [isActive, setActive] = useState(false);
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

    const setFileInfo = (file) => {
        //예외처리 -> 파일 넣으려다 닫았을때
        console.log(file);
        if (file === null || file === undefined) {
            setUploadedInfo(null);
            return;
        }
        const { name, type } = file;
        const isImage = type.includes("image");
        const size = (file.size / (1024 * 1024)).toFixed(2) + "mb";

        if (!isImage) {
            setUploadedInfo({ name, size, type });
            return;
        }
        imgUpload(file);
        const reader = new FileReader();
        reader.onload = () => {
            const img = {
                name,
                size,
                type,
                imageUrl: String(reader.result),
            };
            setUploadedInfo(img);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setActive(false);
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
                        className={styles.InfoImg}
                    ></img>
                ) : (
                    <>
                        <img className={styles.DropImg} src={DropBox1}></img>
                        <p className={styles.DropText}>
                            클릭 혹은 파일을 이곳에 드롭 하세요
                        </p>
                    </>
                )}
            </label>
        </div>
    );
}

function StartBtn({ left, top, event }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
    };
    return (
        <button style={pos} className={styles.StartBtn} onClick={event}>
            <span>시작 </span>
            <img src={Coin1} className={styles.Coin}></img>
            <span>-10</span>
        </button>
    );
}

function StartBox({ event }) {
    return (
        <>
            <div className={styles.ClosetImg}></div>
            <div className={styles.ClosetBox}>
                <span className={styles.ClosetTitle}>나만의 </span>
                <span
                    className={styles.ClosetTitle}
                    style={{ color: "#FFD439" }}
                >
                    패션
                </span>
                <span className={styles.ClosetTitle}> 찾기</span>
                <Text
                    left="54px"
                    top="222px"
                    size="28px"
                    text={
                        "나는 무슨 패션이 잘 어울릴까요?\n스트릿? 캐쥬얼?\n ViViO에서\n 당신의 고민을 해결해드릴께요!"
                    }
                />
                <StartBtn left="172px" top="598px" event={event} />
            </div>
        </>
    );
}

function ResultInnerBox({ value }) {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.ResultInnerBox}>
                <a
                    href={
                        "https://search.shopping.naver.com/search/all?query=" +
                        value.color +
                        value.type
                    }
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.ResultLink}
                >
                    <img src={value.image} className={styles.ResultImg}></img>
                </a>
                <div className={styles.ResultInnerTitle}>{value.title}</div>
                <div className={styles.ResultColor}>
                    {"색상: " + value.color}
                </div>
                <div className={styles.ResultType}>{"종류: " + value.type}</div>
                <div className={styles.ResultInfoBox}>
                    {'"' + value.content + '"'}
                </div>
            </div>
        </div>
    );
}

function ResultBox({ name = "OO", infoList, event }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
    };
    return (
        <div className={styles.ResultBox}>
            <div className={styles.ResultTitle}>
                {name + "님에게 추천하는 패션이에요!"}
            </div>
            <div className={styles.ResultInnerBoxPosition}>
                <Slider {...settings}>
                    {infoList.map((value, id) => (
                        <ResultInnerBox value={value} key={id} />
                    ))}
                </Slider>
            </div>
            <button className={styles.RestartBtn} onClick={event}>
                <span>시작 </span>
                <img src={Coin1} className={styles.Coin}></img>
                <span>-10</span>
            </button>
        </div>
    );
}

function HistoryItem({ history, event }) {
    const ID = history.fasRecId;
    return (
        <div className={styles.HistoryList} onClick={() => event(ID)}>
            <div className={styles.Historyline}></div>
            <img src={history.image} className={styles.HistoryImg}></img>
            <div className={styles.HistoryText}>{history.type}</div>
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
                      <HistoryItem history={history} key={id} event={event} />
                  ))
                : null}
        </div>
    );
}

function LoadingBox({ event }) {
    return (
        <div className={styles.ResultBox}>
            <div className={styles.Spinner}></div>
            <div className={styles.LoadingText}>패션 잡지 보는중...</div>
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
                    취소
                </span>
                <span className={styles.LoadingWarningText}>될 수 있어요!</span>
            </div>
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
            message: "성별, 키, 몸무게, 체형은\n필수로 입력해주세요",
            btn: "입력하기",
        },
        {
            message: "추천에 실패했어요\n정보를 다시 입력하고 다시 해주세요",
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
                            <div className={styles.ModalItem1}>*주의!</div>
                            <div className={styles.ModalItem2}>
                                {ModalMessage[msgIndex].message}
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

function Color({ event }) {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState("#000");

    const handleChangeComplete = (color) => {
        setColor(color.hex);
        event(color.hex);
    };
    return (
        <div>
            <button
                className={styles.ColorButton}
                onClick={() => setActive(true)}
            >
                컬러 선택
            </button>
            {active ? (
                <div className={styles.ColorBackground}>
                    <div className={styles.ColorBox}>
                        <button
                            className={styles.ColorClose}
                            onClick={() => setActive(false)}
                        ></button>
                        <SketchPicker
                            disableAlpha={true}
                            width="300px"
                            color={color}
                            onChangeComplete={handleChangeComplete}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function BodyAnalyze(props) {
    const [renderFlag, setRenderFlag] = useState(false);
    const [boxState, setBoxState] = useState("main");
    const [history, setHistory] = useState(props.viewModel.getAllHistoryList());

    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    function setGender(value) {
        props.viewModel.setGender(value);
        setRenderFlag((renderFlag) => !renderFlag);
    }
    function setBodyType(value) {
        props.viewModel.setBodyType(value);
        setRenderFlag((renderFlag) => !renderFlag);
    }
    function setHeight(event) {
        props.viewModel.handleInputBlur(event, 90, 290);
        props.viewModel.setHeight(event.target.value);
    }
    function setWeight(event) {
        props.viewModel.handleInputBlur(event, 20, 200);
        props.viewModel.setWeight(event.target.value);
    }
    function setUploadedImg(file) {
        props.viewModel.setUploadedImg(file);
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
            await props.viewModel.postFashion();
            if (props.viewModel.getAllResultList() === null) {
                setModal(2); //결과를 못받으면
                props.viewModel.setModalActive(true);
                setBoxState("main");
            } else {
                getHistory();
                setBoxState("result");
            }
        }
    }
    function setFormData(img) {
        props.viewModel.setFormData(img);
    }
    async function getHistory() {
        await props.viewModel.getHistory();
        setHistory(props.viewModel.getAllHistoryList());
    }
    async function getFashion(fashionID) {
        await props.viewModel.getFashion(fashionID);
        console.log(props.viewModel.getAllResultList());
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

    useEffect(() => {
        props.viewModel.setToken(token);
        getHistory();
    }, []);

    return (
        <div className={styles.Background}>
            <div className={styles.Blur}>
                <Modal
                    active={props.viewModel.getModalActive()}
                    msgIndex={modalIndex}
                    closeEvent={modalClose}
                    enterEvent={modalEvent}
                />
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
                {props.viewModel.BodyTypeBtns.map((value) => (
                    <Btn
                        key={value.id}
                        left={value.left}
                        top={value.top}
                        img={value.img}
                        size={value.size}
                        active={value.active}
                        event={() => setBodyType(value.id)}
                    />
                ))}
                <Input
                    left="134px"
                    top="507px"
                    changeEvent={props.viewModel.handleInputValue}
                    blurEvent={setHeight}
                    min={20}
                    max={200}
                />
                <Input
                    left="134px"
                    top="655px"
                    changeEvent={props.viewModel.handleInputValue}
                    blurEvent={setWeight}
                    min={90}
                    max={290}
                />
                <Color event={(value) => props.viewModel.setColor(value)} />
                <DropBox imgUpload={setUploadedImg} setformData={setFormData} />
                {/* 나만의 패션 찾기 */}
                {(boxState === "main" && (
                    <StartBox event={() => setModal(1)} />
                )) ||
                    (boxState === "loading" && <LoadingBox />) ||
                    (boxState === "result" && (
                        <ResultBox
                            name="이름"
                            infoList={props.viewModel.getAllResultList()}
                            event={() => setModal(1)}
                        />
                    ))}
                {/* 맨 왼쪽 기록 바 */}
                <HistoryBar list={history} event={getFashion} />
            </div>
        </div>
    );
}

export default BodyAnalyze;
