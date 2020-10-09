<template>
  <div class="login_container">
    <div class="logo">
      <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1617440975,2703338025&fm=26&gp=0.jpg" alt="">
    </div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input  type="password" v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-row>
          <el-col :span="14">
            <el-input v-model="form.code" class="vaildCode"></el-input>
          </el-col>
          <el-col :span="10">
            <img :src="this.src" @click="getCode" style="width:70px;height:34px" />
          </el-col>
        </el-row>
      </el-form-item>
      <div class="checkBox_warp">
        <el-checkbox v-model="form.saveAcount">记住账号</el-checkbox>
        <el-checkbox v-model="form.savePwd">记住密码</el-checkbox>
      </div>
      <el-button type="primary" size="large" class="btn_sunbmit" @click="onSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
//引入加密
import { JSEncrypt } from "jsencrypt";
import { mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  data() {
    return {
      form: {
        account: "",
        pwd: "",
        code: "",
        saveAcount:false,
        savePwd:false
      },
      rules:{
        account:[
          {required: true, message: '请填写账号', trigger: 'blur'}
        ],
        pwd:[
          {required: true, message: '请填写密码', trigger: 'blur'}
        ],
        code:[
          {required: true, message: '请填写验证码', trigger: 'blur'}
        ]
      },
      src: "",
      status:false
    };
  },
  computed:{
    ...mapGetters(['aisdeCollape','userInfo'])
  },
  created(){
    this.getCode()
  },
  mounted(){
    this.form.account = localStorage.getItem('loginAccount') || ''
    this.form.pwd =localStorage.getItem('loginPwd') || ''
    if(localStorage.getItem('loginAccount')){
      this.$set(this.form,'saveAcount',true)
    }
    if(localStorage.getItem('loginPwd')){
      this.$set(this.form,'savePwd',true)
    }
  },
  methods: {
    ...mapActions(['Login']),
    ...mapMutations(['TOOGLE_ASIDE']),
    onSubmit() {
      //使用解构赋值，获取mapActions中的Login
      let {
        Login
      }=this
      const publicKey =
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu+2NFLhWUYloFqNXubILIEhNoAEoNyIccqaNOLnS1E8qay/kJB3fAmFTtJVhQpTciNZFhfORhdUljAfN/xFi9Wb2l1lDUK24vqIe/XXFwkLJWOENo32lfYhS+YtEzw+fhhPC/aqGaTYpKa5bCqob3AfWWRuFGEuBqNdy+29VLHVBaLsOdDglGvBf3F3UbygLHAKXyFa1ozdXa+iKAlOxyGZd1bATwvuK3lBk/H1tbRFFmqI2thujl1jAFNx4dL8KEG62YAlMAI5Xhq3CnNfvufKoOZTr16fT54uwX6R69nv6RriuOinNokOHsqOU28qWMZP3uDuwLi/WzrJJSSBiJQIDAQAB";
      const params = {
        account: this.form.account,
        password: this.encryptedData(publicKey, this.form.pwd),
        code: this.form.code
      };
      this.$refs['loginForm'].validate((valid) => {
        if(valid){
            if(this.form.saveAcount){
              localStorage.setItem('loginAccount',this.form.account)
            }else{
                localStorage.removeItem('loginAccount')
            }
            if(this.form.savePwd){
              localStorage.setItem('loginPwd', this.form.pwd)
            }else{
              localStorage.removeItem('loginPwd')
            }
            Login(params)
            .then((res)=>{
              if(res.success){
                localStorage.setItem('userInfo','islogin')

                this.$router.push({name:'index'})
              }
            })
            .finally(()=>{console.log("登录完成")})
        }
      })
    },
    //密码加密,先安装npm install jsencrypt --dev
    encryptedData(publicKey, data) {
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      return encrypt.encrypt(data);
    },
    getCode(){
      //获取时间戳
      var timestamp = new Date().valueOf();
      let url=process.env.VUE_APP_URL
      //打包时修改
      //this.src=`${url}login/code?` + timestamp
      this.src = "/api/login/code?" + timestamp;
    }
  }
};
</script>

<style lang="scss" scoped>
  .login_container{
    width: 400px;
    height: 360px;
    position: absolute;
    top:20%;
    left: 50%;
    margin-left: -200px;
    border:1px solid #f0f0f0;
    .logo{
      width: 100%;
      height: 100px;
      text-align: center;
      img{
        height: 100px;
        width: 100px;
      }
    }
    .checkBox_warp{
      display: flex;
      justify-content: space-around;
    }
    .btn_sunbmit{
      position:absolute;
      width:300px;
      left: 50%;
      margin-top: 20px;
      margin-left: -150px;
    }
    .vaildCode{
      width: 180px !important;
    }
  }
</style>
