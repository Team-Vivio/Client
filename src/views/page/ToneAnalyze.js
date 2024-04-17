import styles from "../../styles/ToneAnalyze/ToneAnalyze.module.css"
import img_box from "../../img/ToneAnalyze/img_box.png"
import gender_male from "../../img/ToneAnalyze/gender_male.png"
import gender_female from "../../img/ToneAnalyze/gender_female.png"
import Body1 from "../../img/ToneAnalyze/Body1.png"
import Body2 from "../../img/ToneAnalyze/Body2.png"
import Body3 from "../../img/ToneAnalyze/Body3.png"
import img_true from "../../img/ToneAnalyze/img_ex1.png"
import img_false from "../../img/ToneAnalyze/img_ex2.png"
import img_file from "../../img/ToneAnalyze/img_file.png"
import DropBox1 from "../../img/ToneAnalyze/DropBox.png"
import Coin1 from "../../img/ToneAnalyze/Coin.png"
import { useEffect, useState } from "react"

function ImgBtn({ left, top, img, id, state, onClick }) {
    const info = {
        position: 'absolute',
        left: left,
        top: top,
        backgroundColor: id === state ? "#D9D9D9" : "#ffffff",
        backgroundImage: `url(${img})`
    };

    return (
        <button onClick={onClick} id={id} style={info} className={styles.ImgBtn}></button>
    )
}

function Text({ left, top, size, text, color = '#FFFFFF' }) {
    const pos = {
        position: 'absolute',
        left: left,
        top: top,
        fontSize: size,
        color: color
    };

    return (
        <div style={pos} className={styles.Text}>{text}</div>
    )
}

function ImgBox({ left, top, width, height, img, radius }) {
    const pos = {
        position: 'absolute',
        left: left,
        top: top,
        width: width,
        height: height,
        borderRadius: radius,
        backgroundImage: `url(${img})`,
    }

    return (
        <div style={pos} className={styles.ImgBox} />
    )
}

// onClick 구현 필요
// function FileDrop({ left, top, isBig, onClick }) {
//     const bg = {
//         position: 'absolute',
//         left: left,
//         top: top,
//         width: isBig ? '403px' : '200px',
//         height: isBig ? '253px' : '125px',

//         background: '#FFFFFF',
//         border: '1px solid #DBDBDB',
//         boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
//         borderRadius: '30px'
//     }
//     return (
//         <div style={bg}>
//             <ImgBox
//                 left={isBig ? '156px' : '77px'}
//                 top={isBig ? '51px' : '25px'}
//                 width={isBig ? '91px' : '45px'}
//                 height={isBig ? '97px' : '48px'}
//                 img={img_file}
//                 radius='0px'>
//             </ImgBox>
//             <div className={styles.BlackText}>
//                 <Text
//                     left={isBig ? '48px' : '35px'}
//                     top={isBig ? '179px' : '89px'}
//                     size={isBig ? '20px' : '9px'}
//                     text="클릭 혹은 파일을 이곳에 드롭 하세요"
//                     color='#000000'
//                 />
//             </div>
//         </div >
//     )
// }

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
            <span>-5</span>
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

function ToneAnalyze() {
    const [gender, setGender] = useState("");

    // const onClickBtn = (event) => {
        // event.target.id === 'male'
        //     ? (IsMale
        //         ? setIsMale(false)
        //         : () => { setIsMale(true); setIsFemale(false); }
        //     )
        //     : (IsFemale
        //         ? setIsFemale(false)
        //         : () => { setIsMale(false); setIsFemale(true); }
        //     )

        // if (event.target.id === 'male') {
        //     if (IsMale) {
        //         setIsMale(false);
        //         console.log("set male 'false'");
        //     }
        //     else {
        //         setIsMale(true);
        //         setIsFemale(false);
        //         console.log("set male 'true', female false");
        //     }
        // }
        // else {
        //     if (IsFemale) {
        //         setIsFemale(false);
        //         console.log("set female 'false'");
        //     }
        //     else {
        //         setIsMale(false);
        //         setIsFemale(true);
        //         console.log("set male 'false', female 'true'");
        //     }
        // }
        // console.log(event.target, IsMale, IsFemale);
    // }

    return (
        <div className={styles.Background}>
            <div className={styles.Blur}>
                <Text left='41px' top='121px' size='35px' text="쿨톤 & 웜톤 찾기" />
                <div>
                    <ImgBox left='40px' top='183px' width='610px' height='717px' img={img_box} radius='60px'></ImgBox>
                    <Text left='123px' top='220px' size='60px' text='쿨톤' color='#00A3FF' />
                    <Text left='252px' top='220px' size='60px' text='&' />
                    <Text left='308px' top='220px' size='60px' text='웜톤' color='#F8AAAA' />
                    <Text left='441px' top='220px' size='60px' text='찾기' />
                    <Text left='118px' top='354px' size='35px' text={"내 얼굴이 쿨톤이 어울리는지\n웜톤이 어울리는지 궁금하신가요?\n걱정 마세요.\nViViO에서\n당신의 궁금증을 해결해드릴께요"} />
                    <StartBtn left="204px" top="740px"/>
                </div>
                <div>
                    <Text left='786px' top='183px' size='28px' text="Q. 성별을 선택해주세요" />
                    <ImgBtn left='1119px' top='155px' img={gender_male} id='male' state={gender} onClick={() => setGender("male")} />
                    <ImgBtn left='1289px' top='155px' img={gender_female} id='female' state={gender} onClick={() => setGender("female")} />
                </div>
                <div>
                    <Text left='786px' top='295px' size='28px' text="Q. 얼굴 사진을 업로드 해주세요" />
                    <Text left='791px' top='337px' size='18px' text="*예시" color='#BCBCBC' />
                    <ImgBox left='800px' top='376px' width='159px' height='239px' img={img_true} radius='20px'></ImgBox>
                    <ImgBox left='1001px' top='376px' width='159px' height='239px' img={img_false} radius='20px'></ImgBox>
                    <DropBox />
                </div>
                <div>
                    <Text left='1030px' top='680px' size='26px' text="*주의사항" />
                    <Text left='786px' top='732px' size='20px' text="1. 이 기능은 밝은 배경에서 사용된 사진을 사용해야 정확해요" />
                    <Text left='786px' top='778px' size='20px' text="2. 또한 사진에 따라서 결과가 부정확하게 나올 수도 있어요" />
                    <Text left='786px' top='825px' size='20px' text="3. 가능하면 얼굴도 밝은 곳에서 찍어야 정확한 결과를 얻을 수 있어요" />
                    <Text left='786px' top='872px' size='20px' text="4. 전신 사진이 아니라 얼굴 위주로 찍힌 사진이어야 정확한 결과를 얻을 수 있어요" />
                </div>
                <div>
                    <HistoryBar />
                </div>
            </div>
        </div>
    )
}

export default ToneAnalyze;