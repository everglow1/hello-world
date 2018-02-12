<template>
  <div id="app">
    <h1>在线翻译</h1>
    <h5 class="text-muted">简单/易用/便捷</h5>
    <TranslateForm v-on:formSub="translateTxt"></TranslateForm>
    <TranslateOutput v-text="translatedTxt"></TranslateOutput>
  </div>
</template>

<script>
import TranslateForm from './components/TranslateForm'
import TranslateOutput from './components/TranslateOutput'

export default {
  name: 'App',
  data() {
    return {
      translatedTxt: "",
      
    }
  },
  components: {
    TranslateForm,
    TranslateOutput
  },
  methods: {
    translateTxt:function (text,language) {
      // alert(text)
      this.$http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170721T082515Z.54cf3dc583f679db.f4a96182281281d8b5dfe24b4e88298e2133f219&lang='+language+'&text='+text)
      .then((response)=>{
        // console.log(response.body.text[0])
        this.translatedTxt = response.body.text[0];
      })
    }
  }
}
</script>

<style>
  #app{
    text-align: center;
  }
</style>
