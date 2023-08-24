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
        <el-form-item label="明星名字：" prop="name" required>
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="视明星英语名字：" prop="name_en" required>
          <el-input v-model="formInfo.name_en"></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述：" prop="desc" required>
          <el-input v-model="formInfo.desc"></el-input>
        </el-form-item> -->
      <el-form-item label="明星头像：" prop="avatar_url" >
        <el-input v-model="formInfo.avatar_url"></el-input>
      </el-form-item>
      <!-- <el-form-item label="视频的作者：" prop="actor" >
        <el-input v-model="formInfo.actor"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="视频的评分：" prop="actor" >
        <el-input v-model="formInfo.rate"></el-input>
      </el-form-item>
      <el-form-item label="视频的年份：" prop="actor" >
        <el-input v-model.number="formInfo.years"></el-input>
      </el-form-item>
      <el-form-item  label="视频的类型：" prop="types" >
        <el-select multiple collapse-tags v-model="types" placeholder="请选择分类" @change="test">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.classifyType"
              :value="item.title"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item  label="视频的分类：" prop="category" >
        <el-select v-model="formInfo.category_id" placeholder="请选择分类">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.classifyType"
              :value="item.title"
            ></el-option>
          </el-select>
      </el-form-item> -->
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="submitForm('formInfo')">确定</el-button>
          <el-button @click="closeDialog(0)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </transition>
</template>
 
<script>
import { addActor,updateActor } from '@/api/superstar'

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
      categories:[],
      types:[],
      category:"",
      showDialog: false,
      formInfo: JSON.parse(JSON.stringify(this.itemInfo))
    };
  },
  mounted() {
  },
  methods: {
 
    // 保存操作
    submitForm(formName) {
      const that = this;
      console.log("submit-->>>>",JSON.stringify(this.formInfo))
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formInfo.is_add == true){
            addActor(this.formInfo).then(response => {
              this.list = response.data
              this.listLoading = false
              that.$message({
                      message: "操作成功！",
                      type: "success"
                  });
                  that.closeDialog(1);
            })
        }else {
          updateActor(this.formInfo).then(response => {
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
