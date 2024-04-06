import styles from "../../styles/bodyAnalyze/bodyAnalyze.module.css"
import Gender1 from "../../img/bodyAnalyze/Gender1.png"
import Gender2 from "../../img/bodyAnalyze/Gender2.png"

function Btn({left, top, img}) {
    const info = {
        position: 'absolute',
        left: left,
        top: top,
        backgroundImage: `url(${img})`
    };

    return (
        <button style={info} className={styles.ImgBtn}></button>
    )
}

function Text({left, top, size, text}) {
    const pos = {
        position: 'absolute',
        left: left,
        top: top,
        fontSize: size
    };

    return (
        <div style={pos} className={styles.Text}>{text}</div>
    )
}

function BodyAnalyze() {
    return (
        <div className={styles.Background}>
            <div className={styles.Blur}>
                <Text left='41px' top='121px' size='35px' text="나만의 패션 찾기"/>
                <Text left='96px' top='260px' size='28px' text="Q1. 성별을 선택해주세요"/>
                <Btn left='134px' top='322px' img = {Gender1}/>
                <Btn left='304px' top='322px' img = {Gender2}/>
            </div>
        </div>
    )
}

export default BodyAnalyze;