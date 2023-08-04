<template>
  <transition name="dialog-fade">
    <el-dialog
      v-if="showDialog"
      :title="dialogTitle"
      class="dialog-component"
      :visible.sync="showDialog"
      width="500px"
      @close="closeDialog(0)"
    >
      <el-form ref="formInfo" :rules="rules" :model="formInfo" class="demo-form-inline" label-width="100px">
        <el-form-item label="视频标题：" prop="title" required>
          <el-input v-model="formInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="视频链接：" prop="url" required>
          <el-input v-model="formInfo.url"></el-input>

          <!-- <el-select v-model="formInfo.index" placeholder="请选择分类"> -->
            <!-- <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.classifyType"
              :value="item.id"
            ></el-option> -->
          <!-- </el-select> -->
        </el-form-item>
        <el-form-item label="描述：" prop="desc" required>
          <el-input v-model="formInfo.desc"></el-input>

          <!-- <el-input type="number" v-model.number="formInfo.desc" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input> -->
        </el-form-item>
      <el-form-item label="视频的缩略图链接：" prop="theme_url" >
        <el-input v-model="formInfo.theme_url"></el-input>
      </el-form-item>
      <el-form-item label="视频的作者：" prop="author" >
        <el-input v-model="formInfo.author"></el-input>
      </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="submitForm('formInfo')">确定</el-button>
          <el-button @click="closeDialog(0)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </transition>
</template>
 
<script>
import { addBillboard,updateBillboard } from '@/api/table'

export default {
  name: "DialogComponent",
  props: {
    dialogTitle: {
      type: String,
      default: "添加新数据"
    },
    itemInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      rules:{
           title: [
            { required: true, message: '请输入资产名称', trigger: 'change' }
          ],
          index: [
            { required: true, message: '请选择资产分类', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请输入资产数量', trigger: 'change' }
          ],
      },
      options:[],
      showDialog: false,
      formInfo: JSON.parse(JSON.stringify(this.itemInfo))
    };
  },
  mounted() {
    this.getOpt();
  },
  methods: {
    //   获取下拉框
    getOpt() {
      // this.getRequest("/asset/getTypeList", {}).then(res => {
      //   this.options=res.obj
      // });
    },
    // 保存操作
    submitForm(formName) {
      const that = this;
      console.log("submit-->>>>",JSON.stringify(this.formInfo))
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formInfo.is_add == true){
            addBillboard(this.formInfo).then(response => {
              this.list = response.data
              this.listLoading = false
              that.$message({
                      message: "操作成功！",
                      type: "success"
                  });
                  that.closeDialog(1);
            })
        }else {
          console.log("update")
          updateBillboard(this.formInfo).then(response => {
              this.list = response.data
              this.listLoading = false
              that.$message({
                      message: "操作成功！",
                      type: "success"
                  });
                  that.closeDialog(1);
            })
        }
          // 走保存请求
        } else {
          return false;
        }
      });
    },
    // 关闭弹框
    closeDialog(flag) {
      this.$refs["formInfo"].resetFields();
      this.showDialog = false;
      this.$emit("closeDialog", flag);
    }
  }
};
</script>
 
<style scoped lang="scss">
.dialog-fade-enter-active {
  -webkit-animation: dialog-fade-in 0.3s;
  animation: dialog-fade-in 0.3s;
}
.dialog-fade-leave-active {
  -webkit-animation: dialog-fade-out 0.3s;
  animation: dialog-fade-out 0.3s;
}
@-webkit-keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes dialog-fade-in {
  0% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@-webkit-keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
@keyframes dialog-fade-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
