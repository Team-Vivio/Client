import Gender1 from "../../img/ToneAnalyze/gender_male.png";
import Gender2 from "../../img/ToneAnalyze/gender_female.png";
import img_true from "../../img/ToneAnalyze/img_ex1.png";
import img_false from "../../img/ToneAnalyze/img_ex2.png";

class ToneAnalyzeViewModel {
    constructor(model) {
        this.model = model;
        this.textList = [
            {
                left: "41px",
                top: "121px",
                size: "35px",
                text: "쿨톤 & 웜톤 찾기",
            },
            {
                left: "786px",
                top: "183px",
                size: "28px",
                text: "Q. 성별을 선택해주세요",
            },
            {
                left: "786px",
                top: "295px",
                size: "28px",
                text: "Q. 얼굴 사진을 업로드 해주세요",
            },
            {
                left: "791px",
                top: "337px",
                size: "18px",
                text: "*예시",
            },
            {
                left: "1030px",
                top: "680px",
                size: "26px",
                text: "*주의사항",
            },
            {
                left: "786px",
                top: "732px",
                size: "20px",
                text: "1. 이 기능은 밝은 배경에서 사용된 사진을 사용해야 정확해요",
            },
            {
                left: "786px",
                top: "778px",
                size: "20px",
                text: "2. 또한 사진에 따라서 결과가 부정확하게 나올 수도 있어요",
            },
            {
                left: "786px",
                top: "825px",
                size: "20px",
                text: "3. 가능하면 얼굴도 밝은 곳에서 찍어야 정확한 결과를 얻을 수 있어요",
            },
            {
                left: "786px",
                top: "872px",
                size: "20px",
                text: "4. 전신 사진이 아니라 얼굴 위주로 찍힌 사진이어야 정확한 결과를 얻을 수 있어요",
            },
            {
                left: "786px",
                top: "914px",
                size: "20px",
                text: "5. 화장법 가이드는 참고용으로만 봐주세요!",
            },
        ];
        this.GenderBtns = [
            {
                left: "1119px",
                top: "155px",
                img: Gender1,
                size: "45px",
                id: 1,
                active: false,
            },
            {
                left: "1289px",
                top: "155px",
                img: Gender2,
                size: "45px",
                id: 2,
                active: false,
            },
        ];
        this.ImgBoxList = [
            {
                left: "800px",
                top: "376px",
                width: "159px",
                height: "239px",
                img: img_true,
                radius: "20px",
            },
            {
                left: "1001px",
                top: "376px",
                width: "159px",
                height: "239px",
                img: img_false,
                radius: "20px",
            },
        ];

        // 가장 후순위
        this.modalActive = false;
        this.modalIndex = -1;
    }
    setGender(value) {
        this.model.setGender(value);
        this.GenderBtns.forEach((element) => {
            if (element.id === value) {
                // console.log(element.id + "Actived");
                element.active = true;
            } else {
                // console.log(element.id + "Disactived");
                element.active = false;
            }
        });
    }
    getName() {
        return this.model.getName();
    }
    getAllResultList() {
        return this.model.getAllResultList();
    }
    getModalList() {
        return this.modalList;
    }

    getAllHistoryList() {
        return this.model.getAllHistoryList();
    }
    getUploadedImg() {
        return this.model.getUploadedImg();
    }
    setUploadedImg(file) {
        this.model.setUploadedImg(file);
    }
    setState(value) {
        this.model.setState(value);
    }
    getState() {
        return this.model.getState();
    }
    dataCheck() {
        return this.model.dataCheck();
    }
    getModalActive() {
        return this.modalActive;
    }
    setModalActive(value) {
        this.modalActive = value;
    }
    getModalIndex() {
        return this.modalIndex;
    }
    setModalIndex(value) {
        this.modalIndex = value;
    }
    setFormData(img) {
        this.model.setFormData(img);
    }
    postPerCol = async () => {
        await this.model.postPerCol();
    };
    getPerCol = async (perColID) => {
        await this.model.getPerCol(perColID);
    };
    getHistory = async () => {
        await this.model.getHistory();
    };
}

export default ToneAnalyzeViewModel;
