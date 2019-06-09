## chat-h5

### Version
```html
node 8.0+(v10.15.3)
npm 5.0+(v6.4.1)
```

### Start
* Run 'npm i yarn -g'
* Run 'yarn'

### dev development
* Run 'yarn start:dev'

### test development
* Run 'yarn start:test'


### Dos production
* Run 'yarn release:production'

* OR

* Run 'yarn release:test'


### Project structure
```html
|--src              源文件
  |--assets         静态资源
  |--components     组件(公共组件和Layout组件)
  |--constants      常量文件夹
  |--directives     指令
  |--dll            外部链接库(不要需要更改)
  |--filters        过滤器
  |--mixins         混合
  |--plugins        插件
  |--routers        路由配置
  |--services       服务
  |--store          store
  |--themes         主题(vant-theme-vars.less ui库/index.scss为全局)
  |--utils          工具库
  |--vendor         插件库
  |--views          页面视图
    |--auth         权限模块
    |--error        错误模块
      |--notFound   404页面
    |--common       通用模块
      |--demo       demo页面
    |--tabView      tab模块
      |--chats      聊天模块
      |--contacts   联系人模块
      |--home       首页模块
      |--mine       我的模块
    |--index.vue    主页面入口
    
  |--boots.js       
  |--build.js         
  |--main.js        主程序入口        
```
