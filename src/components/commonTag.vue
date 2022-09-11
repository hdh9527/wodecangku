<template>
  <div class="tabs">
    <el-tag 
    v-for="(tag, index) in tags"
    :key="tag.name"
    :closable="tag.name !== 'home' "
    size="small"
    :effect="$route.name ===  tag.name ? 'dark' : 'plain' "
    @click="changeMenu(tag)"
    @close="closeMenu(tag, index)"
    > {{ tag.label }}</el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      close:'closeTag'
    }),
    changeMenu(item) {
      this.$router.push({ name: item.name })
    },
    closeMenu(tag, index) {
      const length = this.tags.length -1
      this.close(tag)
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[ index - 1 ].name
        })
      } else {
        this.$router.push({
          name: this.tags[ index ].name
        })
      }
    }
  },
  computed: {
      ...mapState({
        tags: state => state.tab.tabsList
      })
    }
}
</script>

<style lang="less" scoped>
  .tabs{
    padding: 10px;
    .el-tag{
      margin-left: 10px ;
      cursor: pointer;
    }
  }
</style>