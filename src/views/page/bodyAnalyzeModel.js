import Coin1 from "../../img/bodyAnalyze/Coin.png";
import Body1 from "../../img/bodyAnalyze/Body1.png";

class BodyAnalyzeModel {
    constructor() {
        this.gender = ""; //"male", "female"
        this.bodyType = 0; //1, 2, 3
        this.height = 0; //키
        this.weight = 0; //몸무게
        this.resultList = [
            {
                id: 0,
                img: Coin1,
                title: "상의",
                color: "남색, 검은색",
                type: "후드티, 맨투맨",
                info: "어두운 색의 후드티나 맨투맨은 체형을 잘 감춰주고 슬림한 느낌을 줄 수 있습니다.",
            },
            {
                id: 1,
                img: Body1,
                title: "하의",
                color: "남색, 검은색",
                type: "청바지",
                info: "어두운 색의 후드티나 맨투맨은 체형을 잘 감춰주고 슬림한 느낌을 줄 수 있습니다.",
            },
        ];
        this.name = "이름";
        this.historyList = [
            { id: 1, img: Coin1, info: "설명임" },
            { id: 2, img: Coin1, info: "설명2" },
            { id: 3, img: "", info: "" },
            { id: 4, img: "", info: "" },
            { id: 5, img: "", info: "" },
            { id: 6, img: "", info: "" },
            { id: 7, img: "", info: "" },
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
    setHeight(value) {
        this.height = value;
        console.log("Height setted: " + this.height);
    }
    setWeight(value) {
        this.weight = value;
        console.log("Weight setted: " + this.weight);
    }
    getAllResultList() {
        return this.resultList;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getAllHistoryList() {
        return this.historyList;
    }
}
export default BodyAnalyzeModel;