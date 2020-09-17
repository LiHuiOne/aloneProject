<template>
    <div>
       <div id="myChart" :style="{width: '82%;', height: '240px'}"></div>
    </div>
</template>
<script>
// 安装echarts:npm install echarts -S
import echarts from '@/units/echarts'
    export default {
        name: "DataCount",
        props:['xAxisData','seriesData'],
        data: () => ({
        }),
        mounted(){
            this.drawLine();

        },
        watch:{//监听数据当父组件数据传递过来时，改变图标数据
            xAxisData(){
                this.drawLine();
            }
        },
        methods:{
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('myChart'));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        
                    },
                    tooltip: {//显示提示框
                        trigger:'axis',
                        formatter: "{b}</br><span style='display:block;height:10px;width:10px;border-radius:50%;background:#179486;float:left;margin:6px 4px 0 0;'></span>数量:{c}"
                        // formatter:function(parmars){
                        //     let res = '数量' + ':'+'1';
                        //     return  res ;//最后返回拼接好的值
                        // }
                    },
                    legend: {
                        
                    },
                    grid:[
                        {   x:'6%', y: '10%', width:'90%', height: '60%',
                            //backgroundColor: 'rgba(0,0,0,0)'
                            //borderWidth: 1,
                            //borderColor: '#000'
                        },
                        
                    ],
                    toolbox: {//显示上面的小图标，用于切换不同的效果
                        show: true,
                        feature: {
                            magicType: {type: ['line', 'bar']}
                        },
                        right:'1%',
                        top:'-3%'
                    },
                    xAxis:[
                    {
                        type: 'category',
                        axisTick: {//将突出的线段去掉
                            show: false
                        },
                        //设置网格线颜色
                        splitLine: {
                            show: true,
                            lineStyle:{
                            color:'#DCDCDC',
                            width: 1
                        }
                    　　},
                        axisLine:{//设置轴线颜色和样式
                                show:true,
                                lineStyle:{
                                    //轴线颜色
                                    color: '#179486',
                                    //线型
                                    type:'solid',
                                    width:2
                                }
                        },
                        axisLabel:{//轴线旁边字体颜色和大小
                        color:'normal'
                        },
                        boundaryGap: false,//解决X轴和Y轴起点不一致问题
                        //data: ["1月","2月","3月","4月","5月","6月"]
                        data:this.$props.xAxisData
                    }],
                    yAxis: [{
                        type:'value',
                        axisTick: {
                            show: false
                        },
                        //设置网格线颜色
                        splitLine: {
                            show: true,
                            lineStyle:{
                            color:'#DCDCDC',
                            width: 1
                        }
                    　　},
                        axisLine:{//设置轴线颜色和样式
                            show:true,
                            lineStyle:{
                                //轴线颜色
                                color: '#179486',
                                //线型
                                type:'solid',
                                width:2
                                }
                        },
                        axisLabel:{//轴线旁边字体颜色和大小
                        color:'normal'
                        },
                        splitArea:{
                            show:false,//为true的时候，X和y轴的文字不显示
                            areaStyle:{
                                color:['#f9f9f9','#ffffff']
                            }
                        }
                    }],
                       
                    series: [{
                        type: 'line',
                        //data: [0, 0, 0, 0, 23, 0],
                        data:this.$props.seriesData,
                        // lineStyle:{
                        //     color:'#008080'  //折线的样式  颜色
                        // },
                        itemStyle: {
                            normal: {
                                color:'#179486',//修改柱状图的颜色
                                lineStyle: {// 系列级个性化折线样式，横向渐变描边
                                    width: 2,
                                    //color:'#008080'
                                    // 设置折线的阴影
                                    // shadowColor : 'rgba(0,0,0,0.5)',
                                    // shadowBlur: 2,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2
                                }
                            },
                            // emphasis: {//折点变为蓝色
                        //  color: 'blue'
                        // }
                        },
                        areaStyle:{//折线包含的区域设置渐变
                            normal:{
                                //右，下，左，上
                                color:new echarts.graphic.LinearGradient(0,0,0,1,[
                                    {
                                        offset:0,
                                        color:'#8ad8d0'
                                    },
                                    {
                                        offset:1,
                                        color:'#ddf1ef'
                                    }
                                ],false)
                                
                            }
                        }
                    }]
                };
        
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize", () => { myChart.resize();});
            }
        } 
    }
    
</script>