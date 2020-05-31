module.exports = {
  test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
  include: [Path.join(__dirname, "src/assets")],
  loader: "file-loader?name=assets/[name].[ext]"
}