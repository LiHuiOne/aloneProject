<template>
    <div class="warp_search">
        <div class="search_option">
            <el-form ref="search_form" size="mini" :inline="true">
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
                <el-date-picker v-else-if="item.type=='month'" v-model="formData[item.key]" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
                </el-date-picker>
                 <!-- <el-time-picker v-else-if="item.type=='year'" is-range v-model="formData[item.value]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :placeholder="item.placeholder">
                </el-time-picker> -->
                 <el-date-picker v-else-if="item.type=='ydate'" value-format="yyyy-MM-dd" v-model="formData[item.key]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                formData:{}
            }
        },
        props:['initData'],
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
</style>