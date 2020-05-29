<template>
  <div class="manage-content">
    <el-container class="big-continer">
      <!-- 头部 -->
      <el-header class="header">
        <h2>后台管理系统</h2>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 主体 -->
      <el-container class="continer">
        <!-- 左侧菜单选项 -->
        <el-aside class="aside" :width="istoggle ? '60px' : '200px' ">
          <!-- 伸缩菜单按钮 -->
          <div @click="toggle" class="toggle">|||</div>
          <!-- 一级菜单选项 -->
          <el-menu
            :default-active="active"
            :collapse-transition="false"
            :collapse="istoggle"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            background-color="#636e72"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <!-- 一级菜单内容 -->
            <el-submenu :index="String(item.id)" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i class="iconlogo" :class="iconlogo[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级子菜单选项 -->
              <el-menu-item
                @click="state('/'+item1.path)"
                :index="'/'+item1.path"
                v-for="item1 in item.children"
                :key="item1.id"
                v-if="item1.authName != '分类参数'"
              >{{item1.authName}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容部分 -->
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconlogo: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-quanxian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-order",
        "145": "iconfont icon-data"
      },
      istoggle: false,
      active: ""
    };
  },
  created() {
    this.getMenuList();
    this.active = window.sessionStorage.getItem("active");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status != 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
    },
    toggle() {
      this.istoggle = !this.istoggle;
    },
    state(path) {
      window.sessionStorage.setItem("active", path);
    }
  }
};
</script>

<style scoped>
.manage-content {
  height: 100%;
}
.big-continer {
  height: 100%;
}
.header {
  font-size: 26px;
  color: #dfe6e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #34495e;
}
.continer {
  width: 100%;
  margin: 0;
}
.aside {
  background: #636e72;
}
.main {
  border: 1px solid black;
}
.iconlogo {
  margin: 0 10px;
}
.toggle {
  height: 23px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  background: #95a5a6;
}
</style>