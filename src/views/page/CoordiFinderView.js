import inputStyles from "../../styles/CoordiFinder/CoordiFinderInput.module.css";
import resultStyles from "../../styles/CoordiFinder/CoordiFinderResult.module.css";
import historyStyles from "../../styles/CoordiFinder/CoordiFinderHistory.module.css";
import "../../styles/CoordiFinder/Toggle.css";
import { useState, useEffect } from "react";
import Slider from "react-slick"; // react-slick 사용을 위해 import
import "../../styles/CoordiFinder/slick.css";

//이미지
import sample1 from "../../img/CoordiFinder/sample1.png";
import sample2 from "../../img/CoordiFinder/sample2.png";
import sample3 from "../../img/CoordiFinder/sample3.png";

//정보 입력 뷰
function InputView({ ViewModel }) {
    return (
        <div>
            <div className={inputStyles.titleItem}>
                <span className={`${inputStyles.whiteBig}`}>
                    코디해드립니다
                </span>
                <label class="switch">
                    <input type="checkbox"></input>
                    <span class="slider round"></span>
                </label>
            </div>
            <div className={inputStyles.q1Item}>
                <span className={`${inputStyles.whiteSmall}`}>
                    Q. 성별을 선택해주세요
                </span>
                <button
                    className={inputStyles.button}
                    style={{ marginLeft: "257px", marginRight: "73px" }}
                >
                    버튼 1
                </button>
                <button className={inputStyles.button}>버튼 2</button>
            </div>
            <div className={inputStyles.q2Item}>
                <div className={`${inputStyles.whiteSmall}`}>
                    Q. 상의를 두 종류 이상 업로드해주세요
                </div>
                <label
                    className={inputStyles.imageBox}
                    style={{ marginLeft: "100px" }}
                >
                    <input type="file" style={{ display: "none" }} />
                    <div
                        className={` ${inputStyles.blackSmall} ${inputStyles.imageBoxText}`}
                    >
                        클릭 혹은 파일을 이곳에 드롭 하세요
                    </div>
                </label>
            </div>
            <div className={inputStyles.q2Item}>
                <div className={`${inputStyles.whiteSmall} `}>
                    Q. 하의를 두 종류 이상 업로드해주세요
                </div>
                <label
                    className={inputStyles.imageBox}
                    style={{ marginLeft: "100px" }}
                >
                    <input type="file" style={{ display: "none" }} />
                    <div
                        className={` ${inputStyles.blackSmall} ${inputStyles.imageBoxText}`}
                    >
                        클릭 혹은 파일을 이곳에 드롭 하세요
                    </div>
                </label>
            </div>
            <div className={inputStyles.q2Item}>
                <div className={`${inputStyles.whiteSmall} `}>
                    Q. 아우터를 하나 이상 업로드해주세요(선택)
                </div>
                <label
                    className={inputStyles.imageBox}
                    style={{ marginLeft: "35px" }}
                >
                    <input type="file" style={{ display: "none" }} />
                    <div
                        className={`${inputStyles.blackSmall} ${inputStyles.imageBoxText}`}
                    >
                        클릭 혹은 파일을 이곳에 드롭 하세요
                    </div>
                </label>
            </div>
        </div>
    );
}

