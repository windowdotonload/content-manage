<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 权限列表表格 -->
      <el-table :data="rightsList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0">level 1</el-tag>
            <el-tag type="success" v-if="scope.row.level == 1">level 2</el-tag>
            <el-tag type="danger" v-if="scope.row.level == 2">level 3</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    async getRightsList() {
      let { data: res } = await this.$http.get("rights/list");
      if (res.meta.status != 200) {
        return this.$message.error("获取权限列表失败");
      }
      this.rightsList = res.data;
    }
  }
};
</script>

<style scoped>
</style>