<template>
  <div class="common-table">
    <!-- 这是表格内容 -->
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column 
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
          
      </el-table-column>
    </el-table>
    <!-- 这是底部的分页内容 -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="localConfig.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>

  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  data() {
    return {
      localConfig: this.config 
    }
  },
  props: {
        tableData: Array,
        tableLabel: Array,
        config: Object
  },
  methods: {
    handleDelete(row) {
      this.$emit('del', row)
    },
    handleEdit(row) {
      this.$emit('edit', row)
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="less" scoped>
.common-table{
  height: 500px;
  background-color: #fff;
  position: relative;
  .pager{
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>