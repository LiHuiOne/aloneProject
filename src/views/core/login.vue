<template>
  <div class="login_container">
    <el-form ref="loginform" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="6">
            <img :src="this.src" alt="" style="width:60px;height:30px" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//引入加密
import { JSEncrypt } from "jsencrypt";
export default {
  data() {
    return {
      form: {
        account: "",
        pwd: "",
        code: ""
      },
      src: ""
    };
  },
  methods: {
    async onSubmit() {
      const publicKey =
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu+2NFLhWUYloFqNXubILIEhNoAEoNyIccqaNOLnS1E8qay/kJB3fAmFTtJVhQpTciNZFhfORhdUljAfN/xFi9Wb2l1lDUK24vqIe/XXFwkLJWOENo32lfYhS+YtEzw+fhhPC/aqGaTYpKa5bCqob3AfWWRuFGEuBqNdy+29VLHVBaLsOdDglGvBf3F3UbygLHAKXyFa1ozdXa+iKAlOxyGZd1bATwvuK3lBk/H1tbRFFmqI2thujl1jAFNx4dL8KEG62YAlMAI5Xhq3CnNfvufKoOZTr16fT54uwX6R69nv6RriuOinNokOHsqOU28qWMZP3uDuwLi/WzrJJSSBiJQIDAQAB";
      const params = {
        account: this.form.account,
        password: this.encryptedData(publicKey, this.form.pwd),
        code: this.form.code
	  };
	  console.log(params)
      const reData = await this.$api.userLogin(params);
      console.log(reData);
    },
    //密码加密,先安装npm install jsencrypt --dev
    encryptedData(publicKey, data) {
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      return encrypt.encrypt(data);
    }
  },
  created() {
    var timestamp = new Date().valueOf();
    this.src = "/api/login/code?" + timestamp;
  }
};
</script>

<style scoped></style>
