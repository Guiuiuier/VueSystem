<template>
  <div>
     <div class="siderMain">
           <div class="sider">d</div>
     </div>
  </div>
</template>
<style scoped lang="less">
@import '/public/sider.less';
               .siderMain{
         width: 210px!important;
         top:0;
         bottom: 0;
         z-index: 999;
         overflow: hidden;
         left: 0;
         margin:0;
         padding:0;
         position: fixed;
        //  background: black;
          .sider{
              position: relative;
              height: 100%;
              overflow: hidden;
              left:0;
              margin: 0;
              padding:0;
              background:#304166;
              max-width: 220px;
            height:100% ;
          }
     }
</style>
<script>
export default {
    
}
</script>