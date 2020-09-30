<template>
  <div class="riskData">
   <el-tree ref="tree" :data="treeData" :props="defaultProps" @node-click="treeNodeClick" :filter-node-method="filterNode" :default-expand-all="true" :expand-on-click-node="false" :check-on-click-node="false" :highlight-current="true"></el-tree>
    <div class="risk_main">
      <div class="tableData">
      <el-table
        :data="tableData"
        >
        <template v-for="item in tableClunmData">
          <el-table-column 
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :key="item.prop">
          </el-table-column>
        </template>
          <el-table-column label="操作" fixed="right" width="120">
              <el-button type="text" size="small" @click="exportFile">导出当前表格数据</el-button>
          </el-table-column>
      </el-table>
    </div>
    <div class="tabCon">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
          <el-form :model="formData">
            <template v-if="activeName=='1'">
               <el-form-item label="姓名">
                 <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
               </el-form-item>
            </template>
             <template v-if="activeName=='2'">
               <el-form-item label="年龄">
                 <el-input v-model="formData.age" placeholder="请输入"></el-input>
               </el-form-item>
            </template>
             <template v-if="activeName=='3'">
               <el-form-item label="地址">
                 <el-input v-model="formData.address" placeholder="请输入"></el-input>
               </el-form-item>
            </template>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" size="small" @click="submitForm">提交</el-button>
    </div>
   </div>
   
  </div>
</template>

<script>
import tableClunmData from './mixin/table.js'
import transform from '@/units/excle.js'
export default {
  mixins:[tableClunmData],
  data(){
    return{
      treeData:[{"orgId":2,"subList":[{"orgId":3,"subList":[{"orgId":16,"subList":[],"title":"下城分公司(0/0)"},{"orgId":20,"subList":[],"title":"测试(0/0)"}],"title":"杭州分公司(20/0)"},{"orgId":6,"subList":[{"orgId":10,"subList":[{"orgId":11,"subList":[],"title":"鄞州区下级(0/0)"}],"title":"鄞州区(0/0)"},{"orgId":14,"subList":[],"title":"宁波下级分公司(0/0)"},{"orgId":15,"subList":[],"title":"宁波下级子公司(0/0)"}],"title":"宁波分公司(4/0)"},{"orgId":9,"subList":[],"title":"宁波第二分公司(0/0)"}],"title":"平安银行(0/24)"}],
      defaultProps:{
        children:'subList',
        label:'title'
      },
      tableHeader:['日期','姓名','地址'],
      headerProp:['date','userName','address'],
      tableData:[{'date':'2020-9-30','userName':'测试1','address':'杭州'},{'date':'2020-9-26','userName':'测试2','address':'杭州'}],
      activeName:'1',
      tabList:[{label:'用户管理',name:'1'},{label:'配置管理',name:'2'},{label:'角色管理',name:'3'}],
      formData:{}
    }
  },
  methods:{
    treeNodeClick(data,node,tree){
      console.log(data)
      console.log(node)
      console.log(tree)
    },
    filterNode(value,data,node){

    },
    exportFile(){
      transform(this.tableData,'测试',this.tableHeader,this.headerProp,'测试excle表',this.exportSucess)
    },
    exportSucess(){
      console.log('导出成功')
    },
    tabClick(tab, event){
      //获取数据
      this.activeName=tab.name;
      //console.log(tab)
    },
    submitForm(){
      console.log(this.formData)
    }
  }
};
</script>

<style lang='scss'>
.riskData{
  height: 400px;
  width: 100%;
  display: flex;
}
.el-tree{
  height: 100%;
}
.risk_main{
  width: 80%;
  margin-left: 20px;
  border-left: 1px solid #ccc;
}
.tableData{
  
  width:80%;
  margin-bottom: 40px;
}

</style>
