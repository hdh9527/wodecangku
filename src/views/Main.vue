<template>
  <div>
    <el-container style="height: 100%"> 
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
       <el-header>
        <common-header></common-header>
        </el-header> 
        <common-tag></common-tag>
       <el-main>
        <router-view></router-view>
       </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue'
import CommonAside from '@/components/CommonAside.vue'; 
import commonTag from '@/components/commonTag.vue';
export default {
  components: {
    CommonAside,
    CommonHeader,
    commonTag
  }
}
</script>

<style>
.el-header{
  background-color: rgb(70, 129, 168);
}
.el-main{
  padding-top: 0;
}
</style>