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
    }
    setBottomList(list) {
        this.bottomList = list;
    }
    setOuterList(list) {
        this.outerList = list;
    }
    getHistoryList() {
        return this.historyList;
    }
    getResultList() {
        return this.resultList;
    }
}
export default CoordiFinderModel;
