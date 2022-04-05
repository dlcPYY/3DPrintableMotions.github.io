var mySwiper;
$(function(){
    let fs = require("fs");
    let path = require("path");
    let slantingindex;
    let dotindex;
    let modelname;
    let dirpath;
    $(".slicefile").click(function(){
        $(".swiper-wrapper").html('');
        var load = '<div class="spinner" style="margin-top:50%;"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div><div class="rect6"></div><div class="rect7"></div></div>';
        $(".swiper-wrapper").append(load);
        slantingindex = loadpath.lastIndexOf("\\");
        dotindex = loadpath.indexOf(".obj");
        modelname  = loadpath.slice(slantingindex + 1, dotindex);
        dirpath = "./images/"+modelname;
        //dirpath = "http://101.76.215.95:5543/images/"+modelname;
        setTimeout(function(){
            fs.readdir(dirpath,function(err,files){
                if(err){
                    return console.error(err);
                }
                for(var i = 0 ; i < files.length ; i++)
                {
                    let fPath = path.join(dirpath, i+'.png');
                    var str = '<div class="swiper-slide" style="display:flex;align-items:center;justify-content:center;"><img src="'+fPath+'" style="width:100%; height:auto;"></div>'
                    $(".swiper-wrapper").append(str);
                }
                $(".swiper-wrapper").children().first().remove();
            });
        
        // let fPath = path.join(myurl, file);
        
        setTimeout(function(){
        mySwiper = new Swiper ('.swiper-container', {
            effect: 'fade',
            initialSlide:1,
            //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项！！
            speed:50,//滑动速度，注意默认是400
            // 如果需要分页器
            // pagination: {
            //   el: '.swiper-pagination',
            // },
            autoplay: {
                delay: 50,
                stopOnLastSlide: false,
                disableOnInteraction: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              hideOnClick: true
            },
            
            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
              dragSize: 40,
              draggable: true,
            },
          })
          mySwiper.scrollbar.$el.css('height','15px');
          mySwiper.scrollbar.$dragEl.css('background','#ff6600');
            },500);
        },5000);
    })
    $(".savefile").click(function(){
        dialog.showOpenDialog({
            title:'请选择您要保存的目录',
            defaultPath:'此电脑/',
            filters: [
                { name: 'All Files', extensions: ['*'] },
                { name: 'Custom File Type', extensions: ['as'] }
            ],
            properties: ['openDirectory']
        }).then(result=>{
            savedir = result.filePaths[0];
            fs.readdir(dirpath,function(err,files){
                if(err){
                    return console.error(err);
                }
                for(var i = 0 ; i < files.length ; i++)
                {
                    let fPath = path.join(dirpath, i+'.png');
                    let savepath = path.join(savedir,i+'.png');
                    let readStream = fs.createReadStream(fPath);
                    let writeStream = fs.createWriteStream(savepath);
                    readStream.pipe(writeStream);
                }
            });
        }).catch(err=>{
            console.log(err);
        })
    })
})