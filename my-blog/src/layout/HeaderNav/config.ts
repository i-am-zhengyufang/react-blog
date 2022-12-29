export const getNavList = () => {
    const navArr = [
        { name: '主页', to: '/', icon: 'home' },
        {
            name: '文章', icon: 'articles', subMenu: [
                { name: '分类', to: '/classes', icon: 'classes' },
                { name: '标签', to: '/tags', icon: 'tags' }
            ]
        },
        { name: '说说', to: '/say', icon: 'say' },
        { name: '建站日志', to: '/timeline', icon: 'timeline' },
        { name: '关于', to: '/about', icon: 'about' },
    ];

    return navArr

}