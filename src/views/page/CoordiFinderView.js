import inputStyles from "../../styles/CoordiFinder/CoordiFinderInput.module.css";
import resultStyles from "../../styles/CoordiFinder/CoordiFinderResult.module.css";
import historyStyles from "../../styles/CoordiFinder/CoordiFinderHistory.module.css";
import modalStyles from "../../styles/CoordiFinder/CoordiFinderModal.module.css";
import "../../styles/CoordiFinder/Toggle.css";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick"; // react-slick 사용을 위해 import
import "../../styles/CoordiFinder/slick.css";
import { useCookies } from "react-cookie";

//이미지
import sample1 from "../../img/CoordiFinder/sample1.png";
import sample2 from "../../img/CoordiFinder/sample2.png";
import sample3 from "../../img/CoordiFinder/sample3.png";
import gender1 from "../../img/CoordiFinder/gender1.png";
import gender2 from "../../img/CoordiFinder/gender2.png";
import lock from "../../img/CoordiFinder/lock.png";

//url to File
const convertURLtoFile = async (url) => {
    const imgUrl = /^data:image/.test(url)
        ? url
        : url + "?" + new Date().getTime(); //이미지 캐시 우회
    const response = await fetch(imgUrl);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    const file = new File([data], filename, metadata);
    return file;
};

function ImageShow({ list, remove, fail }) {
    const scrollRef = useRef(null);
    const [isDrag, setIsDrag] = useState(false);
    const [startX, setStartX] = useState();

    const onDragStart = (e) => {
        e.preventDefault();
        setIsDrag(true);
        setStartX(e.pageX + scrollRef.current.scrollLeft);
    };

    const onDragEnd = () => {
        setIsDrag(false);
    };

    const onDragMove = (e) => {
        if (isDrag) {
            scrollRef.current.scrollLeft = startX - e.pageX;
        }
    };

    return (
        <div
            className={inputStyles.imageShow}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            ref={scrollRef}
        >
            {list.length <= 0
                ? null
                : list.map((value, index) => (
                      <div
                          className={
                              fail
                                  ? `${inputStyles.imageShowItem} ${inputStyles.imageShowItemBlur}`
                                  : `${inputStyles.imageShowItem}`
                          }
                          key={index}
                      >
                          <img
                              className={inputStyles.image}
                              src={value.img}
                          ></img>
                          <button
                              className={inputStyles.close}
                              onClick={() => remove(value.id)}
                          ></button>
                      </div>
                  ))}
        </div>
    );
}

