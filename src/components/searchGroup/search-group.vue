<template>
    <div class="warp_search">
        <div class="search_option">
            <el-form ref="search_form" size="mini" :inline="true" label-position="right">
              <el-form-item v-for="(item,index) in initData" :key="`${item.key}${index}`" :label="item.label">
                  <el-input v-if="item.type=='text'" clearable v-model="formData[item.key]" :placeholder="item.placeholder"></el-input>
                  <el-select v-else-if="item.type=='select'" clearable v-model="formData[item.key]" :placeholder="item.placeholder">
                    <el-option v-for="(opItem,index) in item.option" :label="opItem.label" :value="opItem.value" :key="`${opItem.label}${index}`"></el-option>
                  </el-select>
                  <el-select v-else-if="item.type=='select-remote'" clearable filterable remote :remote-method="item.method" v-model="formData[item.key]" :placeholder="item.placeholder">
                    <el-option v-for="(opItem,index) in item.option" :label="opItem.label" :value="opItem.value" :key="`${opItem.label}${index}`"></el-option>
                  </el-select>
                 <el-time-picker v-else-if="item.type=='date'" is-range v-model="formData[item.key]" value-format="HH:mm:ss" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :placeholder="item.placeholder">
                </el-time-picker>
                <el-date-picker v-else-if="item.type=='month'" value-format="yyyy-MM" v-model="formData[item.key]" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
                </el-date-picker>
                 <!-- <el-time-picker v-else-if="item.type=='year'" is-range v-model="formData[item.value]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :placeholder="item.placeholder">
                </el-time-picker> -->
                 <el-date-picker v-else-if="item.type=='ydate'" value-format="yyyy-MM-dd" v-model="formData[item.key]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-form>
        </div>
        <div class="btn_container" :style="initData.length>5?'margin-top:-50px;':''">
            <el-button type="primary" @click="searchInfo">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formData:{},
                dataList:[]
            }
        },
        props:['initData'],
        mounted(){
            this.initSearch()
        },
        methods:{
            //将传递的搜索条件暂存
            initSearch(){
                this.dataList=this.initData.map(v=>{
                    if(this.formData[v.key]==''||this.formData[v.key]==null){
                        this.$set(this.formData,v.key,v.value||'')
                    }
                    return v
                })
            },
            searchInfo(){
                this.$emit('search')
            },
            reset(){

            },
            //获取填写的搜索条件
            getFormData(){
                let formData={};
                this.dataList.forEach((item) => {
                    if (item.type == "date"||item.type=="month"||item.type=="ydate") {
                        if(!this.formData[item.key]){
                            return false
                        }
                        //当是日期的时候将日期的格式类似是['startTime',endTime]，作为form里的key
                        formData[item.key[0]] = this.formData[item.key][0]
                        formData[item.key[1]] = this.formData[item.key][1]
                    } else if (item.type == "select") {
                        let defaultVal = item.default == 0 ? item.default : null;
                        formData[item.key] = this.formData[item.key] === 0 ? this.formData[item.key] : this.formData[item.key] === false ? this.formData[item.key] : this.formData[item.key] || defaultVal;
                    } else {//文本
                        formData[item.key] = this.formData[item.key] || parseInt(this.formData[item.key]) === 0 ? this.formData[item.key] : null
                    }
                })
                return formData
            }
        }
    }
</script>

<style lang="scss">
.warp_search{
    .search_option{
        .el-form-item{
            width: 19.4%;
            .el-form-item__content{
                width: 86.8%;
                .editor--timerange,.el-input__inner,.el-select{
                    width: 100%;
                }
               .el-input{
                   width: 100% !important;
               }
            }
        }
       
    }
    .btn_container{
        width: 135px;
        // margin-top:-50px;
        float: right;
    }
}
</style>