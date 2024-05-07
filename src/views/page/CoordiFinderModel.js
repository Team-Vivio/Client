class CoordiFinderModel {
    constructor() {
        this.gender = 0;
        this.closetActive = false;
        this.closetList = [];
        this.topList = [];
        this.bottomList = [];
        this.outerList = [];
        this.historyList = [];
        this.resultList = [];
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
        return this.historyList;
    }
    getResultList() {
        return this.resultList;
    }
}
export default CoordiFinderModel;
