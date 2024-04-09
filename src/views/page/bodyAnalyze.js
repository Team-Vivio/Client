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

function Input({left, top}) {
    const pos = {
        position: 'absolute',
        left: left,
        top: top
    }

    //글자 조건 키랑 몸무게 같음
    function handleOnChange(event) {
        if (event.target.value.length > 3) { //3글자가 넘어가면
            if (event.target.value.indexOf(".") !== -1) { //소수점이 있다면 5자리 컷
                event.target.value = event.target.value.substr(0, event.target.value.length > 5 ? 5 : event.target.value.length);
            }
            else { //소수점 없으면 3자리 컷
                event.target.value = event.target.value.substr(0, 3);
            }
        }
    }

    function handleOnBlur(event) {
        if (event.target.value.indexOf(".") !== -1) { //소수점이 있다면 반올림
            event.target.value = Math.round(event.target.value);
        }
        event.target.value = event.target.value.substr(0, 3);
    }

    return (
        <input type='number' onChange={handleOnChange} onBlur={handleOnBlur} style={pos} className={styles.Input}></input>
    )
}

function BodyAnalyze() {
    return (
        <div className={styles.Background}>
            <div className={styles.Blur}>
                <Text left='41px' top='121px' size='35px' text="나만의 패션 찾기"/>
                <> {/* Q1 성별 선택 */}
                    <Text left='96px' top='260px' size='28px' text="Q1. 성별을 선택해주세요"/>
                    <Btn left='134px' top='322px' img = {Gender1}/>
                    <Btn left='304px' top='322px' img = {Gender2}/>
                </>
                <> {/* Q2 키 입력 */}
                    <Text left='96px' top='447px' size='28px' text="Q2. 키를 입력해주세요"/>
                    <Input left='134px' top='507px'/>
                    <Text left='330px' top='512px' size='30px' text="CM"/>
                </>
                <> {/* Q3 몸무게 입력 */}
                    <Text left='96px' top='593px' size='28px' text="Q3. 몸무게를 입력해주세요"/>
                    <Input left='134px' top='655px'/>
                    <Text left='330px' top='662px' size='30px' text="Kg"/>
                </>
                <>
                    <Text left='534px' top='260px' size='28px' text="Q4. 체형을 선택해주세요"/>
                </>
            </div>
        </div>
    )
}

export default BodyAnalyze;