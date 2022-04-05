const remote = require('@electron/remote')
const {Menu} = require('@electron/remote')
const {dialog} = require('@electron/remote')
var rigthTemplate = [
    {label:'粘贴'},
    {label:'复制'}
]

var m = Menu.buildFromTemplate(rigthTemplate)



window.addEventListener('contextmenu',function(e){

    //阻止当前窗口默认事件
    e.preventDefault();
    //把菜单模板添加到右键菜单
    m.popup({window:remote.getCurrentWindow()})

})