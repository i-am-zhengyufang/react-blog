import { defineConfig } from 'umi';
import routes from './routes'


export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    antd: {
    },
    fastRefresh: {},
    favicon: '/favicon.ico',
    // 或者links: [{ rel: 'icon', href: '/favicon.ico' }],
    layout: {
        name: 'blog后台管理系统',
        locale: false,//不开启国际化
        navTheme: 'light',
        layout: 'mix',
    },
    theme: {
        '@primary-color': '#10B981',
    },
    alias: {
        components: '@/components',
        pages: '@/pages',
        services: '@/services'
    },
    routes,
    // mfsu: {},
    dva: {},
    extraPostCSSPlugins: [require("tailwindcss")({
        config: './tailwind.config.ts',
    }), require("autoprefixer")],
});
