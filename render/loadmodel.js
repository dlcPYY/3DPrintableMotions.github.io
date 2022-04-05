// import * as THREE from '../js/three_new/three.module.js'
import {renderechart} from "./panel-echarts.js"
let spherefacesstr = ""
let sphereverticesstr = ""
let facesstr = ""
let verticesstr = ""
let spherefaceslength = 0,sphereverticeslength = 0,facesstrlength = 0,verticesstrlength = 0
let geom
function fileImport() {
    console.dir(document.getElementById('loadfiles'))
    facesstr = ""
    verticesstr = ""
    facesstrlength = 0
    verticesstrlength = 0
    let selectedFile = document.getElementById('loadfiles').files[0];
    let selectedFilesphere = document.getElementById('loadfiles').files[1];

    let reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = function () {  
        let vstrtemp = this.result.slice(this.result.indexOf('v'))
        let fstrtemp = this.result.slice(this.result.indexOf('f'))

        let vstr = vstrtemp.slice(0, vstrtemp.indexOf('\n#'))
        let fstr = fstrtemp.slice(0, fstrtemp.indexOf('\n#'))

        let vslitstr = vstr.split("\n")
        let fslitstr = fstr.split("\n")
        facesstrlength = fslitstr.length
        verticesstrlength = vslitstr.length
        
        geom = new THREE.Geometry()
        for (let i = 0 ; i < vslitstr.length;i++)
        {
            let vslitstr2 = vslitstr[i].substr(2).split(" ")
            verticesstr += vslitstr2[0]
            verticesstr += ',' + vslitstr2[1]
            verticesstr += ',' + vslitstr2[2] + ';'
            geom.vertices.push(new THREE.Vector3(parseFloat(vslitstr2[0]),parseFloat(vslitstr2[1]),parseFloat(vslitstr2[2])))
        }
        for (let i = 0 ; i < fslitstr.length;i++)
        {
            let fslitstr2 = fslitstr[i].substr(2).split(" ")
            facesstr += (fslitstr2[0] - 1)
            facesstr += ',' + (fslitstr2[1]-1)
            facesstr += ',' + (fslitstr2[2]-1) + ';'
            geom.faces.push(new THREE.Face3(parseInt((fslitstr2[0] - 1)), parseInt((fslitstr2[1] - 1)), parseInt((fslitstr2[2] - 1))))
        }
        geom.computeFaceNormals();
        let structure = document.getElementById('structure')
        structure.src=''
        structure.src = "./microstructure_display.html"
        structure.onload = function(){
            let data = {
                private : true,
                newmesh : geom
            };
            structure.contentWindow.postMessage(data,"*")
        }
        renderechart(0)
            if(sphereverticeslength == 0)
            {
                let readersphere = new FileReader()
                readersphere.readAsText(selectedFilesphere)
                readersphere.onload = function(){
                let vstrtemp = this.result.slice(this.result.indexOf('v'))
                let fstrtemp = this.result.slice(this.result.indexOf('f'))

                let vstr = vstrtemp.slice(0, vstrtemp.indexOf('\n#'))
                let fstr = fstrtemp.slice(0, fstrtemp.indexOf('\n#'))

                let vslitstr = vstr.split("\n")
                let fslitstr = fstr.split("\n")
                sphereverticeslength = vslitstr.length
                spherefaceslength = fslitstr.length
                
                for (let i = 0 ; i < vslitstr.length;i++)
                {
                    let vslitstr2 = vslitstr[i].substr(2).split(" ")
                    sphereverticesstr += vslitstr2[0]
                    sphereverticesstr += ',' + vslitstr2[1]
                    sphereverticesstr += ',' + vslitstr2[2] + ';'
                }
                for (let i = 0 ; i < fslitstr.length;i++)
                {
                    let fslitstr2 = fslitstr[i].substr(2).split(" ")
                    spherefacesstr += (fslitstr2[0] - 1)
                    spherefacesstr += ',' + (fslitstr2[1]-1)
                    spherefacesstr += ',' + (fslitstr2[2]-1) + ';'
                }
            }
        }
    }
}

