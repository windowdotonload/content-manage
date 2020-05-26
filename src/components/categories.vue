<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="showDialog">添加分类</el-button>
      <zk-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        border
      >
        <!-- 自定义是否有效模板插槽 -->
        <template slot="state" slot-scope="scope">
          <i style="color:lightgreen" v-if="scope.row.cat_deleted" class="el-icon-success"></i>
          <i style="color:lightgreen" v-else class="el-icon-error"></i>
        </template>order
        <!-- 自定义排序插槽 -->
        <template slot="order" slot-scope="scopeorder">
          <el-tag v-if="scopeorder.row.cat_level === 0">level 1</el-tag>
          <el-tag v-if="scopeorder.row.cat_level === 1" type="success">level 2</el-tag>
          <el-tag v-if="scopeorder.row.cat_level === 2" type="danger">level 3</el-tag>
        </template>
        <!-- 自定义操作插槽 -->
        <template slot="opt" slot-scope="scopeopt">
          <el-button type="primary" size="medium ">编辑</el-button>
          <el-button type="danger" size="medium " @click="deleteCat(scopeopt.row)">删除</el-button>
        </template>
      </zk-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 添加分类对话框 -->
      <el-dialog @close="catClose" title="添加分类" :visible.sync="catVisible">
        <el-form :model="catForm" :rules="catRules" ref="catForm" label-width="100px">
          <el-form-item label="分类名称：" prop="cat_name">
            <el-input v-model="catForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类：">
            <el-cascader
              clearable
              style="width:100%"
              v-model="catValue"
              :options="twoCateList"
              :props="catProps"
              @change="catChange"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="catVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCat">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询分类数据的参数
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      cateList: [],
      total: 0,
      columns: [
        { label: "分类名称", prop: "cat_name" },
        // 使用自定以模板列state
        { label: "是否有效", type: "template", template: "state" },
        { label: "排序", type: "template", template: "order" },
        { label: "操作", type: "template", template: "opt" }
      ],
      catVisible: false,
      //添加分类时表单双向绑定的数据对象
      catForm: {
        // 分类父id
        cat_pid: 0,
        cat_name: "",
        cat_level: 0
      },
      catRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      twoCateList: [],
      catValue: [],
      catProps: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      }
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.$http.get("categories", {
        params: this.queryInfo
      });
      this.cateList = res.data.result;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCateList();
    },
    showDialog() {
      this.getCateTwo();
      this.catVisible = true;
    },
    async getCateTwo() {
      let { data: res } = await this.$http.get("categories", {
        params: { type: 2 }
      });
      this.twoCateList = res.data;
    },
    // 设置分类名称的父级名称
    catChange() {
      if (this.catValue.length > 0) {
        this.catForm.cat_pid = this.catValue[this.catValue.length - 1];
        this.catForm.cat_level = this.catValue.length;
      } else {
        this.catForm.cat_pid = 0;
        this.catForm.cat_level = 0;
      }
    },
    // 添加分类确定按钮
    addCat() {
      this.$refs.catForm.validate(async val => {
        if (!val) return;
        let { data: res } = await this.$http.post("categories", this.catForm);
        console.log(res);
        this.$message.success("添加分类成功");
        this.getCateList();
        this.catVisible = false;
      });
    },
    // 添加分类对话框关闭监听事件
    catClose() {
      this.$refs.catForm.resetFields();
      this.catForm.cat_level = 0;
      this.catForm.cat_pid = 0;
      this.catValue = [];
    },
    async deleteCat(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`categories/${row.cat_id}`);
          this.getCateList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.zk-table {
  margin-top: 10px;
}
</style>