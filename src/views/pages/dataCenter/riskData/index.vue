<template>
  <div class="riskData">
   <el-tree ref="tree" :data="treeData" :props="defaultProps" @node-click="treeNodeClick" :filter-node-method="filterNode" :default-expand-all="true" :expand-on-click-node="false" :check-on-click-node="false" :highlight-current="true"></el-tree>
  </div>
</template>

<script>
export default {
  data(){
    return{
      treeData:[{"orgId":2,"subList":[{"orgId":3,"subList":[{"orgId":16,"subList":[],"title":"下城分公司(0/0)"},{"orgId":20,"subList":[],"title":"测试(0/0)"}],"title":"杭州分公司(20/0)"},{"orgId":6,"subList":[{"orgId":10,"subList":[{"orgId":11,"subList":[],"title":"鄞州区下级(0/0)"}],"title":"鄞州区(0/0)"},{"orgId":14,"subList":[],"title":"宁波下级分公司(0/0)"},{"orgId":15,"subList":[],"title":"宁波下级子公司(0/0)"}],"title":"宁波分公司(4/0)"},{"orgId":9,"subList":[],"title":"宁波第二分公司(0/0)"}],"title":"平安银行(0/24)"}],
      defaultProps:{
        children:'subList',
        label:'title'
      }
    }
  },
  methods:{
    treeNodeClick(data,node,tree){
      console.log(data)
      console.log(node)
      console.log(tree)
    },
    filterNode(value,data,node){

    }
  }
};
</script>

<style lang='scss'>
.riskData{
  height: 400px;
  width: 300px;
}
.el-tree{
  height: 100%;
}
</style>
