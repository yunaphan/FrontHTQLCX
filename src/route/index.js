import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

function loadSrc(View){
    return () => import(`@/${View}.vue`)
}

var routers = [
    {
        path: "/",
        component: loadSrc('pages/index')
    },
    {
        path: '/login',
        component: loadSrc('components/users/login')
    },
    {
        path: '/admin',
        component: loadSrc('components/users/admins/layoutAdmin'),
        children: [
            {
                path: 'dash-board',
                component: loadSrc('components/users/admins/routerViewAdmin/dashBoard')
            },
            {
                path: 'user-accounts',
                component: loadSrc('components/users/admins/routerViewAdmin/userAccounts')
            },
            {
                path: 'user-account/:username',
                component: loadSrc('components/users/admins/routerViewAdmin/Forms/mauchitietnguoidung') 
            },
            {
                path: 'user-accounts/them-nguoi-dung-moi',
                component: loadSrc('components/users/admins/routerViewAdmin/Forms/mauthemnguoidung') 
            },
            {
                path: 'danh-muc-ten-cay-xanh',
                component: loadSrc('components/users/admins/routerViewAdmin/danhMucTenCayXanh') 
            },
            {
                path: 'danh-muc-tinh-trang-cay-xanh',
                component: loadSrc('components/users/admins/routerViewAdmin/danhMucTinhTrangCX') 
            },
            {
                path: 'danh-muc-hinh-thuc-thi-cong',
                component: loadSrc('components/users/admins/routerViewAdmin/danhMucHTTC') 
            },
            {
                path: 'danh-muc-quan-huyen',
                component: loadSrc('components/users/admins/routerViewAdmin/danhMucQH') 
            },
            {
                path: 'danh-muc-phuong-xa',
                component: loadSrc('components/users/admins/routerViewAdmin/danhMucPX') 
            },
            {
                path: 'danh-muc-duong',
                component: loadSrc('components/users/admins/routerViewAdmin/danhMucTuyenDuong') 
            },
            {
                path: 'thong-ke',
                component: loadSrc('components/users/admins/routerViewAdmin/thongKe') 
            },
            {
                path: 'thong-ke-pdf',
                component: loadSrc('components/users/admins/routerViewAdmin/xuatpdf') 
            },
        ]
    }                                                       
]
export default new VueRouter({
    mode: 'history',
    routes: routers
})