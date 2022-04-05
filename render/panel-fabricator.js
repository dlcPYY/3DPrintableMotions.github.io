//本文件用于处理切片模块加载文件
const {dialog} = require('@electron/remote')
var loadpath = "";
$(function(){
    var structure4 =document.getElementById('structure4');
    var data;
    $(".fabricator .openfile").click(function(){
        dialog.showOpenDialog({
            title:'请选择您要打开的文件',
            defaultPath:'此电脑/',
            filters: [
                { name: 'Models', extensions: ['obj'] },
                { name: 'Custom File Type', extensions: ['as'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            properties: ['openFile']
        }).then(result=>{
            loadpath = result.filePaths[0];
            structure4.src='';
			structure4.src = "./ms_fabricator.html";
            structure4.onload = function(){
                data = {
                    address : result.filePaths[0]
                };
                structure4.contentWindow.postMessage(data,"*");
            }
        }).catch(err=>{
            console.log(err);
        })
    })
    $(window).resize(function(){
        if($.isEmptyObject(data) != true)
        {
            structure4.src='';
			structure4.src = "./ms_fabricator.html";
            structure4.onload = function(){
                structure4.contentWindow.postMessage(data,"*");
            }
        }
    })
})