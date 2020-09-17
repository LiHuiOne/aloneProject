<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <el-card shadow="hover">
        <echarts :xAxisData="xAxisData" :seriesData="seriesData"></echarts>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card shadow="hover">
        鼠标悬浮时显示
      </el-card>
    </el-col>
</el-row>
</template>

<script>
export default {
  data(){
    return {
      xAxisData:["1月","2月","3月","4月","5月","6月"],
      seriesData:[10, 20, 50, 5, 40, 15]
    }
  },
  components:{
    'echarts':()=>import("./components/eacharts")
  },
  methods:{

  }
};
</script>

<style scoped></style>
