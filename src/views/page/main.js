import React, { useState, useEffect } from 'react';
import styles from '../../styles/page/main.module.css';
import nextbutton from '../../nextB.png';
import prevbutton from '../../prevB.png';
import vivio from '../../VIVIOmain.png';

function main() {
    
    const activate1 = (e) => {
        const slider = document.querySelector(".slider");
        const items = document.querySelectorAll(`.${styles.item}`);
        slider.prepend(items[items.length - 1]);
    };

      const activate2 = (e) => {
        const slider = document.querySelector(".slider");
        const items = document.querySelectorAll(`.${styles.item}`);
        slider.append(items[0]);
      };
    function handleCraft1Click() {
	    window.location.href = "/FashionRecommend";
    }
    function handleCraft2Click() {
        window.location.href = "/PersonalColor";
    }
    function handleCraft3Click() {
        window.location.href = "/ClothesFinder";
    }
    function handleCraft4Click() {
        window.location.href = "/CoordiFinder";
    }
    
  return (
    <body>
        <div className={styles.Container}>
        <ul class="slider">
            {/* 슬라이더 아이템 여기에 배치 */}
            <li className={styles.item} style={{
                backgroundImage: 'url(./img/main4.png)'
            }}>
                <div className={styles.content}>
                    <h2 className={styles.title}>나만의 코디 찾기</h2>
                    <p className={styles.description}>'오늘 뭐입지?' 하면서<br/>
                    고민했던 적이 있나요?<br/>걱정마세요! VIVIO가 찾아줄 거에요</p>
                    <button onClick={handleCraft4Click}>시작하기</button>
                </div>
            </li>
            <li className={styles.item} style={{
                backgroundColor : "#595959"
            }}>
                <div className={styles.content}>
                    <img src={vivio} alt='vivio'></img>
                    <h2 className={styles.title1}>생생한 패션 & 뷰티 ai 분석 서비스</h2>
                </div>
            </li>
            <li className={styles.item} style={{
                backgroundImage: 'url(./img/main1.png)'
            }}>
                <div className={styles.content}>
                    <h2 className={styles.title}>나만의 패션 찾기</h2>
                    <p className={styles.description}>AI를 이용해 <br/>자신에게 맞는 패션을 찾아보세요!</p>
                    <button onClick={handleCraft1Click}>시작하기</button>
                </div>
            </li>
            <li className={styles.item} style={{
                backgroundImage: 'url(./img/main2.png)'
            }}>
                <div className={styles.content}>
                    <h2 className={styles.title}>쿨톤 & 웜톤 찾기</h2>
                    <p className={styles.description}>나는 쿨톤인가요? 웜톤인가요?<br/>VIVIO에서 찾아보세요!</p>
                    <button onClick={handleCraft2Click}>시작하기</button>
                </div>
            </li>
            <li className={styles.item} style={{
                backgroundImage: 'url(./img/main3.png)'
            }}>
                <div className={styles.content}>
                    <h2 className={styles.title}>비슷한 옷 찾기</h2>
                    <p className={styles.description}>옷은 예쁜데 어디서 파는지,<br/>
                    궁금하셨던 적이 있으신가요?<br/>저의 VIVIO가 찾아드립니다</p>
                    <button onClick={handleCraft3Click}>시작하기</button>
                </div>
            </li>
        </ul>
            <nav className={styles.nav}>
                <img className={styles.btn} onClick={activate1} src={prevbutton} alt='prev'></img>
                <img className={styles.btn} onClick={activate2} src={nextbutton} alt='next'></img>
            </nav>
        </div>
    </body>
  )
}

export default main