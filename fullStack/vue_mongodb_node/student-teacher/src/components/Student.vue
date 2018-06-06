<template>
  <div class="student">
    <p>个人信息查看</p>
    <!-- <template> -->
    <el-table :data="databases" style="width: 100%">
      <el-table-column prop="date" label="学业"></el-table-column>
      <el-table-column prop="name" label="绩点"></el-table-column>
      <el-table-column prop="address" label="智育"></el-table-column>
      <el-table-column prop="name" label="学分"></el-table-column>
      <el-table-column prop="address" label="补考"></el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'Student',
  data () {
    return {
      databases: [
        {
          study: '优秀',
          date: 'dddd'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
