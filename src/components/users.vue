<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索栏 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 实现搜索框搜索功能 -->
          <el-input
            clearable
            @clear="getUserList"
            v-model="queryInfo.query"
            placeholder="请输入内容"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表展示 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              @change="userStateChange(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="slotUsers">
            <!-- 修改用户按钮 -->
            <el-button type="primary" icon="el-icon-edit" circle @click="editUser(slotUsers)"></el-button>
            <!-- 删除用户按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteUsers(slotUsers.row.id)"
            ></el-button>
            <!-- 用户状态按钮 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 添加用户对话框 -->
      <el-dialog @close="closeDia" title="提示" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="addForm"
          :rules="addRules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input clearable v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input clearable v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input clearable v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input clearable v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户对话框 -->
      <el-dialog @close="eidtClose" title="修改用户" :visible.sync="editVisible" width="50%">
        <el-form
          :model="editForm"
          :rules="editRules"
          ref="editFormRef"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名">
            <el-input disabled v-model="editForm.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="eidtUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    let checkEmail = (rul, val, cal) => {
      let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (emailReg.test(val)) {
        return cal();
      }
      cal(new Error("请输入合法的邮箱"));
    };

    let checkPhone = (rul, val, cal) => {
      let phoneReg = /^[1-9]{1}[0-9]+/;
      if (phoneReg.test(val)) {
        return cal();
      }
      cal(new Error("请输入合法的手机号"));
    };
    return {
      queryInfo: {
        query: "",
        //当前的页数
        pagenum: 1,
        //每页的数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ]
      },
      editVisible: false,
      // 修改对话框的用户信息
      editForm: {},
      editRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      var { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange(size) {
      this.queryInfo.pagesize = size;
      this.getUserList();
    },
    handleCurrentChange(page) {
      this.queryInfo.pagenum = page;
      this.getUserList();
    },
    async userStateChange(userinfo) {
      let { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status != 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户状态成功");
    },
    closeDia() {
      this.$refs.ruleForm.resetFields();
    },
    // 添加新的用户
    addUser() {
      this.$refs.ruleForm.validate(async val => {
        if (!val) return;
        let { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status != 201) {
          return this.$message.error("创建用户失败");
        }
        this.$message.success("创建用户成功");
        this.dialogVisible = false;
        this.getUserList();
      });
    },
    // 将查询到的用户信息保存到editForm中供修改用户表单获取数据显示
    async editUser(slotUsers) {
      let { data: res } = await this.$http.get(`users/${slotUsers.row.id}`);
      if (res.meta.status != 200)
        return this.$message.error("用户信息查询失败");
      this.editForm = res.data;
      this.editVisible = true;
    },
    eidtClose() {
      this.$refs.editFormRef.resetFields();
    },
    // 更新用户的数据保存到后台
    eidtUserInfo() {
      this.$refs.editFormRef.validate(async val => {
        if (!val) return;
        let { data: res } = await this.$http.put(`users/${this.editForm.id}`, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        });
        if (res.meta.status != 200) {
          return this.$message.error("更新用户失败");
        }
        this.editVisible = false;
        this.getUserList();
        this.$message.success("更新用户成功");
      });
    },
    // 删除用户数据
    async deleteUsers(id) {
      //弹框询问是否删除
      let res = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定", //确认按钮的文本
          cancelButtonText: "取消", //取消按钮的文本
          type: "warning" //提示框的图标
        }
      ).catch(err => err);
      if (res != "confirm") {
        return this.$message.info("已经取消删除");
      }
      let { data: resstate } = await this.$http.delete(`users/${id}`);
      if (resstate.meta.status != 200) {
        return this.$message.error("删除用户失败");
      }
      this.$message.success("删除用户成功");
      this.getUserList();
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
.el-table {
  margin-top: 10px;
}
.el-table {
  margin-bottom: 20px;
}
</style>