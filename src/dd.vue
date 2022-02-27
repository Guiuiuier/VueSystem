<template>
  <div>

  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

  }
  ,
  created() {
    axios.get('http://localhost:80/PHPapi/personnel.php').then(res=>{
      coonsole.log(res);
    })
  },
  }
</script>