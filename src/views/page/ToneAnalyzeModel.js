import axios from "axios";

class ToneAnalyzeModel {
    constructor() {
        this.gender = null; //1, 2
        // this.resultList = null;
        this.resultList = {
            data: {
                isSuccess: true,
                code: "COMMON200",
                message: "성공입니다.",
                result: {
                    gender: "male",
                    session: "SPRING",
                    tone: "WARM",
                    hair: {
                        colors: [
                            {
                                code: "291C13",
                            },
                            {
                                code: "8D0000",
                            },
                        ],
                        description:
                            "봄 웜톤은 봄 타입 특유의 부드러움을 어필할 수 있는\n약간의 컬이 들어가는, 깔끔함이 느껴지는 중간 정도 큰 \nC 컬로 펌을 하면 좋을 것같아요, 펌을 할때는  컬이 작거나 부스스한\n느낌의 펌은 어울리지 않기 때문에 피하는 것 좋습니다.\n염색을 할 경우에는 다크 브라운 부터 레드 브라운 까지 브라운 계열의\n컬러가 잘 어울립니다. \n단 쿨톤에게 어울리는 블루 블랙이나 애쉬 톤의 컬러는 피해주세요",
                    },
                    personalColor: {
                        colors: [
                            {
                                code: "F9A319",
                            },
                            {
                                code: "F1735F",
                            },
                            {
                                code: "FBD4C5",
                            },
                        ],
                        description:
                            "전체적으로 화사한 컬러가 잘 어울리지만, 세부적으로는\n순도가 높고 맑은 컬러, 옐로우가 많이 섞인 부드럽고 따뜻한\n온도감이 느껴지는 컬러들이 잘 어울려요",
                    },
                    beauty: {
                        description:
                            "베이스 메이크업은 자연스러운 광채가 나는 파운데이션 제품을 추천합니다.\n살구색 또는 코랄 등의 색상을 아이섀도우로 사용해보세요. 눈두덩이 전체에 밝은 색상을 바르고, 눈꼬리 부분에는 약간 어두운 색상을 더해 음영을 주는 것이 좋습니다.\n아이라이너는 갈색 또는 다크 브라운 컬러의 아이라이너를 사용하여 눈매를 강조해보세요. 눈꼬리는 살짝 올려 그리면서 더욱 세련된 인상을 줄 수 있습니다.",
                    },
                },
            },
        };
        this.name = "OO";
        this.historyList = null;

        // this.uploadedImg = null;
        this.uploadedImg =
            "https://elasticbeanstalk-ap-northeast-2-975050140700.s3.ap-northeast-2.amazonaws.com/img11_jpg.rf.7a9abce86fc3d3855d03759db85550f4.jpg";

        this.state = "main"; //main, loading, result
        this.formData = new FormData(); // /colors/
        this.formData2 = new FormData(); // /colors/personalColor
    }
    setGender(value) {
        this.gender = value;
        console.log("Gender Changed: " + this.gender);
    }
    getAllResultList() {
        return this.resultList === null ? null : this.resultList.data.result;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getAllHistoryList() {
        if (this.historyList === null) {
            console.log("No History");
            return null;
        } else {
            let list = this.historyList.data.result.viewListResultDTOS;
            // ex)
            // {
            //     "image": null,
            //     "session": "spring",
            //     "tone": "warm",
            //     "perColId": 1
            // },
            for (let history of list) {
                if (history.tone === "warm") history.tone = "웜톤";
                else if (history.tone === "cool") history.tone = "쿨톤";
            }

            if (list.length < 7)
                for (let i = list.length; i < 7; i++) {
                    list.push({ image: "", type: "" });
                }
            else list = list.slice(0, 7);
            return list;
            //근데 이러면 최초의 7개만 보여주는거 아닌감? 나중에 수정해야징
        }
    }
    getUploadedImg() {
        return this.uploadedImg;
    }
    setUploadedImg(value) {
        this.uploadedImg = value;
        console.log("setUploadedImg func success");
        console.log(this.uploadedImg);
    }
    dataCheck() {
        console.log(this.gender);
        if (this.gender !== null && this.uploadedImg !== null) {
            return true;
        } else {
            return false;
        }
    }
    // state getter setter는 바뀜
    setState(value) {
        this.state = value;
    }
    getState() {
        return this.state;
    }
    setFormData(img) {
        this.formData = new FormData();
        this.formData.append("image", img);
        for (const keyValue of this.formData) console.log(keyValue);
    }

    //퍼스널 컬러 추천받고 저장하기
    postPerCol = async () => {
        this.resultList = null; //초기화
        // uploadedImg 있을시만 호출이라 아마 필요 없을 듯

        // if (this.uploadedImg === null) {
        //     //이미지 없다는 뜻
        //     this.formData.append("image", new File([""], "filename"));
        // }
        const value = {
            gender: this.gender,
        };
        this.formData.append("request", JSON.stringify(value));
        // 이때 image, request 모두 담아 /colors/에 Post

        console.log("----1----");
        for (const keyValue of this.formData) console.log(keyValue); // ["img", File] File은 객체
        console.log("----1----");

        try {
            this.resultList = await axios({
                method: "POST",
                url: `/colors/`,
                mode: "cors",
                headers: {
                    "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                },
                data: this.formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
            });
            console.log(this.resultList);
            console.log("api 1 post 조회 성공");

            //저장

            const accessToken =
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";

            const session =
                this.resultList.session === "SPRING"
                    ? 1
                    : this.resultList.session === "SUMMER"
                    ? 2
                    : this.resultList.session === "AUTUMN"
                    ? 3
                    : this.resultList.session === "WINTER"
                    ? 4
                    : "?";
            const save = {
                gender: this.gender,
                // personalColor: this.resultList.data.result.session, // SPRING -> 1로 바꿔야됨!!!!!
                personalColor: session, // SPRING -> 1로 바꿔야됨!!!!!
                // TODO:
            };

            // 이 부분 테스트 필요
            // this.formData2.append("image", new File([""], "filename"));
            this.formData2.append("image", this.getUploadedImg());
            this.formData2.append("request", JSON.stringify(save));
            console.log("----2----");
            for (const keyValue of this.formData2) console.log(keyValue); // ["img", File] File은 객체
            console.log("----2----");
            try {
                const saveResult = await axios({
                    method: "POST",
                    url: `/colors/personalColor`,
                    mode: "cors",
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                    data: this.formData2, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
                });
                console.log("--------");
                console.log(saveResult);
                console.log("--------");
                console.log("api 2 post 저장 성공");
            } catch (error) {
                console.log(error);
            }
            this.getHistory(); //저장하고 기록 다시 가져오기
        } catch (error) {
            console.log(error);
        }
    };
    // 히스토리의 추천 받았던 패션정보 불러오기
    getPerCol = async (personalColorId) => {
        this.resultList = null;
        const accessToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
        try {
            this.resultList = await axios({
                method: "GET",
                url: `/colors/personalColor/${personalColorId}`,
                mode: "cors",
                headers: {
                    Authorization: `${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            // result.data.result.fashionTops.forEach((element) => {
            //     element.title = "상의";
            // });
            // result.data.result.fashionBottoms.forEach((element) => {
            //     element.title = "하의";
            // });
            // this.resultList = result.data.result.fashionTops.concat(
            //     ...result.data.result.fashionBottoms
            // );

            // this.resultList = result.data.result.hair.concat(
            //     ...result.data.result.personalColor // ... 붙여야되나?
            // );
            // this.resultList = this.resultList.concat(
            //     ...result.data.result.beauty
            // );
            // console.log(this.resultList); // 쫄리면 테스트 ㄱ
        } catch (error) {
            console.log(error);
        }
    };

    getHistory = async () => {
        const accessToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
        try {
            this.historyList = await axios({
                method: "GET",
                url: `/colors/personalColor`,
                mode: "cors",
                headers: {
                    Authorization: `${accessToken}`,
                },
            });
            console.log(this.historyList);
        } catch (error) {
            console.log(error);
        }
    };
}

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs

export default ToneAnalyzeModel;
