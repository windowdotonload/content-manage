<template>
  <div class="manage-content">
    <el-container class="big-continer">
      <el-header class="header">后台管理系统</el-header>

      <el-container class="continer">
        <el-aside class="aside" width="200px">
          <el-col :span="12">
            <!-- 一级菜单选项 -->
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#636e72"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <!-- 一级菜单内容 -->
              <!-- el-submenu含子菜单的一级菜单 -->
              <!-- 用户管理 -->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <!-- 二级子菜单选项 -->
                <el-submenu index="1-4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>子选项</span>
                  </template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>

              <!-- 商品管理 -->

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <!-- 二级子菜单选项 -->
                <el-submenu index="1-4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>子选项</span>
                  </template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>

              <!-- 权限管理 -->

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <!-- 二级子菜单选项 -->
                <el-submenu index="1-4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>子选项</span>
                  </template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>

              <!-- 订单管理 -->

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <!-- 二级子菜单选项 -->
                <el-submenu index="1-4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>子选项</span>
                  </template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>

              <!-- 数据统计 -->

              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <!-- 二级子菜单选项 -->
                <el-submenu index="1-4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>子选项</span>
                  </template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>

              
            </el-menu>
          </el-col>
        </el-aside>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
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
  background: #34495e;
}
.aside {
  background: #636e72;
}
.main {
  border: 1px solid black;
}
</style>