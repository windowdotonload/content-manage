<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 顶部搜索栏 -->
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input clearable @clear="clear" v-model="queryInfo.query" placeholder="请输入内容">
            <el-button @click="getGoodsList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table border stripe :data="goodsList" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="750"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="goods_number" label="商品数量"></el-table-column>
        <el-table-column prop="upd_time" label="创建时间" width="200">
          <template slot-scope="scope">{{scope.row.upd_time | dataFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteGoods(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
      goodsList: [],
      total: 0
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      let { data: res } = await this.$http.get("goods", {
        params: this.queryInfo
      });
      if (res.meta.status != 200)
        return this.$message.error("获取商品列表失败");
      this.$message.success("获取商品列表成功");
      this.goodsList = res.data.goods;
      this.total = res.data.total;
    },
    async deleteGoods(row) {
      console.log(row);
      let { data: res } = await this.$http.delete(`goods/${row.goods_id}`);
      if (res.meta.status != 200) return this.$message.error("删除商品失败");
      this.getGoodsList();
    },
    handleSizeChange(pageSize){
        this.queryInfo.pagesize = pageSize
        this.getGoodsList()
    },
    handleCurrentChange(pageNum){
        this.queryInfo.pagenum = pageNum
        this.getGoodsList()
    },
    clear(){
        this.getGoodsList()
    },
    addGoods(){
        this.$router.push('/goods/add')
    }
  }
};
</script>

<style scoped>
</style>