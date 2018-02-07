<template>
  <div id="app"> 
    <!-- <input type="text" /> -->
    <Header></Header>
    <Footer></Footer>
    <todo></todo>
  </div>
 
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Todo from './components/Todo'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Header,
    Footer,
    Todo,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
