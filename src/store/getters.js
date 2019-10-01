//computed call
import moment from 'moment'
const getters = {
    getTuyenDuong: state => {
        return state.tuyenduong
    },
    getDanhSachTenCX: state => {
        return state.danhmuctencayxanh
    },
    getDanhMucTinhTrangCX: state => {
        return state.danhmuctinhtrangcayxanh
    },
    getCurrentDay: state => {
        return moment(state.currentDay).format('DD/MM/YYYY')
    },
    getDanhSachNguoiDung: state => {
        return state.danhsachnguoidung
    }
}

export default getters;