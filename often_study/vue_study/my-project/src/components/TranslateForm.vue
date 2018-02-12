<template>
  <div id="translate">
    <div class="row" id="translateForm">
      <div class="col-md-6 col-md-offset-3">
        <form id="transform" class="well form-inline" v-on:submit="formSubmit">
          <input class="form-control" type="text" placeholder="输入" 
                v-model="textToTranslate">
          <select class="form-control" v-model="language">
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="ko">Korean</option>
            <!-- <option value="ja">Janpanese</option> -->
          </select>
          <input class="btn btn-primary" type="submit" value="翻译">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'translateForm',
  data() {
    return {
      textToTranslate: '',
      language: ''
    }
  },
  methods: {
    formSubmit:function (e) {
      // alert(this.textToTranslate)
      this.$emit('formSub',this.textToTranslate,this.language)
      e.preventDefault();
    }   
    },
    created: function () {
      this.language = 'en'
  }
}
</script>

<style scoped>
  #translate {
    text-align: center;
  }
</style>
