<template>
  <div class="home">
    <input type="text" v-model="tim" placeholder="请输入验证码" />
    <button @click="getCode">点击获取验证码</button>
  </div>
</template>

<script>
// @ is an alias to /src
// vuex 方法
// 结束时间戳存到vuex 中 用结束时间戳做判断 与当前时间戳相减
// 大于0 证明 倒计时仍在继续  页面仍然使用当前时间戳
// 如果小于0  证明倒计时已经结束
export default {
  name: "Home",
  data() {
    return {
      timer: null, // 定时器
      tim: 0, //时间
    };
  },
  components: {},
  computed: {
    timeStap() {
      // return this.$store.state.timeStap;
      return this.$cookie.get("end_time");
    },
  },
  mounted() {},
  created() {
    console.log(123);
    if (this.timeStap) {
      // 当前时间戳
      let time = new Date().getTime();
      // 结束时间戳 - 当前时间戳
      let dit = this.timeStap - time;
      if (dit > 0) {
        //>0 证明倒计时在继续
        this.tim = Math.floor(dit / 1000); // 时间戳转换为秒
        this.timer = setInterval(() => {
          if (this.tim > 0) {
            this.tim--;
          } else {
            // this.$store.commit("SET_TIME_STAP", null);
            // this.$cookie.set("end_time", null);
            this.$cookie.remove("end_time");
            clearInterval(this.timer);
          }
        }, 1000);
      }
    } else {
      // this.$store.commit("SET_TIME_STAP", null);
      // this.$cookie.set("end_time", null);
      this.$cookie.remove("end_time");
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getCode() {
      this.tim = 60;
      let end_time = new Date().getTime() + this.tim * 1000;
      // this.$store.commit("SET_TIME_STAP", end_time);
      this.$cookie.set("end_time", end_time);
      console.log(this.$cookie.set("end_time", end_time));
      this.timer = setInterval(() => {
        if (this.tim > 0) {
          this.tim--;
        } else {
          // 结束时间戳
          // this.$store.commit("SET_TIME_STAP", null);
          // this.$cookie.set("end_time", null);
          this.$cookie.remove("end_time");
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
};
</script>
