import React, { useState } from "react";
import styles from "../../styles/ClothesFinder/ClothesFinder.module.css";

import gender1 from "../../img/ClothesFinder/gender_male.png";
import gender2 from "../../img/ClothesFinder/gender_female.png";
import img_top from "../../img/ClothesFinder/clothes_top.png";
import img_bot from "../../img/ClothesFinder/clothes_bottom.png";
import dropBox from "../../img/ClothesFinder/dropBox.png";

function DropBox({ viewModel }) {
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
            // revised
            viewModel.setUploadedImg(img);
            console.log("file successfully uploaded");
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsActive(false);
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

function InputSetting(viewModel) {
    return (
        <div>
            <div className={styles.title}>비슷한 옷 찾기</div>
            <div className={styles.question_1}>Q. 성별을 선택해주세요</div>
            <div className={styles.question_2}>
                Q. 찾고 싶은 옷의 종류를 선택해주세요
            </div>
            <div className={styles.question_3}>
                Q. 찾고 싶은 옷의 사진을 업로드 해주세요
            </div>
            <button
                className={styles.btn}
                style={{
                    width: "97px",
                    height: "85px",
                    left: "606px",
                    top: "208px",
                    backgroundImage: "url(" + gender1 + ")",
                }}
                onClick={""}
            />
            <button
                className={styles.btn}
                style={{
                    width: "97px",
                    height: "85px",
                    left: "776px",
                    top: "208px",
                    backgroundImage: "url(" + gender2 + ")",
                }}
                onClick={""}
            />
            <button
                className={styles.btn}
                style={{
                    width: "97px",
                    height: "85px",
                    left: "606px",
                    top: "331px",
                    backgroundImage: "url(" + img_top + ")",
                }}
                onClick={""}
            />
            <button
                className={styles.btn}
                style={{
                    width: "97px",
                    height: "85px",
                    left: "776px",
                    top: "331px",
                    backgroundImage: "url(" + img_bot + ")",
                }}
                onClick={""}
            />
            <DropBox viewModel={viewModel} />
        </div>
    );
}

function ResultBox(viewModel, state) {
    console.log(state);
    // console.log(viewModel.getResultList());
    return (
        /* <div>
            {(state === "main" && (
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
                ))}
            </div> */
        <div className={styles.ResultBox}>
            <span className={styles.ResultTitle}>검색 결과입니다</span>
            <div className={styles.ResultCategory}>
                <span>성별: </span>
                <span>여성</span>
                <span>종류: </span>
                <span>상의 </span>
            </div>
            <button className={styles.RestartBtn}>다시 검색하기</button>
            <div className={styles.ResultImg}></div>

            {/* map()으로 요소 나열 */}

            <div>
                <div className={styles.ResultLine}></div>
                <div className={styles.ResultCategory}>
                    <span>성별: </span>
                    <span>여성</span>
                    <span>종류: </span>
                    <span>상의 </span>
                </div>
                <div className={styles.ResultLine}></div>
                <div className={styles.ResultCategory}>
                    <span>성별: </span>
                    <span>여성</span>
                    <span>종류: </span>
                    <span>상의 </span>
                </div>
                <div className={styles.ResultLine}></div>
                <div className={styles.ResultCategory}>
                    <span>성별: </span>
                    <span>여성</span>
                    <span>종류: </span>
                    <span>상의 </span>
                </div>
            </div>
        </div>
    );
}

function ClothesFinder(viewModel) {
    const [state, setState] = useState(1); //"main", "loading", "result"
    console.log(state);
    return (
        <div className={styles.background}>
            <InputSetting viewModel={viewModel} />
            {/* result  굳이 따로 넘겨줘야 되나?*/}
            <ResultBox viewModel={viewModel} state={state} />
        </div>
    );
}

export default ClothesFinder;
