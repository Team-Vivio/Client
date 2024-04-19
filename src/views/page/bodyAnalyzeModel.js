import Coin1 from "../../img/bodyAnalyze/Coin.png";
import Body1 from "../../img/bodyAnalyze/Body1.png";

class BodyAnalyzeModel {
    constructor() {
        this.gender = ""; //"male", "female"
        this.bodyType = 0; //1, 2, 3
        this.resultList = [
            {
                id: 0,
                img: { Coin1 },
                title: "상의",
                color: "남색, 검은색",
                type: "후드티, 맨투맨",
                info: "어두운 색의 후드티나 맨투맨은 체형을 잘 감춰주고 슬림한 느낌을 줄 수 있습니다.",
            },
            {
                id: 1,
                img: { Body1 },
                title: "하의",
                color: "남색, 검은색",
                type: "청바지",
                info: "어두운 색의 후드티나 맨투맨은 체형을 잘 감춰주고 슬림한 느낌을 줄 수 있습니다.",
            },
        ];
    }
    setGender(value) {
        this.gender = value;
        console.log("Gender Changed: " + this.gender);
    }
    setBodyType(value) {
        this.bodyType = value;
        console.log("BodyType Changed: " + this.bodyType);
    }
}
export default BodyAnalyzeModel;
