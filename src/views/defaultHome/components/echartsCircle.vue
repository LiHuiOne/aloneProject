<template>
    <div id="ClicleEharts" :style="{width: '100%;', height: '400px'}"></div>
</template>
<script>
//// 安装echarts:npm install echarts -S
import echarts from '@/units/echarts'
export default {
    props:['dataList'],
    data(){
        return{
            busNameList:[],
            busInfoList:[]
        }
    },
    mounted(){
        this.getBusNameList();
        this.drawClicleEharts();
    },
    watch:{
        dataList(){
            //this.busInfoList=this.$props.dataList;
            this.drawClicleEharts();
        }
    },
    methods:{
        getBusNameList(){
            this.$props.dataList.forEach(item => {
                this.busNameList.push(item.name);
            });
        },
        drawClicleEharts(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('ClicleEharts'));
        let option = {
            tooltip: {//提示框，可以在全局也可以在
                trigger: 'item',  //提示框的样式
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                color:'#fff', //提示框的背景色
                backgroundColor:"#fff",
                textStyle:{ //提示的字体样式
                    color:"black",
                }
            },
            legend: {  //图例
                orient: 'horizontal',  //图例的布局，竖直    vertical为垂直
                y: 'bottom',//图例显示在右边
                data:this.busNameList,
                textStyle:{    //图例文字的样式
                    color:'#333',  //文字颜色
                    fontSize:12    //文字大小
                }
            },
            series: [
                {
                    name:'累计',
                    type:'pie', //环形图的type和饼图相同
                    radius: ['50%', '70%'],//饼图的半径，第一个为内半径，第二个为外半径
                    avoidLabelOverlap: false,
                    color:['#0099FF','#00FFFF','#FF6633','#3333CC','#FF66FF','#00CC99'],
                    label: {
                        normal: {  //正常的样式
                            show: false,
                            position: 'left'
                        },
                        emphasis: { //选中时候的样式
                            show: false,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },  //提示文字
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:this.$props.dataList
                }
            ]
        };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", () => { myChart.resize();});
        }
    }
}
     
</script>
<style lang="sass" scoped>

</style>