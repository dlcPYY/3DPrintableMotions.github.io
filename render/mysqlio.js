const fileSystem = require('fs')
const readline = require('readline')
const csv = require('csvtojson')

ipcRenderer.on('generatecsvFile', (event, message)=>{
    let stlStr = generateSTL(message)
    ipcRenderer.sendSync('stlStr', stlStr)
})
ipcRenderer.on('generatetxtFile', (event, message)=>{
    let ccStr = updateCCFile()
    ipcRenderer.sendSync('ccStr', ccStr)
})
ipcRenderer.on('parsetxtFile', (event, message)=>{
    let filetype = getFileType(message)
    if (filetype === 'txt') {
        let data = fileSystem.readFileSync(message,"utf-8");
        readTXTFile( data )
    }
})
ipcRenderer.on('parsecsvFile', (event, message)=>{
    let filetype = getFileType(message)
    if (filetype === 'csv') {
        const converter = csv()
        .fromFile(message)
        .then((json) => {
            let jsonobj = {}
            for(let i = 0 ; i < json.length; i ++ )
            {
                let itemstr = 'item_' + i
                jsonobj[itemstr] = json[i]
            }
            console.log(jsonobj)
            readCSVFile( jsonobj )
        })
    }
})
function getFileType(path) {
    let filetype = ''
    for (let i = path.length - 1; i >= 0; i--){
        if (path[i] === '.') {
            break
        }
        filetype += path[i]
    }
    return filetype.split('').reverse().join('')
}
function readTXTFile( jsonStr ) {
    let jsonObject = $.parseJSON(jsonStr)
    let res = ipcRenderer.sendSync('appendjson', jsonObject);
}
function readCSVFile( jsonobj )
{
    let res = ipcRenderer.sendSync('appendjson', jsonobj);
}
 
