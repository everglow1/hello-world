<template>
  <div id="translateoutput">
    <h2>{{translatedTxt}}</h2>
  </div>
</template>

<script>
export default {
  name: 'translateOutPut',
  props:[
    "translatedTxt"
  ]

}
</script>

<style scoped>
  #translateoutput {
    color: black;
    font-size: 20px;
  }
</style>