//정보 입력 뷰
function InputView({ viewModel }) {
    const [flag, setFlag] = useState(false);
    let gender = viewModel.getGender();

    //이미지
    const [top, setTop] = useState([]);
    const [bottom, setBottom] = useState([]);
    const [outer, setOuter] = useState([]);
    //옷장 이미지 ID
    const [closetTop, setClosetTop] = useState([]);
    const [closetBottom, setClosetBottom] = useState([]);
    const [closetOuter, setClosetOuter] = useState([]);

    //업뎃
    useEffect(() => {
        viewModel.setTopList(top);
    }, [top]);

    useEffect(() => {
        viewModel.setBottomList(bottom);
    }, [bottom]);

    useEffect(() => {
        viewModel.setOuterList(outer);
    }, [outer]);

    const setImage = (file, type) => {
        const reader = new FileReader();
        reader.onload = () => {
            switch (type) {
                case "top":
                    top.push({
                        id: top.length + closetTop.length,
                        img: String(reader.result),
                        file: file,
                    });
                    setTop([...top]);
                    break;
                case "bottom":
                    bottom.push({
                        id: bottom.length + closetBottom.length,
                        img: String(reader.result),
                        file: file,
                    });
                    setBottom([...bottom]);
                    break;
                case "outer":
                    outer.push({
                        id: outer.length + closetOuter.length,
                        img: String(reader.result),
                        file: file,
                    });
                    setOuter([...outer]);
                    break;
                default:
                    break;
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, type) => {
        event.preventDefault();

        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (
                files[i] !== null &&
                files[i] !== undefined &&
                files[i].type.includes("image")
            ) {
                setImage(files[i], type);
            }
        }
    };

    const handleUpload = ({ target }, type) => {
        const files = target.files;
        for (let i = 0; i < files.length; i++) {
            if (
                files[i] !== null &&
                files[i] !== undefined &&
                files[i].type.includes("image")
            ) {
                setImage(files[i], type);
            }
        }
    };

    const removeTop = (id) => {
        setTop(top.filter((item) => item.id !== id));
    };

    const removeBottom = (id) => {
        setBottom(bottom.filter((item) => item.id !== id));
    };

    const removeOuter = (id) => {
        setOuter(outer.filter((item) => item.id !== id));
    };

    async function getColset() {
        //옷장 옷 가져오기
        const ct = await viewModel.getClosetTop();
        ct.data.result.images.map(async (value) => {
            const file = await convertURLtoFile(value.image);
            closetTop.push(top.length);
            top.push({
                id: top.length,
                img: value.image,
                file: file,
            });
            setTop([...top]);
        });

        const cb = await viewModel.getClosetBottom();
        cb.data.result.images.map(async (value) => {
            const file = await convertURLtoFile(value.image);
            closetBottom.push(bottom.length);
            bottom.push({
                id: bottom.length,
                img: value.image,
                file: file,
            });
            setBottom([...bottom]);
        });

        const co = await viewModel.getClosetOuter();
        co.data.result.images.map(async (value) => {
            const file = await convertURLtoFile(value.image);
            closetOuter.push(outer.length);
            outer.push({
                id: outer.length,
                img: value.image,
                file: file,
            });
            setOuter([...outer]);
        });
    }

    const removeCloset = () => {
        let temp = top;
        closetTop.forEach((value) => {
            temp = temp.filter((item) => item.id !== value);
        });
        setTop([...temp]);
        temp = bottom;
        closetBottom.forEach((value) => {
            temp = temp.filter((item) => item.id !== value);
        });
        setBottom([...temp]);
        temp = outer;
        closetOuter.forEach((value) => {
            temp = temp.filter((item) => item.id !== value);
        });
        setOuter([...temp]);
    };

    return (
        <div>
            <div className={inputStyles.titleItem}>
                <span className={`${inputStyles.whiteBig}`}>
                    나만의 코디찾기
                </span>
                <label className="switch">
                    <input
                        type="checkbox"
                        onClick={(e) => {
                            viewModel.setClosetActive(e.target.checked);
                            e.target.checked ? getColset() : removeCloset();
                        }}
                    ></input>
                    <span className="sliderT round"></span>
                </label>
            </div>
            <div className={inputStyles.q1Item}>
                <span className={`${inputStyles.whiteSmall}`}>
                    Q. 성별을 선택해주세요
                </span>
                <button
                    className={
                        gender === 0
                            ? inputStyles.Btn
                            : gender === 1
                            ? inputStyles.BtnUp
                            : inputStyles.BtnDown
                    }
                    style={{
                        marginLeft: "257px",
                        marginRight: "73px",
                        backgroundImage: "url(" + gender1 + ")",
                    }}
                    onClick={() => {
                        viewModel.setGender(1);
                        setFlag(!flag);
                    }}
                ></button>
                <button
                    className={
                        gender === 0
                            ? inputStyles.Btn
                            : gender === 2
                            ? inputStyles.BtnUp
                            : inputStyles.BtnDown
                    }
                    style={{ backgroundImage: "url(" + gender2 + ")" }}
                    onClick={() => {
                        viewModel.setGender(2);
                        setFlag(!flag);
                    }}
                ></button>
            </div>
            <div className={inputStyles.q2Item}>
                <div className={`${inputStyles.whiteSmall}`}>
                    Q. 상의를 두 종류 이상 업로드해주세요
                    {top.length < 2 ? (
                        <div className={inputStyles.redText}>
                            *사진을 두장 이상 올려주세요!
                        </div>
                    ) : (
                        <div style={{ height: "10px" }}></div>
                    )}
                    <ImageShow
                        list={top}
                        remove={removeTop}
                        fail={top.length < 2}
                    />
                </div>
                <div
                    className={inputStyles.imageBox}
                    style={{ marginLeft: "100px" }}
                >
                    <label
                        className={inputStyles.imagelabel}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, "top")}
                    >
                        <input
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) => handleUpload(e, "top")}
                        />
                        <div
                            className={` ${inputStyles.blackSmall} ${inputStyles.imageBoxText}`}
                        >
                            클릭 혹은 파일을 이곳에 드롭 하세요
                        </div>
                    </label>
                </div>
            </div>
            <div className={inputStyles.q2Item}>
                <div className={`${inputStyles.whiteSmall} `}>
                    Q. 하의를 두 종류 이상 업로드해주세요
                    {bottom.length < 2 ? (
                        <div className={inputStyles.redText}>
                            *사진을 두장 이상 올려주세요!
                        </div>
                    ) : (
                        <div style={{ height: "10px" }}></div>
                    )}
                    <ImageShow
                        list={bottom}
                        remove={removeBottom}
                        fail={bottom.length < 2}
                    />
                </div>
                <div
                    className={inputStyles.imageBox}
                    style={{ marginLeft: "100px" }}
                >
                    <label
                        className={inputStyles.imagelabel}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, "bottom")}
                    >
                        <input
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) => handleUpload(e, "bottom")}
                        />
                        <div
                            className={` ${inputStyles.blackSmall} ${inputStyles.imageBoxText}`}
                        >
                            클릭 혹은 파일을 이곳에 드롭 하세요
                        </div>
                    </label>
                </div>
            </div>
            <div className={inputStyles.q2Item}>
                <div className={`${inputStyles.whiteSmall} `}>
                    Q. 아우터를 하나 이상 업로드해주세요(선택)
                    <ImageShow list={outer} remove={removeOuter} />
                </div>
                <div
                    className={inputStyles.imageBox}
                    style={{ marginLeft: "35px" }}
                >
                    <label
                        className={inputStyles.imagelabel}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, "outer")}
                    >
                        <input
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) => handleUpload(e, "outer")}
                        />
                        <div
                            className={` ${inputStyles.blackSmall} ${inputStyles.imageBoxText}`}
                        >
                            클릭 혹은 파일을 이곳에 드롭 하세요
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}

