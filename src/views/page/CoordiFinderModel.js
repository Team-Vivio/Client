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
        this.token = null;
        this.name = "OO";
    }
    getName() {
        return this.name;
    }
    setToken(token) {
        if (token === null || token === undefined) {
            console.log("토큰 없습니당");
            // token =
            //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZpbyIsImlhdCI6MTcxNDU4Mzg1MywiaWQiOjIsImVtYWlsIjoiank1ODQ5QG5hdmVyLmNvbSJ9.zANItOl0gwAF4ef8Yay0HKXEeZMUHeg94FsUpOaekvs";
        } else console.log("토큰 있습니당");
        this.token = token;
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
    getTopListSize() {
        return this.topList.length;
    }
    setTopList(list) {
        this.topList = list;
        // console.log(this.topList);
    }
    getBottomListSize() {
        return this.bottomList.length;
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
            let list = [];
            for (let i = 0; i < 7; i++) {
                list.push({ id: "", image: "", style: "" });
            }
            return list;
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
    getClosetTop = async () => {
        const topResult = await axios({
            method: "GET",
            url: `https://backend.vivi-o.site/users/closet/top`,
            mode: "cors",
            headers: {
                Authorization: `${this.token}`,
            },
        });
        return topResult;
    };
    getClosetBottom = async () => {
        const bottomResult = await axios({
            method: "GET",
            url: `https://backend.vivi-o.site/users/closet/bottom`,
            mode: "cors",
            headers: {
                Authorization: `${this.token}`,
            },
        });
        return bottomResult;
    };
    getClosetOuter = async () => {
        const outerResult = await axios({
            method: "GET",
            url: `https://backend.vivi-o.site/users/closet/outer`,
            mode: "cors",
            headers: {
                Authorization: `${this.token}`,
            },
        });
        return outerResult;
    };
    postFashion = async () => {
        try {
            this.formData = new FormData(); //초기화
            let top = [];
            let bottom = [];
            let outer = [];

            //상의 id 뺀 리스트 만들어야함
            this.topList.map((value) => {
                top.push(value.file);
            });
            console.log(top);
            top.forEach((file) => {
                this.formData.append("top", file);
            });

            //하의
            this.bottomList.map((value) => {
                bottom.push(value.file);
            });
            bottom.forEach((file) => {
                this.formData.append("bottom", file);
            });

            //아우터
            if (this.outerList.length !== 0) {
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

            this.resultList = await axios({
                method: "POST",
                url: `https://backend.vivi-o.site/closets`,
                mode: "cors",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: this.formData,
            });
            //저장
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
                url: `https://backend.vivi-o.site/closets/closet`,
                mode: "cors",
                headers: {
                    Authorization: `${this.token}`,
                },
                data: saveData,
            });
            this.name = result.data.result.name;
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    getHistory = async () => {
        try {
            this.historyList = await axios({
                method: "GET",
                url: `https://backend.vivi-o.site/closets/closet`,
                mode: "cors",
                headers: {
                    Authorization: `${this.token}`,
                },
            });
            console.log(this.historyList);
        } catch (error) {
            console.log(error);
        }
    };
    getCoordi = async (coordiID) => {
        console.log(coordiID);
        try {
            this.resultList = await axios({
                method: "GET",
                url: `https://backend.vivi-o.site/closets/closet/${coordiID}`,
                mode: "cors",
                headers: {
                    Authorization: `${this.token}`,
                },
            });
            this.name = this.resultList.data.result.name;
            console.log(this.resultList);
        } catch (error) {
            console.log(error);
        }
    };
}
export default CoordiFinderModel;
