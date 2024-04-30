import styles from "../../styles/CoordiFinder/CoordiFinder.module.css";
import "../../styles/CoordiFinder/Toggle.css";
import { useState } from "react";

function InputView({ ViewModel }) {
    return (
        <div>
            <div className={styles.titleItem}>
                <span className={`${styles.whiteBig} ${styles.font}`}>
                    코디해드립니다
                </span>
                <label class="switch">
                    <input type="checkbox"></input>
                    <span class="slider round"></span>
                </label>
            </div>
            <div className={styles.q1Item}>
                <span className={`${styles.whiteSmall} ${styles.font}`}>
                    Q. 성별을 선택해주세요
                </span>
                <button
                    className={styles.button}
                    style={{ marginLeft: "257px", marginRight: "73px" }}
                >
                    버튼 1
                </button>
                <button className={styles.button}>버튼 2</button>
            </div>
            <div className={styles.q2Item}>
                <div className={`${styles.whiteSmall} ${styles.font}`}>
                    Q. 상의를 두 종류 이상 업로드해주세요
                </div>
                <label
                    className={styles.imageBox}
                    style={{ marginLeft: "100px" }}
                >
                    <input type="file" style={{ display: "none" }} />
                    <div
                        className={`${styles.font} ${styles.blackSmall} ${styles.imageBoxText}`}
                    >
                        클릭 혹은 파일을 이곳에 드롭 하세요
                    </div>
                </label>
            </div>
            <div className={styles.q2Item}>
                <div className={`${styles.whiteSmall} ${styles.font}`}>
                    Q. 하의를 두 종류 이상 업로드해주세요
                </div>
                <label
                    className={styles.imageBox}
                    style={{ marginLeft: "100px" }}
                >
                    <input type="file" style={{ display: "none" }} />
                    <div
                        className={`${styles.font} ${styles.blackSmall} ${styles.imageBoxText}`}
                    >
                        클릭 혹은 파일을 이곳에 드롭 하세요
                    </div>
                </label>
            </div>
            <div className={styles.q2Item}>
                <div className={`${styles.whiteSmall} ${styles.font}`}>
                    Q. 아우터를 하나 이상 업로드해주세요(선택)
                </div>
                <label
                    className={styles.imageBox}
                    style={{ marginLeft: "35px" }}
                >
                    <input type="file" style={{ display: "none" }} />
                    <div
                        className={`${styles.font} ${styles.blackSmall} ${styles.imageBoxText}`}
                    >
                        클릭 혹은 파일을 이곳에 드롭 하세요
                    </div>
                </label>
            </div>
        </div>
    );
}

function ResultView() {
    return <div></div>;
}

function HistoryView() {
    return <div></div>;
}

function CoordiFinderView({ viewModel }) {
    return (
        <div className={styles.background}>
            <div className={styles.backgroundBlur}>
                {/* 임시헤더 */}
                <div style={{ width: "100%", height: "83px" }}></div>{" "}
                <div className={styles.viewContainer}>
                    <InputView />
                    <ResultView />
                    <HistoryView />
                </div>
            </div>
        </div>
    );
}
export default CoordiFinderView;
