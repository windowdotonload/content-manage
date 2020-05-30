<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table border stripe :data="ordersList" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status === '0'" type="danger">未发货</el-tag>
            <el-tag v-else>已发货</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">{{scope.row.update_time| dataFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle @click="showEdit"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改编辑地址对话框 -->
      <el-dialog @close="close" title="修改地址" :visible.sync="editVisible">
        <el-form
          :model="editForm"
          :rules="editRules"
          ref="editForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="详细地址" prop="adress">
            <el-input v-model="editForm.adress"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editAdress">确 定</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      ordersList: [],
      total: "",
      editVisible: false,
      editForm: {
        adress: ""
      },
      editRules: {
        adress: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      },
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      let { data: res } = await this.$http.get("orders", {
        params: this.queryInfo
      });
      this.ordersList = res.data.goods;
    },
    showEdit() {
      this.editVisible = true;
    },
    close() {
      this.$refs.editForm.resetFields();
    },
    editAdress() {
      this.$refs.editForm.validate(val => {
        if (!val) return this.$message.error("请输入详细地址");
        this.editVisible = false;
      });
    },

  }
};
</script>

<style scoped>
</style>