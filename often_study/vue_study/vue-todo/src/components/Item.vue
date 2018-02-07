<template>
  <div :class="['todo-item',todo.completed ? 'completed': '']">
    <input 
    type="checkbox"
    class="toggle"
    v-model="todo.completed"
    />
    <label> {{todo.content}}</label>
    <button class="destory" v-on:click="deletTodo"></button>
  </div>
</template>

<script>

export default {
  name: 'Item',
  props: {
    todo:{
      type:Object,
      required:true,
    }

  },
  methods: {
    deletTodo() {
      this.$emit('del',this.todo.id)
    }
  }
}
</script>

<style scoped>
  .todo-item {
    position:relative;
    background:#ffffff;
    font-size: 24px;
    border-bottom: 1px solid rgba(0,0,0,.06);
  }
  .todo-item .hover .delete:after{
    content: 'x'
  }
  
  label {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition :color 0.4s;
  }
  label .completed {
    color:#d9d9d9;
    text-decoration: line-through;
  }
    
  .toggle {
    text-align: center; 
    width: 400px;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0 ;
    border: none; 
    outline: none ;
    appearance: none;
  }
  .destory {
    position: absolute;
    top: 50%;
    right: 10px;
  }
</style>