//결과 뷰
function ResultView({ viewModel, state, result, event, text }) {
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
                    <button
                        className={`${resultStyles.button}`}
                        onClick={event}
                    >
                        {"시작"}
                    </button>
                </div>
            ) : state === "loading" ? (
                <div className={resultStyles.whiteBox}>
                    <div className={resultStyles.spinner}></div>
                    <div
                        className={`${resultStyles.loadingContent}`}
                        style={{ marginBottom: "83px" }}
                    >
                        {text}
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
                        {viewModel.getName() + "님에게 추천하는 코디에요!"}
                    </div>
                    <div className={resultStyles.resultBox}>
                        <Slider {...settings}>
                            {result.map((value, id) => (
                                <div
                                    className={resultStyles.resultPos}
                                    key={id}
                                >
                                    <div className={resultStyles.resultItem}>
                                        <div
                                            className={resultStyles.resultType}
                                        >
                                            {value.fashionName + " fashion"}
                                        </div>
                                        <div
                                            className={
                                                resultStyles.resultImages
                                            }
                                        >
                                            <img
                                                src={value.top}
                                                className={
                                                    resultStyles.resultImage
                                                }
                                            ></img>
                                            <img
                                                src={value.bottom}
                                                className={
                                                    resultStyles.resultImage
                                                }
                                            ></img>
                                            {value.outer ? (
                                                <img
                                                    src={value.outer}
                                                    className={
                                                        resultStyles.resultImage
                                                    }
                                                ></img>
                                            ) : null}
                                        </div>
                                        <div
                                            className={
                                                resultStyles.resultContentBox
                                            }
                                        >
                                            <div>
                                                {'"' + value.description + '"'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className={resultStyles.restartButton} onClick={event}>
                        {"시작"}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

//히스토리 뷰
function HistoryView({ viewModel, event, history }) {
    const [barPosition, setBarPosition] = useState(87);

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
            {history !== null
                ? history.map((value, index) => (
                      <div
                          className={historyStyles.item}
                          key={index}
                          onClick={() => event(value.id)}
                      >
                          <div className={historyStyles.line}></div>
                          <img
                              className={historyStyles.image}
                              src={value.image}
                          ></img>
                          <div className={historyStyles.text}>
                              {value.style}
                          </div>
                      </div>
                  ))
                : null}
        </div>
    );
}

function Modal({ viewModel, state, type, event, close }) {
    return state ? (
        <div className={modalStyles.background}>
            <div className={modalStyles.modal}>
                <button className={modalStyles.close} onClick={close}></button>
                <div className={modalStyles.content}>
                    <div className={modalStyles.item1}>*주의!</div>
                    <div className={modalStyles.item2}>
                        {viewModel.getModalMessage()[type].message}
                    </div>
                    <button className={modalStyles.enter} onClick={event}>
                        {viewModel.getModalMessage()[type].btn}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

function CoordiFinderView({ viewModel }) {
    const [state, setState] = useState("main"); //"main", "loading", "result"
    const [result, setResult] = useState(viewModel.getResultList());
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState(0);
    const [history, setHistory] = useState(viewModel.getHistoryList());
    const [isUser, setUser] = useState(false);

    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    useEffect(() => {
        if (!cookies.token || cookies.token === "undefined") {
            //비회원
            setUser(false);
        } else {
            //회원
            setUser(true);
        }
    }, [cookies]);

    async function getHistory() {
        await viewModel.getHistory();
        setHistory([...viewModel.getHistoryList()]);
    }

    useEffect(() => {
        viewModel.setToken(token);
        getHistory();
    }, []);

    async function postCoordi() {
        setState("loading");
        interval = setInterval(() => {
            console.log("interval");
            setText(
                viewModel.getLoadingText(
                    Math.floor(Math.random() * viewModel.getLoadingTextLength())
                )
            );
        }, 3000);
        await viewModel.postFashion();
        clearInterval(interval);
        console.log(viewModel.getResultList());
        if (viewModel.getResultList() !== null) {
            getHistory();
            setState("result"); //성공
            setResult(viewModel.getResultList());
        } else {
            setState("main");
            setModal(true);
            setModalType(3);
        }
    }
    async function getCoordi(fashionID) {
        await viewModel.getCoordi(fashionID);
        if (viewModel.getResultList() === null) {
            //결과를 못받으면
            setState("main");
        } else {
            setResult(viewModel.getResultList());
            setState("result");
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
    function modalEvent() {
        setModal(false);
        switch (modalType) {
            case 0: //이동하기
                break;
            case 1: //시작하기
                postCoordi();
                break;
            case 2: //닫기
            case 3:
                break;
        }
    }
    const [text, setText] = useState("패션 잡지 보는중...");
    let interval;
    return (
        <div className={inputStyles.background}>
            {/* {비회원 모달} */}
            {!isUser ? (
                <div className={modalStyles.background}>
                    <div className={modalStyles.modal}>
                        <button
                            className={modalStyles.close}
                            onClick={() => {
                                window.location.href = "/";
                            }}
                        ></button>
                        <div className={modalStyles.content}>
                            <img className={modalStyles.lock} src={lock} />
                            <div className={modalStyles.message}>
                                로그인 시 이용할 수 있어요!
                            </div>
                            <button
                                className={modalStyles.enter}
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
                viewModel={viewModel}
                state={modal}
                type={modalType}
                event={modalEvent}
                close={() => setModal(false)}
            />
            <div className={inputStyles.backgroundBlur}>
                {/* 헤더 공간 뺴기 */}
                <div style={{ width: "100%", height: "83px" }}></div>
                <div className={inputStyles.viewContainer}>
                    <InputView viewModel={viewModel} />
                    <ResultView
                        viewModel={viewModel}
                        state={state}
                        result={result}
                        event={start}
                        text={text}
                    />
                    <HistoryView
                        viewModel={viewModel}
                        event={getCoordi}
                        history={history}
                    />
                </div>
            </div>
        </div>
    );
}
export default CoordiFinderView;
