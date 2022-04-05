const ipcRenderer = require('electron').ipcRenderer

var reply = ipcRenderer.sendSync('synchronous-message', 'ping')
var iframe1 = document.getElementById('iframe1');
iframe1.onload = function(){
    var data = {
        message: reply
    };
    iframe1.contentWindow.postMessage(data,"*");
}

ipcRenderer.on('globalinitial', (event, message)=>{
    reply = message
    let data = {
        message: reply
    };
    iframe1.contentWindow.postMessage(data,"*");
})

ipcRenderer.on('tempusrinitial', (event, message)=>{
    console.log(message)
    reply = message
    let data = {
         message: reply
    };
    iframe1.contentWindow.postMessage(data,"*");
})
// const remote = require('@electron/remote')

// var idtoobj = remote.getGlobal('sharedObject').mainidtoobj;

// var delayidtoobj = function(idtoobjlen){
//     if( idtoobjlen >= 20){
//         console.log(idtoobj);
// 	}
// 	else{setTimeout(function(){
//         var idtoobjlen = idtoobj.length;
//         delayidtoobj(idtoobjlen)
//     }, 1000)}
// }
// var idtoobjlen = idtoobj.length;
// delayidtoobj(idtoobjlen);
