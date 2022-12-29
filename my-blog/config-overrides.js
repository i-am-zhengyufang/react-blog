const path = require('path');
const {
    override, addWebpackAlias
} = require('customize-cra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const commonStyl = [
    path.join(__dirname, "src/stylus/mixins.styl"),
    path.join(__dirname, "src/stylus/variables.styl"),
]
//  支持stylus
const stylus = () => config => {
    const finialLoader = config.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader;
    const stylusLoader = {
        test: /\.styl$/,
        // 剔除 .module.styl 文件
        exclude: /\.module.styl$/,
        use: [
            {
                loader: finialLoader
            }, {
                loader: 'css-loader',
            }, {
                loader: 'stylus-loader',
                options: {
                    stylusOptions: {
                        import: commonStyl,
                    }
                }
            }
        ]
    };
    const stylusModuleLoader = {
        // 仅对 .module.styl 文件进行处理
        test: /\.module.styl$/,
        use: [
            {
                loader: finialLoader
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                }
            }, {
                loader: 'stylus-loader',
                options: {
                    stylusOptions: {
                        import: commonStyl,
                    }
                }
            }
        ]
    };
    const { oneOf } = config.module.rules.find(rule => rule.oneOf);
    oneOf.unshift(stylusLoader, stylusModuleLoader);
    return config;
};



module.exports = override(
    addWebpackAlias({
        "assets": path.resolve(__dirname, 'public/assets'),
        "@": path.resolve(__dirname, 'src'),
        "components": path.resolve(__dirname, 'src/components'),

    }),
    stylus()
)


