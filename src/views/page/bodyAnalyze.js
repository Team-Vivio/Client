import styles from "../../styles/bodyAnalyze/bodyAnalyze.module.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "../../styles/bodyAnalyze/slick.css";

//이미지
import Body1 from "../../img/bodyAnalyze/Body1.png";
import Body2 from "../../img/bodyAnalyze/Body2.png";
import Body3 from "../../img/bodyAnalyze/Body3.png";
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

function Input({ left, top }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
    };

    //view model로 가야하나?
    //글자 조건 키랑 몸무게 같음
    function handleOnChange(event) {
        if (event.target.value.length > 3) {
            //3글자가 넘어가면
            if (event.target.value.indexOf(".") !== -1) {
                //소수점이 있다면 5자리 컷
                event.target.value = event.target.value.substr(
                    0,
                    event.target.value.length > 5
                        ? 5
                        : event.target.value.length
                );
            } else {
                //소수점 없으면 3자리 컷
                event.target.value = event.target.value.substr(0, 3);
            }
        }
    }

    function handleOnBlur(event) {
        if (event.target.value.indexOf(".") !== -1) {
            //소수점이 있다면 반올림
            event.target.value = Math.round(event.target.value);
        }
        event.target.value = event.target.value.substr(0, 3);
    }

    return (
        <input
            type="number"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            style={pos}
            className={styles.Input}
        ></input>
    );
}

function DropBox() {
    const [isActive, setActive] = useState(false);
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);
    const [uploadedInfo, setUploadedInfo] = useState(null);

    const FileInfo = ({ uploadedInfo }) => (
        <img src={uploadedInfo.imageUrl} className={styles.InfoImg}></img>
    );

    const setFileInfo = (file) => {
        const { name, type } = file;
        const isImage = type.includes("image");
        const size = (file.size / (1024 * 1024)).toFixed(2) + "mb";

        if (!isImage) {
            setUploadedInfo({ name, size, type });
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUploadedInfo({
                name,
                size,
                type,
                imageUrl: String(reader.result),
            });
        };
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
                    <FileInfo uploadedInfo={uploadedInfo} />
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

function ResultBox({
    name = "OO",
    infoList = [
        {
            id: 0,
            img: Coin1,
            title: "상의",
            color: "남색, 검은색",
            type: "후드티, 맨투맨",
            info: "어두운 색의 후드티나 맨투맨은 체형을 잘 감춰주고 슬림한 느낌을 줄 수 있습니다. *디폴트값*",
        },
    ],
}) {
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

function HistoryList({ history }) {
    return (
        <div className={styles.HistoryList}>
            <hr></hr>
            <img src={history.img} className={styles.HistoryImg}></img>
            <span className={styles.HistoryText}>{history.info}</span>
        </div>
    );
}

function HistoryBar() {
    //배열로 생성되는지 확인용 나중에 값 받아서 알맞게 수정할 예정
    const [historys, setHistorys] = useState([
        { id: 1, img: Coin1, info: "설명임" },
        { id: 2, img: Body2, info: "설명2" },
        { id: 3, img: "", info: "" },
        { id: 4, img: "", info: "" },
        { id: 5, img: "", info: "" },
        { id: 6, img: "", info: "" },
        { id: 7, img: "", info: "" },
    ]);
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
            {historys.map((history, id) => (
                <HistoryList history={history} key={id} />
            ))}
        </div>
    );
}

function BodyAnalyze(props) {
    const [renderFlag, setRenderFlag] = useState(false);
    const [bodyType, setBodyType] = useState("");
    const [start, setStart] = useState(false);
    const [resultList, setResultList] = useState([
        {
            id: 0,
            img: Coin1,
            title: "상의",
            color: "남색, 검은색",
            type: "후드티, 맨투맨",
            info: "어두운 색의 후드티나 맨투맨은 체형을 잘 감춰주고 슬림한 느낌을 줄 수 있습니다.",
        },
        {
            id: 1,
            img: Body1,
            title: "하의",
            color: "남색, 검은색",
            type: "청바지",
            info: "어두운 색의 후드티나 맨투맨은 체형을 잘 감춰주고 슬림한 느낌을 줄 수 있습니다.",
        },
    ]);

    function setGender(value) {
        props.viewModel.setGender(value);
        setRenderFlag(!renderFlag);
    }
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
                <Input left="134px" top="507px" />
                <Input left="134px" top="655px" />
                <Btn
                    left="580px"
                    top="322px"
                    img={Body1}
                    size="25px"
                    active={bodyType}
                    event={() => setBodyType("body1")}
                />
                <Btn
                    left="698px"
                    top="322px"
                    img={Body2}
                    size="25px"
                    active={bodyType}
                    event={() => setBodyType("body2")}
                />
                <Btn
                    left="816px"
                    top="322px"
                    img={Body3}
                    size="30px"
                    active={bodyType}
                    event={() => setBodyType("body3")}
                />
                <DropBox />
                {/* 나만의 패션 찾기 */}
                {start ? (
                    <ResultBox name="이름" infoList={resultList} />
                ) : (
                    <StartBox event={() => setStart(true)} /> //버튼 누르면 검사
                )}
                {/* 맨 왼쪽 기록 바 */}
                <HistoryBar />
            </div>
        </div>
    );
}

export default BodyAnalyze;
