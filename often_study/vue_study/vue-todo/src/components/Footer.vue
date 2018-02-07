<template>
  <div id="footer">
    <span>{{author}}:Written by Tokcy</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: 'Everglow'
    }
  }
}
</script>

<style scoped>
  #footer {
    margin-top: 40px;
    text-align: center;
    color:#bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, green, blue, alpha);
  }
</style>

