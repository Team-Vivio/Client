class CoordiFinderViewModel {
    constructor(model) {
        this.model = model;
        this.modalMessage = [
            {
                message: "이동하시겠어요?\n작업한 내용이 삭제 되요",
                btn: "이동하기",
            },
            {
                message:
                    "제대로 입력했는지 확인해주세요\n기존 작업물은 저장됩니다",
                btn: "시작하기",
            },
            {
                message: "성별과 상의, 하의 2벌은 필수로 입력해주세요",
                btn: "입력하기",
            },
            {
                message:
                    "추천에 실패했어요\n정보를 다시 입력하고 다시 해주세요",
                btn: "입력하기",
            },
        ];
    }
    dataCheck() {
        return this.model.dataCheck();
    }
    getModalMessage() {
        return this.modalMessage;
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
