
export default [
    {
        path: '/login', component: '@/pages/login',
        wrappers: ['@/wrappers/auth.tsx'],
        layout: false,
    },
    {
        path: '/',
        flatMenu: true,//隐藏自己同时把子元素提升上来
        component: '@/pages/layouts',//必须加 不加没用
        wrappers: ['@/wrappers/auth.tsx'],
        // redirect: '/home',直接这样页面干脆不渲染了
        routes: [
            {
                path: '/',
                redirect: '/home'
            },
            {
                path: '/home', name: '首页', component: '@/pages/home',
                icon: 'home'
            },
            {
                path: '/articles', name: '文章', component: '@/pages/articles',
                icon: "bars"
            },

            {
                path: '/comment', name: '评论', component: '@/pages/comment',
                icon: "comment"
            },
            {
                path: '/say', name: '说说', component: '@/pages/say',
                icon: "book"
            },
            {
                path: '/timeline', name: '建站日志', component: '@/pages/timeline',
                icon: "file"
            },
            {
                path: '/about', name: '关于', component: '@/pages/about',
                icon: "user"
            },
            {
                path: '/post', component: '@/pages/post',
                access: 'canAdmin'
            },
            {
                path: '/aboutedit', component: '@/pages/aboutedit',
                access: 'canAdmin'
            },
            {
                path: '*', component: '@/pages/error',
            },
        ]
    },

];