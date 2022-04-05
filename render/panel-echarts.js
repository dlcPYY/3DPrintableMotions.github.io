let prereply = []
var domspace = document.getElementById('space');
var domspace2d = document.getElementById('space2d');
var spacechart = echarts.init(domspace);
var space2dchart = echarts.init(domspace2d);
var chartprofile = document.getElementById('profile');
var profilechart = echarts.init(chartprofile);
var chartrader = document.getElementById('radar');
var raderchart = echarts.init(chartrader);
var raderschart = echarts.init(chartrader);
var radarmax = [1,300,100,1,100,25]

var radarsdata = [];
function renderspace2d(){
  var space2ddata = [];
  for(var i = 0 ;i < reply.length;i++)
  {
      var youngs_modulus = parseFloat(reply[i].youngs_modulus);
      var poisson_ratio = parseFloat(reply[i].poisson_ratio);
      var temp=[poisson_ratio,youngs_modulus];
      space2ddata.push(temp);
  }
  var space2doption;
  space2doption = {
    // bottom: '2%',
    // left: '2%',
    height: '40%',
    width: '80%',
    xAxis: {
      position: 'bottom',
      axisLine: {//刻度
        onZero: false
      },
      axisTick: {//刻度
        inside: true
      },
      axisLabel:{
        color:"#fff"
      },
      inverse: false,
      name: "V",
      nameLocation: "end",
      nameTextStyle: {
        color: "rgba(239, 236, 68, 1)",
        align: "center",
        verticalAlign: "top",
      }
    },
    yAxis: {
      position: 'left',
      axisLine: {
        onZero: false
      },
      axisTick: {
        inside: true
      },
      axisLabel:{
        color:"#fff"
      },
      inverse: false,
      name: "E",
      nameLocation: "end",
      nameTextStyle: {
        color: "rgba(239, 236, 68, 1)",
        align: "center",
        verticalAlign: "middle"
      }
    },
    brush: {
      toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
      xAxisIndex: 0
    },
    series: [
      {
        symbolSize: 12,
        data: space2ddata,
        type: 'scatter',
        itemStyle: {
            color: '#00fea8'
        }
      }
    ]
  };
  space2dchart.on('brushSelected', function (params) {
    var brushComponent = params.batch[0];
    for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
      var rawIndices = brushComponent.selected[sIdx].dataIndex;
      radarsdata =[];
      for(var j = 0; j < rawIndices.length;j++)
      {
        var radardata = [];
        radardata.push(parseFloat(reply[rawIndices[j]].volume_fraction));
        radardata.push(parseFloat(reply[rawIndices[j]].youngs_modulus));
        radardata.push(parseFloat(reply[rawIndices[j]].shear_modulus));
        radardata.push(parseFloat(reply[rawIndices[j]].poisson_ratio));
        if(reply[rawIndices[j]].structure_type == 2)
        {
          radardata.push(parseFloat(reply[rawIndices[j]].TPMS_thick));
        }
        else if(reply[rawIndices[j]].structure_type == 1)
        {
          radardata.push(parseFloat(reply[rawIndices[j]].Number_of_rods));
        }
        else if(reply[rawIndices[j]].structure_type == 3)
        {
          radardata.push(parseFloat(reply[rawIndices[j]].shell_thick));
        }
        radardata.push(parseFloat(reply[rawIndices[j]].zener_ratio));
        radarsdata.push(radardata);
        
      }
      renderradars();
    }
  });
  
  space2doption && space2dchart.setOption(space2doption);
}
function renderradars()
{
  var raderoption;
  raderoption = {
      grid: {
          position: 'center',
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        type: 'scroll',
        bottom: 10,
        data: (function () {
          var list = [];
          for (var i = 0; i <= radarsdata.length; i++) {
            list.push(i);
          }
          return list;
        })()
      },
      // visualMap: {
      //   top: 'middle',
      //   right: 0,
      //   width: 1,
      //   color: ['red', 'blue'],
      //   calculable: true
      // },
      radar: {
          // shape: 'circle',
          name: {
              textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [3, 5],
              }
          },
          center: ["50%", "50%"],
          radius: ["0%", "75%"],
          nameGap: 10,
          splitNumber: 5,
          splitArea: {
            show: false
          },
          splitArea: {
                      areaStyle: {
                          color: ['#baf0f0','#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                          shadowColor: 'rgba(0, 0, 0, 0.3)',
                          shadowBlur: 10,
                      }
                  },
          indicator: [
            { name: 'v', max: radarmax[0]},
            { name: 'y', max: radarmax[1]},
            { name: 's', max: radarmax[2]},
            { name: 'p', max: radarmax[3]},
            { name: 't', max: radarmax[4]},
            { name: 'z', max: radarmax[5]},
          ],
          name: {
            fontSize: '2%'
          }
      },
      series: (function () {
        var series = [];
        for (var i = 0; i <= radarsdata.length; i++) {
          series.push({
            type: 'radar',
            lineStyle: {
                width: 2,
                // color: 'rgba(0,0,0,1)'
            },
            symbolSize: 10,
            emphasis: {
              areaStyle: {
                color: 'rgba(0,250,0,0.3)'
              }
            },
            data: [
              {
                value: radarsdata[i],
                name: i
              }
            ]
          });
        }
        return series;
      })()
      // series: [{
      //     type: 'radar',
      //     // areaStyle: {normal: {}},
      //     lineStyle: {
      //                 width: 3,
      //                 color: 'rgba(0,0,0,1)'
      //             },
      //     data: [
      //         {
      //             value: radardata,
      //             itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
      //               color: '#57b5f8',
      //               borderColor: '#000000',
      //             },
      //             areaStyle: {
      //                 color: '#57b5f8',
      //             },
      //             name: 'A',
      //             label: {
      //                 normal: {
      //                     //show: true,
      //                     formatter: function(params){
      //                         return params.value
      //                     },
      //                 },
      //             },
      //         }
      //     ]
      // }]
  };
  raderschart.clear();
  raderoption && raderschart.setOption(raderoption);
}
function renderspace(){
  var radarsdata = [];
  //查
  for(let i = 0 ;i < reply.length;i++)
  {
      let id = parseInt(reply[i].id);
      let structure_type = parseInt(reply[i].structure_type);
      let volume_fraction = parseFloat(reply[i].volume_fraction);
      let voxel_resolusion = parseInt(reply[i].voxel_resolusion);
      let TPMS_type = parseInt(reply[i].TPMS_type);
      let TRT = parseFloat(reply[i].TPMS_thick)
      if(reply[i].structure_type == 1)
      {
        TRT = parseFloat(reply[i].Number_of_rods)
      }
      else if(reply[i].structure_type == 3)
      {
        TRT = parseFloat(reply[i].shell_thick)
      }
      let youngs_modulus = parseFloat(reply[i].youngs_modulus);
      let shear_modulus = parseFloat(reply[i].shear_modulus);
      let poisson_ratio = parseFloat(reply[i].poisson_ratio);
      let zener_ratio = parseFloat(reply[i].zener_ratio);
      let temp=[id,structure_type,volume_fraction,voxel_resolusion,TPMS_type,TRT,youngs_modulus,shear_modulus,poisson_ratio,zener_ratio];
      radarsdata.push(temp);
  }
  let values = radarsdata.map(function(elt) { return elt[2]; });
  radarmax[0] = Math.max.apply(null, values);
  values = radarsdata.map(function(elt) { return elt[6]; });
  radarmax[1] = Math.max.apply(null, values);
  values = radarsdata.map(function(elt) { return elt[7]; });
  radarmax[2] = Math.max.apply(null, values);
  values = radarsdata.map(function(elt) { return elt[8]; });
  radarmax[3] = Math.max.apply(null, values);
  values = radarsdata.map(function(elt) { return elt[5]; });
  radarmax[4] = Math.max.apply(null, values);
  values = radarsdata.map(function(elt) { return elt[9]; });
  radarmax[5] = Math.max.apply(null, values);

  var app = {};
  var spaceoption;
  var schema = [
  { name: 'id', index: 0 },
  { name: 'structure_type', index: 1 },
  { name: 'volume_fraction', index: 2 },
  { name: 'voxel_resolusion', index: 3 },
  { name: 'TPMS_type', index: 4 },
  { name: 'TPMS_thick', index: 5 },
  { name: 'youngs_modulus', index: 6 },
  { name: 'shear_modulus', index: 7 },
  { name: 'poisson_ratio', index: 8 },
  { name: 'zener_ratio', index: 9 },
  ];
  var data;
  var fieldIndices = schema.reduce(function (obj, item) {
  obj[item.name] = item.index;
  return obj;
  }, {});
  var data;
  // var fieldNames = schema.map(function (item) {
  // return item.name;
  // });
  // fieldNames = fieldNames.slice(2, fieldNames.length - 2);
 
  function getMaxOnExtent(data) {
  var colorMax = -Infinity;
  var symbolSizeMax = -Infinity;
  for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var colorVal = item[fieldIndices[config.color]];
      var symbolSizeVal = item[fieldIndices[config.symbolSize]];
      colorMax = Math.max(colorVal, colorMax);
      symbolSizeMax = Math.max(symbolSizeVal, symbolSizeMax);
  }
  return {
      color: colorMax,
      symbolSize: symbolSizeMax
  };
  }
  var config = (app.config = {
  xAxis3D: 'volume_fraction',
  yAxis3D: 'youngs_modulus',
  zAxis3D: 'poisson_ratio',
  color: 'zener_ratio',
  onChange: function () {
      var max = getMaxOnExtent(data);
      if (data) {
        spacechart.setOption({
          visualMap: [
            {
                max: max.color,
            }
          ],
          xAxis3D: {
          name: config.xAxis3D
          },
          yAxis3D: {
          name: config.yAxis3D
          },
          zAxis3D: {
          name: config.zAxis3D
          },
          series: {
          dimensions: [
              config.xAxis3D,
              config.yAxis3D,
              config.zAxis3D,
              config.color
          ],
          data: data.map(function (item, idx) {
              return [
              item[fieldIndices[config.xAxis3D]],
              item[fieldIndices[config.yAxis3D]],
              item[fieldIndices[config.zAxis3D]],
              item[fieldIndices[config.color]],
              idx
              ];
          })
          }
      });
      }
  }
  });
  // app.configParameters = {};
  // ['xAxis3D', 'yAxis3D', 'zAxis3D', 'color', 'symbolSize'].forEach(function (
  // fieldName
  // ) {
  // app.configParameters[fieldName] = {
  //     options: fieldNames
  // };
  // });
  data = radarsdata;
  var max = getMaxOnExtent(data);
  spacechart.setOption({
      //可以设置exharts的背景 先不设置了
      //整个chart背景，可为自定义颜色或图片
      //environment: 'asset/starfield.jpg'路径图片或者颜色
      title: {
        left:'0%',
        top:'5%',
        text: 'Physical Properties of MANGO Dataset',
        textStyle:{
          //文字颜色
          color:'yellow',
          //字体风格,'normal','italic','oblique'
          fontStyle:'normal',
          //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
          fontWeight:'bold',
          //字体系列
          fontFamily:'sans-serif',
          //字体大小
  　　　　 fontSize:15
      },
      },
      tooltip: {
        formatter: function (param) {
          return [
            'Data: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            '<h5 style="color:red">- volume fraction: ' + param.data[0] + '<h5/>',
            '<h5 style="color:green">- Young\'s modulus: ' + param.data[1] + '<h5/>',
            '<h5 style="color:blue">- Poisson\'s ratio: ' + param.data[2] + '<h5/>',
            '<h5 style="color:pink">- Zener ratio: ' + param.data[3] + '<h5/>'
          ].join('');
        }
    },
      visualMap: [
      {
          top: '25%',//左上角的映射
          calculable: true,
          dimension: 3,
          text: ['', 'Zener ratio'],
          max: max.color,
          inRange: {
          color: [
              '#1710c0',
              '#0b9df0',
              '#00fea8',
              '#00ff0d',
              '#f5f811',
              '#f09a09',
              '#fe0300'
          ]
          },
          textStyle: {
          color: '#fff'
          },
          itemWidth: '20%',
          itemHeight: '50%'
      }
      ],
      xAxis3D: {
      name: 'volume fraction',
      type: 'value',
      nameTextStyle:{
        fontSize:15,
      },
      nameGap:25,
      },
      yAxis3D: {
      name: 'Young\'s modulus',
      type: 'value',
      nameTextStyle:{
        fontSize:15,
      },
      nameGap:25,
      },
      zAxis3D: {
      name: 'Poisson\'s ratio',
      type: 'value',
      nameTextStyle:{
        fontSize:15,
      },
      nameGap:25,
      },
      grid3D: {
      boxWidth: 100,//三维场景高度
      boxHeight:100,//三维场景高度
      boxDepth: 100,//三维笛卡尔坐标系组件在三维场景中的深度
      viewControl:{
        beta: 0,
        alpha: 0
      },
      left: '5%',
      top: '10%',
      containLabel:true,
      axisLabel: {
         show: true,
         textStyle: {
           fontSize : '2%'      //更改坐标轴文字大小
         }
      },
      axisLine: {//坐标轴xyz
          lineStyle: {
          color: '#fff'
          //width: 1 线条宽度
          }
      },
      axisPointer: {//坐标轴指示线
          lineStyle: {
          color: '#ffbd67'
          }
      },
      viewControl: {
          distance: 300
          // autoRotate: true
          // projection: 'orthographic'
      }
      },
      series: [
      {
          type: 'scatter3D',
          dimensions: [
          config.xAxis3D,
          config.yAxis3D,
          config.zAxis3D,
          config.color
          ],
          data: data.map(function (item, idx) {
          return [
              item[fieldIndices[config.xAxis3D]],
              item[fieldIndices[config.yAxis3D]],
              item[fieldIndices[config.zAxis3D]],
              item[fieldIndices[config.color]],
              idx
          ];
          }),
          symbolSize: 20,
          // symbol: 'triangle',
          itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.8)'
          },
          emphasis: {
          itemStyle: {
              color: '#fff'
          }
          }
      }
      ]
  });

  spaceoption && spacechart.setOption(spaceoption);
}