//결과 뷰
function ResultView({ viewModel }) {
    const [state, setState] = useState("result"); //"main", "loading", "result"
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
        <div>
            <div className={resultStyles.boxImage}></div>
            {state === "main" ? (
                <div className={resultStyles.box}>
                    <div>
                        <span
                            className={`${resultStyles.title}`}
                            style={{ color: "#FFD439" }}
                        >
                            코디
                        </span>
                        <span className={` ${resultStyles.title}`}>
                            {" 해드립니다"}
                        </span>
                    </div>
                    <div className={`${resultStyles.boxContent}`}>
                        {
                            "옷장 속에 있는 옷들이나\n쇼핑몰에 있는 옷 사진\n어떻게 입어야할지 모르겠으면\nViViO에서 해결해드릴께요!"
                        }
                    </div>
                    <button className={`${resultStyles.button}`}>
                        {"시작      -10"}
                    </button>
                </div>
            ) : state === "loading" ? (
                <div className={resultStyles.whiteBox}>
                    <div className={resultStyles.spinner}></div>
                    <div
                        className={`${resultStyles.loadingContent}`}
                        style={{ marginBottom: "83px" }}
                    >
                        지식인에 물어보는중...
                    </div>
                    <div className={`${resultStyles.loadingContent}`}>
                        *주의!
                    </div>
                    <div className={`${resultStyles.loadingWarning}`}>
                        <span className={resultStyles.red}>새로고침</span>
                        <span>을 하면 작업이</span>
                        <span className={resultStyles.red}>취소</span>
                        <span>될 수 있어요!</span>
                    </div>
                </div>
            ) : state === "result" ? (
                <div className={resultStyles.whiteBox}>
                    <div className={resultStyles.resultTitle}>
                        OO님에게 추천하는 코디에요!
                    </div>
                    <div className={resultStyles.resultBox}>
                        <Slider {...settings}>
                            <div className={resultStyles.resultPos}>
                                <div className={resultStyles.resultItem}>
                                    <div className={resultStyles.resultType}>
                                        스트릿 패션
                                    </div>
                                    <div className={resultStyles.resultImages}>
                                        <img
                                            src={sample1}
                                            className={resultStyles.resultImage}
                                        ></img>
                                        <img
                                            src={sample2}
                                            className={resultStyles.resultImage}
                                        ></img>
                                        <img
                                            src={sample3}
                                            className={resultStyles.resultImage}
                                        ></img>
                                    </div>
                                    <div
                                        className={
                                            resultStyles.resultContentBox
                                        }
                                    >
                                        <div>
                                            {'"' +
                                                "캐쥬얼 하고 편한느낌을 줄거에요" +
                                                '"'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={resultStyles.resultPos}>
                                <div className={resultStyles.resultItem}>
                                    <div className={resultStyles.resultType}>
                                        스트릿 패션
                                    </div>
                                    <div className={resultStyles.resultImages}>
                                        <img
                                            src={sample1}
                                            className={resultStyles.resultImage}
                                        ></img>
                                        <img
                                            src={sample2}
                                            className={resultStyles.resultImage}
                                        ></img>
                                        <img
                                            src={sample3}
                                            className={resultStyles.resultImage}
                                        ></img>
                                    </div>
                                    <div
                                        className={
                                            resultStyles.resultContentBox
                                        }
                                    >
                                        <div>
                                            {'"' +
                                                "캐쥬얼 하고 편한느낌을 줄거에요" +
                                                '"'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className={resultStyles.restartButton}>
                        {"시작      -10"}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

//히스토리 뷰
function HistoryView({ viewModel }) {
    const [barPosition, setBarPosition] = useState(170);

    //애니메이션
    const handleScroll = () => {
        const position =
            217 < window.scrollY - 53
                ? 217
                : 87 > window.scrollY - 53
                ? 87
                : window.scrollY - 53;
        setBarPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={historyStyles.bar} style={{ top: barPosition }}>
            <div className={historyStyles.title}>History</div>
            <div className={historyStyles.item}>
                <div className={historyStyles.line}></div>
                <img className={historyStyles.image}></img>
                <div className={historyStyles.text}></div>
            </div>
            <div className={historyStyles.item}>
                <div className={historyStyles.line}></div>
                <img src={sample1} className={historyStyles.image}></img>
                <div className={historyStyles.text}>타입입니다</div>
            </div>
            <div className={historyStyles.item}>
                <div className={historyStyles.line}></div>
                <img className={historyStyles.image}></img>
                <div className={historyStyles.text}></div>
            </div>
            <div className={historyStyles.item}>
                <div className={historyStyles.line}></div>
                <img className={historyStyles.image}></img>
                <div className={historyStyles.text}></div>
            </div>
            <div className={historyStyles.item}>
                <div className={historyStyles.line}></div>
                <img className={historyStyles.image}></img>
                <div className={historyStyles.text}></div>
            </div>
            <div className={historyStyles.item}>
                <div className={historyStyles.line}></div>
                <img className={historyStyles.image}></img>
                <div className={historyStyles.text}></div>
            </div>
            <div className={historyStyles.item}>
                <div className={historyStyles.line}></div>
                <img className={historyStyles.image}></img>
                <div className={historyStyles.text}></div>
            </div>
        </div>
    );
}

function CoordiFinderView({ viewModel }) {
    return (
        <div className={inputStyles.background}>
            <div className={inputStyles.backgroundBlur}>
                {/* 임시헤더 */}
                <div style={{ width: "100%", height: "83px" }}></div>{" "}
                <div className={inputStyles.viewContainer}>
                    <InputView />
                    <ResultView />
                    <HistoryView />
                </div>
            </div>
        </div>
    );
}
export default CoordiFinderView;
