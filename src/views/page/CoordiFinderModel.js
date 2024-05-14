import axios from "axios";

class CoordiFinderModel {
    constructor() {
        this.gender = 0;
        this.closetActive = false;
        this.closetList = [];
        //key가 id, img로 이루어짐
        this.topList = [];
        this.bottomList = [];
        this.outerList = [];
        this.historyList = null;
        this.resultList = null;
        this.formData = new FormData();
    }
    dataCheck() {
        return (
            this.gender !== null &&
            this.topList.length > 0 &&
            this.bottomList.length > 0
        );
    }
    setGender(value) {
        this.gender = value;
    }
    setClosetActive(value) {
        this.closetActive = value;
    }
    setTopList(list) {
        this.topList = list;
        // console.log(this.topList);
    }
    setBottomList(list) {
        this.bottomList = list;
        // console.log(this.bottomList);
    }
    setOuterList(list) {
        this.outerList = list;
        // console.log(this.bottomList);
    }
    getGender() {
        return this.gender;
    }
    getHistoryList() {
        if (this.historyList === null) {
            return null;
        } else {
            let list = this.historyList.data.result.items;
            if (list.length < 7)
                for (let i = list.length; i < 7; i++) {
                    list.push({ id: "", image: "", style: "" });
                }
            else list = list.slice(0, 7);
            return list;
        }
    }
    getResultList() {
        return this.resultList === null
            ? null
            : this.resultList.data.result.items;
    }
    postFashion = async () => {
        this.formData = new FormData(); //초기화
        //상의 id 뺀 리스트 만들어야함
        let top = [];
        this.topList.map((value) => {
            top.push(value.file);
        });
        console.log(top);
        top.forEach((file) => {
            this.formData.append("top", file);
        });

        //하의
        let bottom = [];
        this.bottomList.map((value) => {
            bottom.push(value.file);
        });
        bottom.forEach((file) => {
            this.formData.append("bottom", file);
        });

        //아우터
        if (this.outerList.length !== 0) {
            let outer = [];
            this.outerList.map((value) => {
                outer.push(value.file);
            });
            outer.forEach((file) => {
                this.formData.append("outer", file);
            });
        }
        const value = {
            gender: this.gender,
        };
        this.formData.append("request", JSON.stringify(value));
        try {
            this.resultList = await axios({
                method: "POST",
                url: `/closets`,
                mode: "cors",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: this.formData,
            });
            //저장
            const accessToken =
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
            let saveData = { items: [] };
            this.resultList.data.result.items.map((value) => {
                saveData.items.push({
                    outer: value.outer,
                    top: value.top,
                    bottom: value.bottom,
                    fashionName: value.fashionName,
                });
            });
            const result = await axios({
                method: "POST",
                url: `/closets/closet`,
                mode: "cors",
                headers: {
                    Authorization: `${accessToken}`,
                },
                data: saveData,
            });
            console.log(result);
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
                url: `/closets/closet`,
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
    getCoordi = async (coordiID) => {
        console.log(coordiID);
        const accessToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
        try {
            this.resultList = await axios({
                method: "GET",
                url: `/closets/closet/${coordiID}`,
                mode: "cors",
                headers: {
                    Authorization: `${accessToken}`,
                },
            });
            console.log(this.resultList);
        } catch (error) {
            console.log(error);
        }
    };
}
export default CoordiFinderModel;