spacechart.on('click', function(params) {
    // 控制台打印数据的名称
    var objaddreses = [];
		for (var i = 0 ; i < reply.length;i++)
		{
			//objaddreses.push(reply[i]["obj_path"]);
      objaddreses.push("http://101.76.215.95:5543/"+reply[i]["obj_path"].slice(2));
		}
    var index = params.data[4];
    var objid = reply[parseInt(params.data[4])]["id"] - 1;
    console.log(objid);
    var structure = document.getElementById('structure');
		structure.src='';
		structure.src = "./microstructure_display.html";
		structure.onload = function(){
			var data = {
        message: index,
        addresses : objaddreses,
        objindex: objid
      };
			structure.contentWindow.postMessage(data,"*");
		}

		var structure2 = document.getElementById('structure2');
		structure2.src='';
		structure2.src = "./ms_stressdistribution.html";
		structure2.onload = function(){
			var data = {
        message: index,
        addresses : objaddreses,
        objindex: objid
      };
			structure2.contentWindow.postMessage(data,"*");
		}

		var structure3 = document.getElementById('structure3');
		structure3.src='';
		structure3.src = "./ms_anisotropy.html";
		structure3.onload = function(){
			var data = {
        message: index,
        addresses : objaddreses
      };
			structure3.contentWindow.postMessage(data,"*");
		}

    renderechart(index);
});

