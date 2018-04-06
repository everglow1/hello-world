<template>
  <div class="main" v-loading="loading">
    <div class="list">
      <router-link to="/user/user">
        <img src="#" alt="test">
      </router-link>
      <div class="text">
        <router-link></router-link>
        <div class="content">
          <span>回复：</span>
          <span>创建于：</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {

    }
  }

}
</script>

<style>

</style>
