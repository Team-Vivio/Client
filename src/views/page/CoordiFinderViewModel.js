class CoordiFinderViewModel {
    constructor(model) {
        this.model = model;
    }
    setGender(value) {
        this.model.setGender(value);
    }
    setClosetActive(value) {
        this.model.setClosetActive(value);
    }
    setTopList(list) {
        this.model.setTopList(list);
    }
    setBottomList(list) {
        this.model.setBottomList(list);
    }
    setOuterList(list) {
        this.model.setOuterList(list);
    }
    getGender() {
        return this.model.getGender();
    }
    getHistoryList() {
        return this.model.getHistoryList();
    }
    getResultList() {
        return this.model.getResultList();
    }
    postFashion = async () => {
        await this.model.postFashion();
    };
    getHistory = async () => {
        await this.model.getHistory();
    };
    getCoordi = async (coordiID) => {
        await this.model.getCoordi(coordiID);
    };
}

export default CoordiFinderViewModel;
