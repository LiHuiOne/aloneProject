<template>
  <div class="mianContainer">
    <div class="search">
      <search-group ref="searchForm" :initData="searchData" @search="getData"></search-group>
    </div>
    <div class="main_tab">
        <el-table 
        v-loading="loading"
        element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.2)"
          :data="tableData"
        :header-cell-style="{
          'background-color': '#f0f0f0',
          'border-bottom': '1px RGBA(199, 199, 199, 1) solid'
        }">
          <template v-for="item in tableColumn">
            <el-table-column
             :label="item.label"
             :show-overflow-tooltip="true"
             :key="item.prop"
             :prop="item.prop"
             :min-width="item.width"
             :formatter="item.formatter"
            />
          </template>
           <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="showDetail(row,1)">添加</el-button>
              <el-button type="text" size="small" @click="showDetail(row,2)">查看</el-button>
              <el-button type="text" size="small" @click="showDetail(row,3)">修改</el-button>
              <el-button type="text" size="small" @click="showImg">预览</el-button>
              <el-button type="text" size="small" @click="importFile">导入</el-button>
              <el-button type="text" size="small" @click="exportFile">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
          v-if="tableData.length>0"
          @size-change="getData"
          @current-change="getData"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="paBar.total">
      </el-pagination>
    </div>
    <!-- 添加v-if的原因：阻止子组件在父组件上加载的时渲染，以防子组件操作时获取不到填写的数据 -->
    <dialog-info v-if="diaStatus==true" :title="title" :diaStatus="diaStatus" :diaData="diaData" :deInfo="detailInfo" @closeDia="closeDia"></dialog-info>
    <el-dialog
      class="viwerDia"
      title="预览"
      :visible.sync="viwerImgStatus"
      width="30%"
    >
      <el-row :gutter="10">
        <el-col :span="12">
          <viewer :images="imagesList">
          <img v-for="src in imagesList" :src="src" :key="src">
      </viewer>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viwerImgStatus = false">取 消</el-button>
        <el-button type="primary" @click="viwerImgStatus = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="导入" :visible.sync="upDiaStatus" width="30%">
      <el-upload class="upload-demo" :on-change="upLoadChange" action="" :auto-upload="false">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upDiaStatus = false">取 消</el-button>
        <el-button type="primary" @click="sureUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
import searchData from './mixin/search'
import tableColumn from './mixin/table'
import dialogData from './mixin/dialog'
import detailData from './mixin/detail_dialog'
import modifyData from './mixin/modify-dialog'
export default {
  mixins:[searchData,tableColumn],
  inject:['reload'],//刷新当前组件
  data(){
    return{
      loading:true,
      upDiaStatus:false,
      tableData:[
        {codeId:'001',userName:'测试',age:20,address:'浙江省下城隼目科技',conPer:'小灰灰',work:'前端开发',roleName:'法师'},
        {codeId:'002',userName:'测试',age:20,address:'浙江省下城隼目科技',conPer:'小灰灰',work:'前端开发',roleName:'刺客'}
      ],
      paBar:{
        pageNum:1,
        pageSize:100,
        total:100
      },
      currentPage: 1,
      diaStatus:false,
      diaData:[],
      detailInfo:{},
      title:'',
      viwerImgStatus:false,
      fileList:[],
      imagesList:['https://t11.baidu.com/it/u1=1900852480&u2=4161278891&fm=76','https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg']
    }
  },
  components:{
    'search-group':()=>import("@/components/searchGroup/search-group"),
    'dialog-info':()=>import("@/components/dialog")
  },
  computed:{
   
  },
  mounted(){
    setTimeout(() => {
      this.loading=false
    }, 500);
  },
  methods:{
    getData(){
      const form = this.$refs.searchForm ? this.$refs.searchForm.getFormData() : {};
      const params = {
        pageNum:this.currentPage,
        pageSize: 10
      }
      console.log(form)
      // const data = await this.$api.postCustomersList({...params,...form});
      // this.loading = false;
      // if (data.success) {
      //     this.tableData = data.datas.content;
      //     this.pagebar = {
      //       total: data.datas.total,
      //       pageSize: data.datas.pageSize
      //     };
      // }
    },
    showImg(){
      this.viwerImgStatus=true
    },
    showDetail(row,type){
      this.diaStatus=true
      if(type==1){
        this.title='添加'
        this.diaData=dialogData
      }else{
        this.title=type==2?'查看':'修改'
        this.diaData=type==2?detailData:modifyData;
        this.detailInfo={userName:'001',age:2,catory:2,time:'08:02:00',month:'2020-09',date:'2020-09-20',checkedList:[1,2],imgSrc:'https://t11.baidu.com/it/u1=1900852480&u2=4161278891&fm=76',desc:'前端开发'}
        //this.detailInfo={userName:'001',age:2,catory:2,time:'08:02:00',month:'2020-09',date:'2020-09-20',checkedList:[1,2],imgSrc:['https://t11.baidu.com/it/u1=1900852480&u2=4161278891&fm=76'],desc:'前端开发'}
        
      }
    },
    closeDia(data){
      this.diaStatus=false
      if(data&&this.title!='查看'){
        console.log(data)
      } 
      //刷新当前组件
      this.reload()
      // window.location.reload()
    },
    importFile(){
      this.upDiaStatus=true;
    },
    upLoadChange(res,fileList){
      this.fileList=fileList
    },
    async sureUpload(){
      let formData=new FormData();
      this.fileList.forEach(item=>{
        formData.append('file',item.raw)
      })
      const data = await this.$api.vehicleGpsImport(param)
      if(data.success){
          this.importVisible = false;
          this.$message({
          showClose: true,
          message: '导入成功',
          customClass: 'success',
          iconClass:"el-icon-circle-check",
        });
      }
      
    },
    async exportFile(){
      const form = this.$refs.searchForm ? this.$refs.searchForm.getFormData() : {};
      const data = this.$api.vehiclegpsExcelfiles(form);
     if(data.success === undefined){
        let a = document.createElement('a');
        a.style.display = 'none';
        a.download = '列表.csv';
        let blob = new Blob([data]);
        a.href = window.URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  }
};
</script>

<style lang="scss">
  .search{
    display: flex;
  }
  .imgViewerContainer{
    position:absolute;
    margin:100px auto;
  }
  .viwerDia{
    .el-dialog__body{
      height: 120px;
      img{
        margin:5px 10px;
        height: 100px;
        width: 100px;
      }
    }
  }
</style>