window.fileImport = fileImport
$(".analyse").click(function(){
    Module.onRuntimeInitialized()
})
Module.onRuntimeInitialized = function () {
    let PropertySolutionPanswer = Module.PropertySolutionP(spherefacesstr,spherefaceslength,sphereverticesstr,sphereverticeslength,facesstr,facesstrlength,verticesstr,verticesstrlength,36)
    let answer1 = PropertySolutionPanswer.split("*")
    let propritiesstr = answer1[0]
    let numvos = parseInt(answer1[1])
    let vosstr = answer1[2]
    let voxstr = answer1[3]
    let numvox = parseInt(answer1[4])
    let ehstr = answer1[5]
    let PropertySolutionStressanswer = Module.PropertySolutionStress(facesstr,facesstrlength,verticesstr,verticesstrlength,vosstr, numvos, voxstr, numvox, 36)
    let answer2 = PropertySolutionStressanswer.split(';')
    u_colors = []
    for(let i = 0 ; i < answer2.length;i++)
    {
        let answer2_temp = answer2[i].split(",")
        u_colors.push(answer2_temp)
    }
    u_colors.pop()
    let structure2 = document.getElementById('structure2');
	structure2.src='';
	structure2.src = "./ms_stressdistribution.html";
	structure2.onload = function(){
		var data = {
            private : true,
            newmesh : geom
        };
	structure2.contentWindow.postMessage(data,"*");
	}

    let PropertySolutionYoungsanswer =  Module.PropertySolutionYoungs(spherefacesstr,spherefaceslength,sphereverticesstr,sphereverticeslength,ehstr)
    let answer3 = PropertySolutionYoungsanswer.split('*')
    let answer31 = answer3[0].split(";")
    let answer32 = answer3[1].split(";")
    vertexes = []
    for(let i = 0 ; i < answer31.length;i++)
    {
        let answer31_temp = answer31[i].split(",")
        let temp =new THREE.Vector3(parseFloat(answer31_temp[0]), parseFloat(answer31_temp[1]), parseFloat(answer31_temp[2]))
        vertexes.push(temp)
    }
    face_color = []
    for(let i = 0 ; i < answer32.length;i++)
    {
        let answer32_temp = answer32[i].split(",")
        face_color.push(answer32_temp)
    }
    if(faces.length == 0)
    {
        faces = []
        let sphere = spherefacesstr.split(";")
        for(let i = 0 ; i < sphere.length;i++)
        {
            let sphere_temp = sphere[i].split(",")
            var temp = new THREE.Face3(parseFloat(sphere_temp[0]), parseFloat(sphere_temp[1]), parseFloat(sphere_temp[2]));
            window.parent.faces.push(temp);
        }
    } 
    let structure3 = document.getElementById('structure3');
		structure3.src='';
		structure3.src = "./ms_anisotropy.html";
		structure3.onload = function(){
			let data = {
                private : true
            };
        structure3.contentWindow.postMessage(data,"*");
      };
	
}

// $(function(){
//     let structure = document.getElementById('structure')
//     let data;
//     $(".modelcal .loadmodel").click(function(){
//         dialog.showOpenDialog({
//             title:'请选择您要打开的文件',
//             defaultPath:'此电脑/',
//             filters: [
//                 { name: 'Models', extensions: ['obj'] },
//                 { name: 'Custom File Type', extensions: ['as'] },
//                 { name: 'All Files', extensions: ['*'] }
//             ],
//             properties: ['openFile']
//         }).then(result=>{
//             let selectedFile = document.getElementById('files').files[0];
//             let reader = new FileReader();
//             reader.readAsText(selectedFile); // 读取文件的内容，也可以读取文件的URL

//             reader.onload = function () {  //读取完成后调用这个函数，此时文件的内容已经存储到result中，直接操作即可
//                 console.log(this.result)
//             }
//             structure.src='';
//             structure.src = "./microstructure_display.html";
//             structure.onload = function(){
//                 data = {
//                     private : true,
//                     address : result.filePaths[0]
//                 };
//                 structure.contentWindow.postMessage(data,"*");
//             }
//         }).catch(err=>{
//             console.log(err);
//         })
//     })
//     $(window).resize(function(){
//         if($.isEmptyObject(data) != true)
//         {
//             structure.src=''
//             structure.src = "./microstructure_display.html"
//             structure.onload = function(){
//                 structure.contentWindow.postMessage(data,"*");
//             }
//         }
//     })
//     $(".savefile").click(function(){
//         dialog.showOpenDialog({
//             title:'请选择您要保存的目录',
//             defaultPath:'此电脑/',
//             filters: [
//                 { name: 'All Files', extensions: ['*'] },
//                 { name: 'Custom File Type', extensions: ['as'] }
//             ],
//             properties: ['openDirectory']
//         }).then(result=>{
//             savedir = result.filePaths[0];
//             fs.readdir(dirpath,function(err,files){
//                 if(err){
//                     return console.error(err);
//                 }
//                 for(var i = 0 ; i < files.length ; i++)
//                 {
//                     let fPath = path.join(dirpath, i+'.png');
//                     let savepath = path.join(savedir,i+'.png');
//                     let readStream = fs.createReadStream(fPath);
//                     let writeStream = fs.createWriteStream(savepath);
//                     readStream.pipe(writeStream);
//                 }
//             });
//         }).catch(err=>{
//             console.log(err);
//         })
//     })
// })