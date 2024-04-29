import React, { useEffect, useState } from 'react'
import mainLogo from '../../../img/VivioLogo.png'
import styles from "../../../styles/Signup.module.css"

function Signup() {
  const [gender, setGender] = useState(0);

  return (
    <div styles={{width: window.screen.width, height: window.screen.height}} className={styles.page}>
      <div>
        <img src={mainLogo} alt='logo'/>
      </div>
      <div className={styles.title}>
        생생한 패션 생활, ViVio에서 시작하세요
      </div>
      <div className={styles.box}>
        <div className={styles.inputTitle1}>
            이름
            <input className={styles.input1} placeholder='아무개'/>
        </div>
        <div className={styles.inputTitle2}>
            전화번호
            <input className={styles.input2} maxLength={13} placeholder='010-XXXX-XXXX'/>
        </div>
        <div className={styles.inputTitle3}>
            생년월일
            <input className={styles.input3_1} maxLength={4} placeholder='YYYY'/>
            <input className={styles.input3_2} maxLength={2} placeholder='MM'/>
            <input className={styles.input3_2} maxLength={2} placeholder='DD'/>
        </div>
        <div className={styles.inputTitle4}>
            성별
            <div className={styles.input4_1} onClick={()=>{setGender(1)}} style={gender === 1 ? {backgroundColor: '#FFD439', color: 'black', boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'} : {color: '#BBBBBB', border: '1px solid #C2C2C2'}}>남성</div>
            <div className={styles.input4_2} onClick={()=>{setGender(2)}} style={gender === 2 ? {backgroundColor: '#FFD439', color: 'black', boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'} : {color: '#BBBBBB', border: '1px solid #C2C2C2'}}>여성</div>
        </div>
        <div className={styles.inputTitle5}>
            이메일
            <input className={styles.input5} placeholder='abce@email.com'/>
            <button className={styles.smallBtn1}>인증</button>
        </div>
        <div className={styles.inputTitle6}>
            인증번호
            <input className={styles.input6} placeholder='이메일 인증번호를 입력해주세요'/>
            <button className={styles.smallBtn2}>확인</button>
        </div>
        <div className={styles.inputTitle7}>
            비밀번호
            <input type='password' className={styles.input7} placeholder='비밀번호를 입력해주세요'/>
        </div>
        <div className={styles.pwdText}>
            *5-13자 사이로 입력　*영어 숫자 혼합 필수
        </div>
        <div className={styles.inputTitle8} maxLength={13}>
            비밀번호 확인
            <input type='password' className={styles.input8} placeholder='비밀번호를 다시 한번 입력해주세요'/>
        </div>
        <button className={styles.signBtn}>
            회원가입
        </button>
      </div>
    </div>
  )
}

export default Signup