export function renderechart(data){
    var profileoption;
    var value22,value33;
    var xingzhi = 'thickness',xingzhi3;
    if(reply[parseInt(data)].structure_type == 2)
    {
      value22 = parseFloat(reply[parseInt(data)].TPMS_thick);
      xingzhi = 'thickness';
      
    }
    else if(reply[parseInt(data)].structure_type == 1)
    {
      value22 = parseFloat(reply[parseInt(data)].Number_of_rods);
      xingzhi = 'rodsnumber';
      xingzhi3 = 'Maxwell';
      value33 = parseFloat(reply[parseInt(data)].Maxwell);
    }
    else if(reply[parseInt(data)].structure_type == 3)
    {
      value22 = parseFloat(reply[parseInt(data)].shell_thick);
      xingzhi = 'thickness';
    }
    var afterclickdata = [
      [xingzhi,value22],
      ["Zener ratio",parseFloat(reply[parseInt(data)].zener_ratio)],
      ["Poisson's ratio",parseFloat(reply[parseInt(data)].poisson_ratio)]
    ];
    if(reply[parseInt(data)].structure_type == 1)
    {
      afterclickdata.push([xingzhi3,value33]);
    }
    // prettier-ignore
    profileoption = {
        xAxis: {
            type: "log",
            axisLabel: {        
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize:'5%'
                }
            },
            axisLine:{
                lineStyle:{
                    width:2
                }
            }
        },
        yAxis: { 
          
            data: ['volume fraction','Young\'s modulus', 'Poisson\'s ratio', 'shear modulus', 'Zener ratio', xingzhi],
            axisLabel: {        
                show: true,
                rotate: 40,
                textStyle: {
                    color: '#fff',
                    fontSize:'5%'
                }
            },
            axisLine:{
                lineStyle:{
                    width:2
                }
            }
        },
        grid:{
            left: "0%",
            top: "5%",
            right: "4%",
            bottom: "6%",
            containLabel: true
        },
        tooltip:{
            trigger: "axis",
            axisPointer:{
                type:"shadow"
            }
        },
        dataGroupId: '',
        animationDurationUpdate: 500,
        series: {
          type: 'bar',
          id: 'sales',
          barWidth: "40%",
          data: [
            {
              value: parseFloat(reply[parseInt(data)].volume_fraction),
              groupId: 'volume fraction'
            },
            {
              value: parseFloat(reply[parseInt(data)].youngs_modulus),
              groupId: 'Young\'s modulus'
            },
            {
              value: parseFloat(reply[parseInt(data)].poisson_ratio),
              groupId: 'Poisson\'s ratio'
            },
            {
              value: parseFloat(reply[parseInt(data)].shear_modulus),
              groupId: 'shear modulus'
            },
            {
              value: parseFloat(reply[parseInt(data)].zener_ratio),
              groupId: 'Zener ratio'
            },
            {
              value: value22,
              groupId: xingzhi
            }
          ],
          itemStyle: {
            normal: {
            　　//这里是重点
                color: function(params) {
                    //注意，若是颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#c23531','#e06343',
                    '#37a354',
                    '#b55dba', '#65B581', '#FFCE34', '#FD665F'];
                    return colorList[params.dataIndex]
                },
            }
            },
          universalTransition: {
            enabled: true,
            divideShape: 'clone'
          }
        }
      };
      const drilldownData = [//这里的意思是说无论点击哪个bar都会对应上面的afterclickdata，当然我们可以为每个bar设定点击后的数据
        {
          dataGroupId: 'volume fraction',
          data: afterclickdata
        },
        {
          dataGroupId: 'Young\'s modulus',
          data: afterclickdata
        },
        {
          dataGroupId: 'Poisson\'s ratio',
          data: afterclickdata
        },
        {
          dataGroupId: 'shear modulus',
          data: afterclickdata
        },
        {
          dataGroupId: 'Zener ratio',
          data: afterclickdata
        },
        {
          dataGroupId: xingzhi,
          data: afterclickdata
        }
      ];
      profilechart.on('click', function (event) {
        if (event.data) {
          var subData = drilldownData.find(function (data) {
            return data.dataGroupId === event.data.groupId;
          });
          
          if (!subData) {
            return;
          }
          profilechart.setOption({
            xAxis: {
              type: "value",//点击后当然可以不用log
              axisLabel: {        
                  show: true,
                  textStyle: {
                      color: '#fff',
                      fontSize:'5%'
                  }
            }},
            yAxis: {
              data: subData.data.map(function (item) {
                return item[0];
              })
            },
            series: {
              type: 'bar',
              id: 'sales',
              dataGroupId: subData.dataGroupId,
              data: subData.data.map(function (item) {
                return item[1];
              }),
              itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                            return colorList[params.dataIndex]
                        }
                    }
                },
              universalTransition: {
                enabled: true,
                divideShape: 'clone'
              }
            },
            graphic: [
              {
                type: 'text',
                left: '55%',
                top: 0,
                style: {
                  text: 'Back',
                  color: 'white',
                  fill: '#fff',
                  fontSize: '5%'
                },
                onclick: function () {
                    profilechart.setOption(profileoption);
                }
              }
            ]
          });
        }
      });
      profileoption && profilechart.setOption(profileoption);

    var radardata = [];
    radardata.push(parseFloat(reply[parseInt(data)].volume_fraction));
    radardata.push(parseFloat(reply[parseInt(data)].youngs_modulus));
    radardata.push(parseFloat(reply[parseInt(data)].shear_modulus));
    radardata.push(parseFloat(reply[parseInt(data)].poisson_ratio));
    radardata.push(value22);
    radardata.push(parseFloat(reply[parseInt(data)].zener_ratio));
    var raderoption;
    raderoption = {
        grid: {
            position: 'center',
        },
        tooltip: {},
        // legend: {
        //     right:5,
        //     bottom:5,
        //     data: ['A']
        // },

        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5],
                }
            },
            center: ["50%", "50%"],
            radius: ["0%", "75%"],
            nameGap: 10,
            splitNumber: 5,
            splitArea: {
                        areaStyle: {
                            color: ['#baf0f0','#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10,
                        }
                    },
            indicator: [
                { name: 'v', max: radarmax[0]},
                { name: 'y', max: radarmax[1]},
                { name: 's', max: radarmax[2]},
                { name: 'p', max: radarmax[3]},
                { name: 't', max: radarmax[4]},
                { name: 'z', max: radarmax[5]},
            ],
            name: {
              fontSize: '2%'
            }
        },
        series: [{
            type: 'radar',
            // areaStyle: {normal: {}},
            lineStyle: {
                        width: 3,
                        color: 'rgba(0,0,0,1)'
                    },
            data: [
                {
                    value: radardata,
                    itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                      color: '#57b5f8',
                      borderColor: '#000000',
                    },
                    areaStyle: {
                        color: '#57b5f8',
                    },
                    name: 'A',
                    label: {
                        normal: {
                            //show: true,
                            formatter: function(params){
                                return params.value
                            },
                        },
                    },
                }
            ]
        }]
    };
    raderchart.clear();
    raderoption && raderchart.setOption(raderoption);
}
window.onresize = function () {
  setTimeout(function () {  
      spacechart.resize()
      space2dchart.resize()
      profilechart.resize()
      raderchart.resize()
      raderschart.resize()
  },10)
}

var delay = function(renderechart,contentdom){
    if( ($(contentdom).children(".choose").length != 0) || ((JSON.stringify(prereply)) != (JSON.stringify(reply))) ){
      if(((JSON.stringify(prereply)) != (JSON.stringify(reply))))
      {
        if(reply.length!=0)
        {
          renderspace();
          renderspace2d();
        }
        prereply = reply;
      }
      else{
         var choose = document.getElementById('iframe1').contentDocument.getElementById('content').querySelector(".choose");
         var data = $(choose).prop("id");
		     renderechart(data);
         $(choose).removeClass("choose");
      }
      delay(renderechart,contentdom);
		  return;
	}
	else{setTimeout(function(){
        var contentdom = document.getElementById('iframe1').contentDocument.getElementById('content');
        delay(renderechart,contentdom)
    }, 1000)}
}
var contentdom = document.getElementById('iframe1').contentDocument.getElementById('content');
delay(renderechart,contentdom);