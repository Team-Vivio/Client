import { useState } from "react";

import Gender1 from "../../img/bodyAnalyze/Gender1.png";
import Gender2 from "../../img/bodyAnalyze/Gender2.png";

class BodyAnalyzeViewModel {
    constructor(model) {
        this.model = model;
        this.textList = [
            {
                left: "41px",
                top: "121px",
                size: "35px",
                text: "나만의 패션 찾기",
            },
            {
                left: "96px",
                top: "260px",
                size: "28px",
                text: "Q1. 성별을 선택해주세요",
            },
            {
                left: "96px",
                top: "447px",
                size: "28px",
                text: "Q2. 키를 입력해주세요",
            },
            {
                left: "330px",
                top: "512px",
                size: "30px",
                text: "CM",
            },
            {
                left: "96px",
                top: "593px",
                size: "28px",
                text: "Q3. 몸무게를 입력해주세요",
            },
            {
                left: "330px",
                top: "662px",
                size: "30px",
                text: "Kg",
            },
            {
                left: "534px",
                top: "260px",
                size: "28px",
                text: "Q4. 체형을 선택해주세요",
            },
            {
                left: "534px",
                top: "447px",
                size: "28px",
                text: "Q5. 정확도를 위해\n\t전신 사진을 올려주세요(선택)",
            },
        ];
        this.GenderBtns = [
            {
                left: "134px",
                top: "322px",
                img: Gender1,
                size: "45px",
                id: "male",
                active: false,
            },
            {
                left: "304px",
                top: "322px",
                img: Gender2,
                size: "45px",
                id: "female",
                active: false,
            },
        ];
    }
    setGender(value) {
        this.model.setGender(value);
        this.GenderBtns.forEach((element) => {
            if (element.id === value) {
                console.log(element.id + "Actived");
                element.active = true;
            } else {
                console.log(element.id + "Disactived");
                element.active = false;
            }
        });
    }
    setBodyType(value) {
        this.model.bodyType = value;
    }
}

export default BodyAnalyzeViewModel;
