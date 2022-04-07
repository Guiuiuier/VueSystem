// 项目发布阶段 需要用到的babel 插件
const prodPlugins=[]
if(process.env.NODE_ENV==='production'){
  prodPlugins.push('transform-remove-console');
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins:[
      ...prodPlugins,
      // 'transform-remove-console'  //在这里直接写会所有环境都移除
      // 发布产品时候的插件数组
    ]
}
