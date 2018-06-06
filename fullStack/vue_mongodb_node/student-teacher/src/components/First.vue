<template>
  <div id="first">
    <h1>学生学籍信息管理系统</h1>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="您的身份是?" name="1">
        <!-- <el-col :span="24" >
          <el-card shadow="always" class="student" @click="toStudent">
            学生
          </el-card>
          <el-card shadow="always" class="student">
            管理员
          </el-card>
        </el-col> -->
        <el-button @click="toStudent" class="btn">学生</el-button><br/>
        <el-button @click="toAdmin" class="btn">管理员</el-button>
      </el-collapse-item>
    </el-collapse>
    <p class="text">简单而不失优雅，小巧而不乏大匠</p>
  </div>
</template>

<script>
export default {
  name: 'First',
  data () {
    return {
      activeNames: ['1']
    }
  },
  components: {

  },
  methods: {
    handleChange(val) {
      // console.log(val);
    },
    toStudent() {
      this.$router.push('Login');
      console.log('登录')
    },
    toAdmin() {
      this.$router.push('Logina');
    }
  }
}
</script>

<style>
#First {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* background: blueviolet; */
}
.btn {
  font-size: 20px;
  width: 300px;
  margin-top: 20px;
}
.el-collapse-item__header {
  font-size: 25px;
}
.text {
  position: absolute;
  width: 100%;
  bottom: 60px;
}
</style>
