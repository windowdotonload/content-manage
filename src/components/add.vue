<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="添加商品信息" center :closable="false" type="info" show-icon></el-alert>
      <el-steps
        class="top"
        align-center
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 添加商品表单 -->
      <el-form
        label-position="top"
        :model="addGoodsForm"
        :rules="addGoodsRules"
        ref="addGoodsForm"
        label-width="100px"
      >
        <el-tabs
          @tab-click="clickChange"
          :before-leave="changeTab"
          v-model="activeIndex"
          :tab-position="'left'"
        >
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods">
              <el-input clearable v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods">
              <el-input clearable type="number" v-model="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods">
              <el-input clearable type="number" v-model="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods">
              <el-input clearable type="number" v-model="addGoodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods">
              <el-cascader
                clearable
                :props="goodsProps"
                v-model="addGoodsForm.goods_cat"
                :options="cateList"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item :label="item.attr_name" v-for="item in TabCatList" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox border v-for="(item1,i) in item.attr_vals" :key="i" :label="item1"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item :label="item.attr_name" v-for="item in onlyGoodsList" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <quill-editor class="ql-editor" v-model="addGoodsForm.goods_introduce" />
            <el-button type="primary" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "0",
      addGoodsForm: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        // 商品所属的分类列表的id级联选择器的双向绑定
        goods_cat: [],
        goods_introduce: ""
      },
      addGoodsRules: {
        goods: [{ required: true, message: "请输入数据", trigger: "blur" }]
      },
      cateList: [],
      goodsProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态商品参数
      TabCatList: [],
      // 静态商品属性
      onlyGoodsList: []
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.$http.get("categories", {
        params: { type: 3 }
      });
      this.cateList = res.data;
    },
    // 不选择第一步的商品分类不能切换到下一不，使用的是el-tab切换标签钩子
    changeTab(newVal, oldVal) {
      if (oldVal === "0" && this.addGoodsForm.goods_cat.length != 3) {
        this.$message.error("请选择商品分类");
        return false;
      }
    },
    // tab-click事件在切换时根据索引请求数据
    async clickChange() {
      // 请求动态参数面板
      if (this.activeIndex === "1") {
        let { data: res } = await this.$http.get(
          `categories/${this.catid}/attributes`,
          {
            params: { sel: "many" }
          }
        );
        res.data.forEach(item => {
          item.attr_vals =
            item.attr_vals.length == 0 ? [] : item.attr_vals.split(" ");
        });
        this.TabCatList = res.data;
      } else if (this.activeIndex === "2") {
        let { data: res } = await this.$http.get(
          `categories/${this.catid}/attributes`,
          {
            params: { sel: "only" }
          }
        );
        this.onlyGoodsList = res.data;
        console.log(this.onlyGoodsList);
      }
    },
    addGoods() {
      this.$refs.addGoodsForm.validate(val => {
        if (!val) return this.$message.error("请填写必要的表单项");
        this.$message.success('添加商品成功')
      });
    }
  },
  computed: {
    catid() {
      if (this.addGoodsForm.goods_cat.length != 0) {
        return this.addGoodsForm.goods_cat[2];
      } else {
        return null;
      }
    }
  }
};
</script>

<style scoped>
.top {
  margin-top: 20px;
  margin-left: 200px;
}
.el-tabs {
  margin-top: 30px;
}
.el-checkbox {
  margin: 0 10px !important;
}
</style>