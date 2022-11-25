//console.log(process.env);
const urls = {
    base: 'https://major-ghosts-taste-49-43-101-220.loca.lt',
    login: '/users/login',
    profile: '/users/me',
    forgotPassword: '/users/forgot-password',
    resetPassword: '/users/reset-password',
    register: '/users/register',
    activate: '/users/activate',
    budgets: '/budgets/',
    category: '/budgets/category',
    saveCategory: '/budgets/category/save',
    removeCategory: '/budgets/category/remove',
    categoryItem: '/budgets/category/item',
    saveCategoryItem: '/budgets/category/item/save',
    removeCategoryItem: '/budgets/category/item/remove',
    verificationCode:'/users/two-factor-auth',
    twoFactActive:'/users/active-two-factor-auth',
    QrCode:'/users/two-factor-auth'
}
export default urls;
