// vue-cli的配置文件
module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:5008"
            },
			"/upload":{
				target: "http://localhost:5008"
			}
        }
    },
    configureWebpack: require("./webpack.config"),
}