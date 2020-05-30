<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <div id="main" style="width: 600px;height:400px;"></div></el-card> 
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    async mounted() {
        var myChart = echarts.init(document.getElementById('main'));
        let {data:res} = await this.$http.get('reports/type/1')
        console.log(res)
         myChart.setOption(res.data);
    },
};
</script>

<style scoped>
</style>