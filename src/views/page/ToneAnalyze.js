import styles from "../../styles/ToneAnalyze/ToneAnalyze.module.css"
import img_box from "../../img/ToneAnalyze/img_box.png"
import gender_male from "../../img/ToneAnalyze/gender_male.png"
import gender_female from "../../img/ToneAnalyze/gender_female.png"
import img_true from "../../img/ToneAnalyze/img_ex1.png"
import img_false from "../../img/ToneAnalyze/img_ex2.png"
import img_file from "../../img/ToneAnalyze/img_file.png"
import { useState } from "react"

function ImgBtn({ left, top, img }) {
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
function FileDrop({ left, top, isBig, onClick }) {
    const bg = {
        position: 'absolute',
        left: left,
        top: top,
        width: isBig ? '403px' : '200px',
        height: isBig ? '253px' : '125px',

        background: '#FFFFFF',
        border: '1px solid #DBDBDB',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '30px'
    }
    return (
        <div style={bg}>
            <ImgBox
                left={isBig ? '156px' : '77px'}
                top={isBig ? '51px' : '25px'}
                width={isBig ? '91px' : '45px'}
                height={isBig ? '97px' : '48px'}
                img={img_file}
                radius='0px'>
            </ImgBox>
            <div className={styles.BlackText}>
                <Text
                    left={isBig ? '48px' : '35px'}
                    top={isBig ? '179px' : '89px'}
                    size={isBig ? '20px' : '9px'}
                    text="클릭 혹은 파일을 이곳에 드롭 하세요"
                    color='#000000'
                />
            </div>
        </div >
    )
}

// JSON으로 API 받아오는 작업 필요
function History({ left, top, JSON }) {
    const bg = {
        position: 'absolute',
        left: left,
        top: top,
        width: '166px',
        height: '629px',

        background: '#FFFFFF',
        border: '1px solid #DBDBDB',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '30px'
    }

    return (
        <div style={bg}>
            <Text left='48px' top='14px' size='20px' text="History" color="#000000" />
        </div >
    )
}

function ToneAnalyze() {

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
                    <Text left='118px' top='354px' size='35px' text="내 얼굴이 쿨톤이 어울리는지
웜톤이 어울리는지 궁금하신가요?
걱정 마세요. 
ViViO에서 
당신의 궁금증을 해결해드릴께요 " />
                </div>
                <div>
                    <Text left='786px' top='183px' size='28px' text="Q. 성별을 선택해주세요" />
                    <ImgBtn left='1119px' top='155px' img={gender_male} />
                    <ImgBtn left='1289px' top='155px' img={gender_female} />
                </div>
                <div>
                    <Text left='786px' top='295px' size='28px' text="Q. 얼굴 사진을 업로드 해주세요" />
                    <Text left='791px' top='337px' size='18px' text="*예시" color='#BCBCBC' />
                    <ImgBox left='800px' top='376px' width='159px' height='239px' img={img_true} radius='20px'></ImgBox>
                    <ImgBox left='1001px' top='376px' width='159px' height='239px' img={img_false} radius='20px'></ImgBox>
                    <FileDrop left='1251px' top='376px' isBig={true} />
                </div>
                <div>
                    <Text left='1030px' top='680px' size='26px' text="*주의사항" />
                    <Text left='786px' top='732px' size='20px' text="1. 이 기능은 밝은 배경에서 사용된 사진을 사용해야 정확해요" />
                    <Text left='786px' top='778px' size='20px' text="2. 또한 사진에 따라서 결과가 부정확하게 나올 수도 있어요" />
                    <Text left='786px' top='825px' size='20px' text="3. 가능하면 얼굴도 밝은 곳에서 찍어야 정확한 결과를 얻을 수 있어요" />
                    <Text left='786px' top='872px' size='20px' text="4. 전신 사진이 아니라 얼굴 위주로 찍힌 사진이어야 정확한 결과를 얻을 수 있어요" />
                </div>
                <div>
                    <History left='1737px' top='171px' />
                </div>
            </div>
        </div>
    )
}

export default ToneAnalyze;