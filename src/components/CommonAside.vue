// 这是侧边栏内容
<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c6b" text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false">
      <h3>{{isCollapse ?  '后台' : '哪都通后台管理系统'}}</h3>
      <!-- <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item> -->
      <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path" @click="clickMenu(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.ladel }}</span>
        </template>
              <el-menu-item-group v-for="(subItem, subIndex) in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subIndex" >{{subItem.label}}</el-menu-item>
              </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 720px;
  }
  .el-menu{
    height: 720px;
    border: none;
    h3{
      color: #fff;
      text-align:center;
      line-height: 48px;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        menu: []
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item) {
      // console.log(item);
        this.$router.push({
          name: item.name
        })
        this.$store.commit('selectMenu', item)
    }
    },
    computed: {
      noChildren() {
       return this.asyncMenu.filter( item => !item.children )
      },
     hasChildren() {
        return this.asyncMenu.filter( item => item.children)
      },
      isCollapse() {
        return this.$store.state.tab.isCollapse
      },
      asyncMenu() {
        return this.$store.state.tab.menu
      }
    }
  }
</script>