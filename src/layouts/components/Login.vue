<template>
  <div class="login-wrap" v-if="visible">
    <div class="qr-login">
      <h2>{{ title }}</h2>
      <div class="qr-code-box">
        <img :src="qrCodeSrc" class="qr-code" />
        <div class="timeout-qr" v-if="isTimeout">
          <span class="timeout-qr-text">二维码已失效</span>
          <span class="timeout-qr-btn" @click="refresh">点击刷新</span>
        </div>
        <div class="is-scaned-qr" v-if="isScaned">
          <div class="icon-box">
            <div class="iconfont icon-shouji">
              <i class="iconfont icon-duigou"></i>
            </div>
          </div>
        </div>
      </div>
      <p class="qr-desc" v-if="!isScaned">
        使用
        <i style="color: #ec4141; vertical-align: top">网易云音乐APP</i>
        扫码登录
      </p>
      <p class="confirm-login qr-desc" v-else>请在手机上确认登录</p>
    </div>
    <el-link :underline="false">选择其他方式登录</el-link>
    <i class="el-icon-close" @click="close"></i>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { mapMutations } from "vuex";
import Cookies from "js-cookie";
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
      timer: null,
      user: {},
      isauthed: false,
      isScaned: false,
      isTimeout: false,
    };
  },
  computed: {
    title() {
      return this.isScaned ? "扫码成功" : "扫码登录";
    },
  },
  components: {},
  methods: {
    ...mapMutations("search", ["setUserInfo"]),
    async getQrUrl() {
      const res = await this.$http(`/login/qr/key?timestamp=${Date.now()}`);
      let unikey = res.data.unikey;

      const resurl = await this.$http(
        `/login/qr/create?key=${unikey}&timestamp=${Date.now()}`
      );
      let qrUrl = resurl.data.qrurl;

      QRCode.toDataURL(qrUrl, (err, src) => (this.qrCodeSrc = src));
      // this.pollFetch(unikey);
      this.timer = setInterval(() => {
        this.pollFetch(unikey);
      }, 1000);
    },
    refresh() {
      this.getQrUrl();
    },
    // timeoutPromise(delayTime) {
    //   return new Promise((resolve) => {
    //     window.timeId = setTimeout(resolve, delayTime);
    //   });
    // },
    pollQrStatus(unikey) {
      return this.$http(
        `/login/qr/check?key=${unikey}&timestamp=${Date.now()}`
      );
    },
    async pollFetch(unikey) {
      const res = await this.pollQrStatus(unikey);

      if (res.code === 800) {
        //二维码已失效
        this.$notify.success("二维码已失效");
        this.isTimeout = true;
        clearInterval(this.timer);
      } else if (res.code === 801) {
        this.$notify.info("等待扫码");
      } else if (res.code === 802) {
        this.user = res;
        this.isScaned = true;
        this.$notify.success("扫码成功");
      } else if (res.code === 803) {
        this.$notify.success("登录成功");
        this.isauthed = true;
        Cookies.set("wyyid", res.cookie);
        this.$emit("update:visible", false);
        clearInterval(this.timer);
      }
    },
    close() {
      clearInterval(this.timer);
      this.$emit("update:visible", false);
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
    isauthed(val) {
      if (val) {
        this.setUserInfo(this.user);
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
    .qr-code-box {
      width: 220px;
      height: 220px;
      border: 1px solid #ddd;
      margin-top: 40px;
      position: relative;
      .qr-code {
        width: 100%;
        height: 100%;
      }
      //二维码失效
      .timeout-qr {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .timeout-qr-text {
          color: #fff;
          font-size: 14px;
          margin-right: 10px;
        }
        .timeout-qr-btn {
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          background-color: #0c73c2;
          border-radius: 5px;
          margin-top: 12px;
          padding: 4px 10px;
        }
      }
      //已扫码待确认
      .is-scaned-qr {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon-box {
          .icon-shouji {
            font-size: 140px;
            color: #ec4141;
            position: relative;
            .icon-duigou {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 40px;
              color: #ec4141;
            }
          }
        }
      }
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
  .el-icon-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
    color: #999;
  }
}
</style>
