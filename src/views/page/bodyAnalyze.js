import styles from "../../styles/bodyAnalyze/bodyAnalyze.module.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "../../styles/bodyAnalyze/slick.css";

//이미지

import DropBox1 from "../../img/bodyAnalyze/DropBox.png";
import Coin1 from "../../img/bodyAnalyze/Coin.png";

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

function Input({ left, top, changeEvent, blurEvent }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
    };

    return (
        <input
            type="number"
            onChange={changeEvent}
            onBlur={blurEvent}
            style={pos}
            className={styles.Input}
        ></input>
    );
}

function DropBox({ imgUpload }) {
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [isActive, setActive] = useState(false);
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

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
            imgUpload(img);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setActive(false);
        const file = event.dataTransfer.files[0];
        setFileInfo(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = ({ target }) => {
        const file = target.files[0];
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
                <img src={value.img} className={styles.ResultImg}></img>
                <div className={styles.ResultInnerTitle}>{value.title}</div>
                <div className={styles.ResultColor}>
                    {"색상: " + value.color}
                </div>
                <div className={styles.ResultType}>{"종류: " + value.type}</div>
                <div className={styles.ResultInfoBox}>
                    {'"' + value.info + '"'}
                </div>
            </div>
        </div>
    );
}

function ResultBox({ name = "OO", infoList }) {
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
                    {infoList.map((value) => (
                        <ResultInnerBox value={value} key={value.id} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

function HistoryItem({ history }) {
    return (
        <div className={styles.HistoryList}>
            <div className={styles.Historyline}></div>
            <img src={history.img} className={styles.HistoryImg}></img>
            <div className={styles.HistoryText}>{history.info}</div>
        </div>
    );
}

function HistoryBar({ list }) {
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
            {list.map((history, id) => (
                <HistoryItem history={history} key={id} />
            ))}
        </div>
    );
}

function LoadingBox() {
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

function BodyAnalyze(props) {
    const [renderFlag, setRenderFlag] = useState(false);

    function setGender(value) {
        props.viewModel.setGender(value);
        setRenderFlag(!renderFlag);
    }
    function setBodyType(value) {
        props.viewModel.setBodyType(value);
        setRenderFlag(!renderFlag);
    }
    function setHeight(event) {
        props.viewModel.handleInputBlur(event);
        props.viewModel.setHeight(event.target.value);
    }
    function setUploadedImg(file) {
        props.viewModel.setUploadedImg(file);
        setRenderFlag(!renderFlag);
    }
    function setState(value) {
        props.viewModel.setState(value);
        setRenderFlag(!renderFlag);
    }
    let resultList = props.viewModel.getAllResultList();
    let historyList = props.viewModel.getAllHistoryList();
    let state = props.viewModel.getState();
    return (
        <div className={styles.Background}>
            <div className={styles.Blur}>
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
                />
                <Input
                    left="134px"
                    top="655px"
                    changeEvent={props.viewModel.handleInputValue}
                    blurEvent={setHeight}
                />
                <DropBox imgUpload={setUploadedImg} />
                {/* 나만의 패션 찾기 */}
                {(state === "main" && (
                    <StartBox event={() => setState("loading")} />
                )) ||
                    (state === "loading" && <LoadingBox />) ||
                    (state === "result" && (
                        <ResultBox name="이름" infoList={resultList} />
                    ))}
                {/* 맨 왼쪽 기록 바 */}
                <HistoryBar list={historyList} />
            </div>
        </div>
    );
}

export default BodyAnalyze;
