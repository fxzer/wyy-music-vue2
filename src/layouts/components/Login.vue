<template>
  <div class="login-wrap" v-if="visible">
    <div class="qr-login">
      <h2>扫码登录</h2>
      <img :src="qrCodeSrc" class="qr-code" />
      <p class="qr-desc">
        使用
        <i style="color: #ec4141; vertical-align: top">网易云音乐APP</i>
        扫码登录
      </p>
    </div>
    <el-link :underline="false">选择其他方式登录</el-link>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Login",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      qrCodeSrc: "",
    };
  },
  computed: {},
  components: {},
  methods: {
    async getQrUrl() {
      const res = await this.$http("/login/qr/key");
      let unikey = res.data.unikey;
      console.log("unikey: ", unikey);
      const resurl = await this.$http(`/login/qr/create?key=${unikey}`);
      let qrUrl = resurl.data.qrurl;
      console.log("qrUrl: ", qrUrl);
      QRCode.toDataURL(qrUrl, (err, src) => (this.qrCodeSrc = src));
      this.pollFetch(unikey);
    },
    timeoutPromise(delayTime) {
      return new Promise((resolve) => {
        window.timeId = setTimeout(resolve, delayTime);
      });
    },
    pollQrStatus(unikey) {
      return this.$http(`/login/qr/check?key=${unikey}`);
    },
    async pollFetch(unikey) {
      while (true) {
          const res = await this.pollQrStatus(unikey);
          console.log('res: ', res);
          if (res.code === 800) {
            //二维码已失效
            this.$notify.success("二维码已失效") 
            return;
          } else if (res.code === 801) {
            this.$notify.info("等待扫码");
          } else if (res.code === 802) {
            this.$notify.primary("扫码成功待确认");
          } else if (res.code === 803) {
            this.$notify.success("登录成功");
            Cookies.set("wyy_sessionid", res.cookie);
            this.$emit("update:visible", false);
            return;
          }
          await this.timeoutPromise(300);
      }
    },
  },
  created() {},
  mounted() {},
  watch: {
    visible(val) {
      if (val) {
        this.getQrUrl();
      } else {
        this.qrCodeSrc = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login-wrap {
  width: 450px;
  height: 660px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 0 6px #ccc;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .qr-login {
    h2 {
      font-size: 30px;
      font-weight: 400;
      margin-top: 50px;
      color: #333;
      text-align: center;
    }
    .qr-code {
      width: 220px;
      height: 220px;
      border: 1px solid #ddd;
      margin-top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .qr-desc {
      color: #999;
      font-size: 13px;
      text-align: center;
      margin-top: 15px;
    }
  }
  .el-link {
    margin-top: 100px;
  }
}
</style>
