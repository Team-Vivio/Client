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
    getHistoryList() {
        return this.model.getHistoryList();
    }
    getResultList() {
        return this.model.getResultList();
    }
}

export default CoordiFinderViewModel;
