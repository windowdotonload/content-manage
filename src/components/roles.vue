<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary">添加角色</el-button>

      <el-table border :data="roleList" style="width: 100%">
        <!-- 展开列展示角色权限列表 -->
        <el-table-column type="expand" width="50">
          <template slot-scope="scope">
            <el-row
              :class="['border-bottom',`border-top:i1===0`]"
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
              class="verticalCenter"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRights(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  :class="['border-bottom',`border-top:i2===0`]"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                  class="verticalCenter"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="removeRights(scope.row,item2.id)"
                    >{{item2.authName}}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      @close="removeRights(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              size="mini"
              @click="showRightsDialog(scope.row)"
              type="warning"
              icon="el-icon-setting"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-tree
        node-key="id"
        :default-checked-keys="defKeys"
        show-checkbox
        default-expand-all
        :data="rightsTree"
        :props="treeProps"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allocation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      dialogVisible: false,
      rightsTree: [],
      treeProps: {
        children: "children",
        label: "authName"
      },
      // 默认权限数组
      defKeys: [],
      // 传入要设置权限目标的id
      rowId: ""
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      let { data: res } = await this.$http.get("roles");
      if (res.meta.status != 200)
        return this.$message.error("获取角色列表失败");
      this.roleList = res.data;
    },
    //根据ID删除相应的权限
    async removeRights(row, rightsid) {
      let confirm = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirm != "confirm") return this.$message.info("取消了该操作");
      let { data: res } = await this.$http.delete(
        `roles/${row.id}/rights/${rightsid}`
      );
      if (res.meta.status != 200) return this.$message.error("删除权限失败");
      // 直接可显示用户权限的变化而不必刷新
      row.children = res.data;
    },
    // 展示所有权限列表，权限树
    async showRightsDialog(row) {
      let { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status != 200)
        return this.$message.error("获取权限列表失败");
      this.rightsTree = res.data;
      this.defKeys = [];
      this.getDefRights(row, this.defKeys);
      this.rowId = row.id;
      this.dialogVisible = true;
    },
    // 递归获取三级节点的权限
    getDefRights(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(item => {
        this.getDefRights(item, arr);
      });
    },
    async allocation() {
      let keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      var str = keys.join(",");
      let { data: res } = await this.$http.post(`roles/${this.rowId}/rights`, {
        rids: str
      });
      if (res.meta.status != 200) return this.$message.error("分配权限失败");
      this.$message.success("分配权限成功");
      this.getRoleList();
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
</style>