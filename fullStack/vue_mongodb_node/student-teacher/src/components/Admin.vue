<template>
  <div class="admin">
    <p>学生管理</p>
    <!-- <tr class="header">
      <th>姓名</th>
      <th>性别</th>
      <th>学号</th>
      <th>学业情况</th>
      <th>绩点</th>
      <th>学分</th>
      <th>补考次数</th>
    </tr>
    <tr v-for="(item, index) in list" :key="index">
      <td>{{item.username}}</td> 
      <td>{{item.email}}</td>
      <td>{{item.sex}}</td>
      <td>{{item.province}}</td>
      <td>{{item.hobby}}</td>
      <td>{{item.test}}</td>
      <td>{{item.name}}</td>
    </tr> -->
    <ul style="list-style: none; margin: 0; padding: 0">
      <li v-for="(item, index) in list" :key="index" class="items">
        <div>
          <span>姓名：{{item.username}}</span>
        </div>
        <div>
          <span>性别：{{item.sex}}</span>
        </div>
        <div>
          <span>学号：{{item.snum}}</span>
        </div>
        <div>
          <span>学业情况：{{item.grade}}</span>
        </div>
        <div>
          <span>绩点：{{item.credit}}</span>
        </div>
        <div>
          <span>学分：{{item.test}}</span>
        </div>
        <div>
          <span>补考次数：{{item.test}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      list: [
        {
            username: 'aaaaa',
            sex: '男',
            snum: '1212',
            grade: '优秀',
            gpa: '23',
            credit: '45',
            test: '0'
        },
        {
            username: 'aaaaa',
            sex: '男',
            snum: '1212',
            grade: '优秀',
            gpa: '23',
            credit: '45',
            test: '0'
        },
        {
            username: 'aaaaa',
            sex: '男',
            snum: '1212',
            grade: '优秀',
            gpa: '23',
            credit: '45',
            test: '0'
        },
        {
            username: 'aaaaa',
            sex: '男',
            snum: '1212',
            grade: '优秀',
            gpa: '23',
            credit: '45',
            test: '0'
        },
        {
            username: 'aaaaa',
            sex: '男',
            snum: '1212',
            grade: '优秀',
            gpa: '23',
            credit: '45',
            test: '0'
        }
      ]
    }
  }
}
</script>

<style scoped>
  #admin {
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 30px;
    text-align: center;
    margin: auto;
    /* background: blueviolet; */
  }
  .items {
    margin: 10px 10px 0 10px;
    border-bottom: 1px solid #e4e4
  }
  div {
    text-align: left;
  }
</style>
