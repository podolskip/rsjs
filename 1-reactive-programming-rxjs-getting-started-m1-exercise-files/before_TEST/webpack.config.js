module.exports = {
    mode: 'production',
    entry: "./main.ts",
    output: { 
        path: "/",
        filename: "app.js",
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: "ts-loader"
            }
        ]
    }
    // resolve: {
    //     extensions: ["", ".ts", ".js"]
    // }
}