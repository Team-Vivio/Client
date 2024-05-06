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
                        className={styles.InfoImg}
                    ></img>
                ) : (
                    <>
                        <img className={styles.DropImg} src={dropBox}></img>
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

function ClothesFinder(viewModel) {
    return (
        <div className={styles.background}>
            <div className={styles.backgroundBlur}></div>
            <InputSetting viewModel={viewModel} />
        </div>
    );
}

export default ClothesFinder;
