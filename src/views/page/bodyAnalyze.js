import styles from "../../styles/bodyAnalyze/bodyAnalyze.module.css";
import { useState, useEffect } from "react";

//이미지
import Gender1 from "../../img/bodyAnalyze/Gender1.png";
import Gender2 from "../../img/bodyAnalyze/Gender2.png";
import Body1 from "../../img/bodyAnalyze/Body1.png";
import Body2 from "../../img/bodyAnalyze/Body2.png";
import Body3 from "../../img/bodyAnalyze/Body3.png";
import DropBox1 from "../../img/bodyAnalyze/DropBox.png";
import Coin1 from "../../img/bodyAnalyze/Coin.png";

function Btn({ left, top, img, size }) {
    const info = {
        position: "absolute",
        left: left,
        top: top,
        backgroundImage: `url(${img})`,
        backgroundSize: size,
    };

    return <button style={info} className={styles.ImgBtn}></button>;
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
    return (
        <div className={styles.DropBox}>
            <img className={styles.DropImg} src={DropBox1}></img>
            <p
                style={{
                    position: "absolute",
                    top: "179px",
                    left: "50px",
                    fontFamily: "NanumSquareRound",
                    fontWeight: "700",
                    fontSize: "20px",
                    lineHeight: "140%",
                }}
            >
                클릭 혹은 파일을 이곳에 드롭 하세요
            </p>
        </div>
    );
}

function StartBtn({ left, top }) {
    const pos = {
        position: "absolute",
        left: left,
        top: top,
    };
    return (
        <button style={pos} className={styles.StartBtn}>
            <span>시작 </span>
            <img src={Coin1} className={styles.Coin}></img>
            <span>-10</span>
        </button>
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
    const [historys, setHistorys] = useState([
        { id: 1, img: Coin1, info: "설명임" },
        { id: 2, img: Body2, info: "설명2" },
        { id: 3, img: "", info: "" },
        { id: 4, img: "", info: "" },
        { id: 5, img: "", info: "" },
        { id: 6, img: "", info: "" },
        { id: 7, img: "", info: "" },
    ]);
    const [barPosition, setBarPosition] = useState(510);

    //나중에 수치 조절하기
    const handleScroll = () => {
        console.log(window.scrollY);
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

function BodyAnalyze() {
    return (
        <div className={styles.Background}>
            <div className={styles.Blur}>
                <Text
                    left="41px"
                    top="121px"
                    size="35px"
                    text="나만의 패션 찾기"
                />
                {/* Q1 성별 선택 */}
                <Text
                    left="96px"
                    top="260px"
                    size="28px"
                    text="Q1. 성별을 선택해주세요"
                />
                <Btn left="134px" top="322px" img={Gender1} size="45px" />
                <Btn left="304px" top="322px" img={Gender2} size="45px" />
                {/* Q2 키 입력 */}
                <Text
                    left="96px"
                    top="447px"
                    size="28px"
                    text="Q2. 키를 입력해주세요"
                />
                <Input left="134px" top="507px" />
                <Text left="330px" top="512px" size="30px" text="CM" />
                {/* Q3 몸무게 입력 */}
                <Text
                    left="96px"
                    top="593px"
                    size="28px"
                    text="Q3. 몸무게를 입력해주세요"
                />
                <Input left="134px" top="655px" />
                <Text left="330px" top="662px" size="30px" text="Kg" />
                {/* Q4 체형 선택 */}
                <Text
                    left="534px"
                    top="260px"
                    size="28px"
                    text="Q4. 체형을 선택해주세요"
                />
                <Btn left="580px" top="322px" img={Body1} size="25px" />
                <Btn left="698px" top="322px" img={Body2} size="25px" />
                <Btn left="816px" top="322px" img={Body3} size="30px" />
                {/* Q5 전신 사진 */}
                <Text
                    left="534px"
                    top="447px"
                    size="28px"
                    text={"Q5. 정확도를 위해\n\t전신 사진을 올려주세요(선택)"}
                />
                <DropBox />
                {/* 나만의 패션 찾기 */}
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
                    <StartBtn left="172px" top="598px" />
                </div>
                {/* 맨 왼쪽 기록 바 */}
                <HistoryBar />
            </div>
        </div>
    );
}

export default BodyAnalyze;
