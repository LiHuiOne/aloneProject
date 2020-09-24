<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        @closed="colsedDia"
        width="40%"
        class="dia_continer"
        >
        <div class="form_Container">
            <el-form ref="form" :model="formData" label-width="80px">
                 <el-form-item v-for="(item,index) in formItemList" :label="item.label" :key="index">
                    <el-input v-if="item.type=='text'" :disabled="item.mStatus" v-model="formData[item.key]" :placeholder="item.placeholder"></el-input>
                    <el-select v-else-if="item.type=='select'" :disabled="item.mStatus" v-model="formData[item.key]">
                        <el-option v-for="(itemOption,index) in item.option" :key="index" :label="itemOption.label" :value="itemOption.value"></el-option>
                    </el-select>
                    <el-time-picker v-else-if="item.type=='date'" :disabled="item.mStatus" is-range v-model="formData[item.key]" value-format="HH:mm:ss" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :placeholder="item.placeholder">
                    </el-time-picker>
                    <el-date-picker v-else-if="item.type=='month'" :disabled="item.mStatus" value-format="yyyy-MM" v-model="formData[item.key]" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
                    </el-date-picker>
                    <el-date-picker v-else-if="item.type=='ydate'" :disabled="item.mStatus" value-format="yyyy-MM-dd" v-model="formData[item.key]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                     <!-- 多选框只能是绑定数组,绑定空数组，解决关闭弹框的时候选中项不取消问题 -->
                    <!-- v-model绑定的必须和绑定的label类型一致才能生效 -->
                    <el-checkbox-group ref='checkDom' v-else-if="item.type=='checkbox'" v-model="checkBoxItem">
                    <el-checkbox v-for="(cheItem,index) in item.option" :disabled="item.mStatus" :key="index" :label="cheItem.value" name="type">{{cheItem.label}}</el-checkbox>
                    </el-checkbox-group>
                    <el-radio-group v-else-if="item.type=='radio'" v-model="formData[item.key]">
                        <!-- 单选将:label="itemRadio.value"获取绑定的value值 -->
                        <el-radio v-for="(itemRadio,index) in item.option"  :disabled="item.mStatus" :key="index" :label="itemRadio.value">{{itemRadio.label}}</el-radio>
                    </el-radio-group>
                    <div class="uploadImg" v-else-if="item.type=='image'">
                        <el-upload
                            :disabled="item.mStatus"
                            action=""
                            :on-success="handSccess"
                            :before-upload="beforeLoad">
                            <!-- <img :src="imgSrc"> -->
                            <span class="imgcontainer" v-if="imgSrc==''">
                                <i class="el-icon-upload"></i>
                                <p class="el-upload__text"><em>点击上传</em></p>
                            </span>
                            <img v-else :src="imgSrc" alt="">
                        </el-upload>
                    </div>
                    
                    <el-input v-else-if="item.type=='textarea'" :disabled="item.mStatus" type="textarea" v-model="formData[item.key]"></el-input>
                    <el-input v-else v-model="formData[item.key]" :disabled="item.mStatus" placeholder="请输入"></el-input>
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
                checkBoxItem:[],
                fileList:[],
                imgSrc:''
            }
            
        },
        props:['diaStatus','title','diaData','deInfo'],
        watch:{
            diaStatus(){
                this.dialogVisible=this.diaStatus
                this.formItemList=this.diaData
                // //判断一个对象里是不是具有属性，这个对象是否为空
                // if(Object.keys(this.deInfo).length>0){
                //     this.formData=this.deInfo
                //     this.checkBoxItem=this.deInfo.checkedList
                //     this.imgSrc=this.formData.imgSrc
                // }
            }
        },
        mounted(){
            //父组件添加v-if所以每次都会执行mounted
            this.dialogVisible=this.diaStatus
            this.formItemList=this.diaData
            //判断一个对象里是不是具有属性，这个对象是否为空
            if(Object.keys(this.deInfo).length>0){
                this.formData=this.deInfo
                this.checkBoxItem=this.deInfo.checkedList
                this.imgSrc=this.formData.imgSrc
            }
            this.initDialog()
        },
        methods:{
            initDialog(){
                this.formLabelList=this.diaData.map(item=>{
                    //判断this.formData里是否具有key属性，没有的话则添加key属性并且赋空值
                    //注意：刚加载进来都没有,作用是与表单里相对应
                    if(this.formData[item.key]==''||this.formData[item.key]==null){
                        this.$set(this.formData,item.key,item.value||'')
                        
                    }
                    return item
                })
            },
            beforeLoad(){
                this.imgSrc='https://upload.jianshu.io/users/upload_avatars/18058665/06ec2d9d-4427-4d63-ad02-34c4243b2e01?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp'
            },
            handSccess(res,fileList){
                this.imgSrc='https://upload.jianshu.io/users/upload_avatars/18058665/06ec2d9d-4427-4d63-ad02-34c4243b2e01?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp'
                this.fileList=fileList
                //this.imgSrc = URL.createObjectURL(file.raw);
            },
            colsedDia(){
                this.dialogVisible=false
                this.formData={};
                this.formLabelList=[]
                this.$emit('closeDia')
            },
            confirmDia(){
                this.dialogVisible=false
                //this.formData=[]
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
                    }else if(item.type=='image'){
                        this.$set(formData,'imgSrc',this.imgSrc)
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

<style lang='scss'>
    .dia_continer{
        .el-dialog{
            .el-dialog__body{
                height: 500px;
                overflow: hidden;
                overflow-y: auto;
                .uploadImg{
                width: 120px;
                height: 120px;
                border: 1px solid gray;
                border-style: dashed;
                :nth-child(1){
                    width: 100%;
                    .el-upload{
                        .imgcontainer{
                            .el-icon-upload{
                                font-size: 80px;
                                color: #f0f0f0;
                            }
                            .el-upload__text{
                                color: #796a6a;
                            }
                        }
                        ul{
                            display: none;
                        }
                    }
                }
                img{
                    width: 100%;
                    height: 120px;
                }
        
            }
            }
        }
        
        
    }
    
</style>