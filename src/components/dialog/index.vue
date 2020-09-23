<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        @closed="colsedDia"
        width="40%"
        >
        <div class="form_Container">
            <el-form ref="form" :model="formData" label-width="80px">
                 <el-form-item v-for="(item,index) in formItemList" :label="item.label" :key="index">
                    <el-input v-if="item.type=='text'" v-model="formData[item.key]" :placeholder="item.placeholder"></el-input>
                    <el-select v-else-if="item.type=='select'" v-model="formData[item.key]">
                        <el-option v-for="(itemOption,index) in item.option" :key="index" :label="itemOption.label" :value="itemOption.value"></el-option>
                    </el-select>
                    <el-time-picker v-else-if="item.type=='date'" is-range v-model="formData[item.key]" value-format="HH:mm:ss" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :placeholder="item.placeholder">
                    </el-time-picker>
                    <el-date-picker v-else-if="item.type=='month'" value-format="yyyy-MM" v-model="formData[item.key]" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
                    </el-date-picker>
                    <el-date-picker v-else-if="item.type=='ydate'" value-format="yyyy-MM-dd" v-model="formData[item.key]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <!-- 多选框只能是绑定数组 -->
                    <el-checkbox-group ref='checkDom' v-else-if="item.type=='checkbox'" v-model="item.key">
                    <el-checkbox v-for="(cheItem,index) in item.option" :key="index" :label="cheItem.value" name="type">{{cheItem.label}}</el-checkbox>
                    </el-checkbox-group>
                    <el-radio-group v-else-if="item.type=='radio'" v-model="formData[item.key]">
                        <!-- 单选将:label="itemRadio.value"获取绑定的value值 -->
                        <el-radio v-for="(itemRadio,index) in item.option" :key="index" :label="itemRadio.value">{{itemRadio.label}}</el-radio>
                    </el-radio-group>
                    <el-upload v-else-if="item.type=='image'" drag action="https://jsonplaceholder.typicode.com/posts/">
                        <img :src="imgSrc">
                    </el-upload>
                    <el-input v-else-if="item.type=='textarea'" type="textarea" v-model="formData[item.key]"></el-input>
                    <el-input v-else v-model="formData[item.key]" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="colsedDia">取 消</el-button>
            <el-button type="primary" @click="confirmDia">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        data(){
            return{
                dialogVisible:false,
                formData:{},
                formItemList:[],
                formLabelList:[],
                imgSrc:'https://upload.jianshu.io/users/upload_avatars/3773740/6f9ab33e5572.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/90/h/90/format/webp'
            }
            
        },
        props:['diaStatus','title','diaData'],
        watch:{
            diaStatus(){
                this.dialogVisible=this.diaStatus
                this.formItemList=this.diaData
            }
        },
        mounted(){
            this.dialogVisible=this.diaStatus
            this.formItemList=this.diaData
            this.initDialog()
        },
        methods:{
            initDialog(){
                this.formLabelList=this.diaData.map(item=>{
                    //判断this.formData里是否具有key属性，没有的话则添加key属性并且赋空值
                    //注意：刚加载进来都没有
                    if(this.formData[item.key]==''||this.formData[item.key]==null){
                        this.$set(this.formData,item.key,item.value||'')
                        
                    }
                    return item
                })
            },
            colsedDia(){
                this.dialogVisible=false
                this.formData={};
                this.formItemList=[];
                this.$emit('closeDia')
            },
            confirmDia(){
                this.dialogVisible=false
                let formData={};
                this.formLabelList.forEach((item) => {
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
                    }else if(item.type=='checkbox'){
                        if(this.formData[item.key]==undefined||this.formData[item.key]==''){
                            let checkList=[]
                            //获取选中的值，如果需要字符串传递就checkList拼接成一个字符串就可以
                            //console.log(this.$refs.checkDom[0].$children)
                            if(this.$refs.checkDom[0].$children.length>0){
                                this.$refs.checkDom[0].$children.forEach(item=>{
                                    if(item.isChecked){
                                        checkList.push(item.label)
                                    }
                                })
                               
                            }
                            //
                            this.$set(formData,'checkList',checkList)
                        }
                    } 
                    else {//文本和单选
                        formData[item.key] = this.formData[item.key] || parseInt(this.formData[item.key]) === 0 ? this.formData[item.key] : null
                    }
                })
                this.$emit('closeDia',formData)
            }
        }
    }
</script>

<style scoped>

</style>