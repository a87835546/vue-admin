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
        <el-form-item label="视频链接：" prop="video_url" required>
          <el-input v-model="formInfo.video_url"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="desc" required>
          <el-input v-model="formInfo.desc"></el-input>
        </el-form-item>
      <el-form-item label="视频的缩略图链接：" prop="theme_url" >
        <el-input v-model="formInfo.video_theme_url"></el-input>
      </el-form-item>
      <el-form-item label="视频标题英语：" prop="actor" >
        <el-input v-model="formInfo.titile_en"></el-input>
      </el-form-item>
      <el-form-item label="所属目录：" prop="menu_id" required>
          <el-select v-model="selectedOption" collapse-tags @change="selected">
        <el-option v-for="option in options" :key="option.id" :label="option.title" :value="option.id"></el-option>
        </el-select>
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
import { addBanner,updateBanner,getMuneList } from '@/api/table'

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
      selectedOption:0,
      showDialog: false,
      formInfo: JSON.parse(JSON.stringify(this.itemInfo))
    };
  },
  mounted() {
    this.getMuneList();
    this.getOpt();
    this.parserSelect();
  },
  methods: {
    getMuneList(){
      getMuneList().then(resp=>{
        this.options = resp.data
        console.log(this.options)
      })
    },
    selected(val){
      this.selectedOption = val
      this.formInfo.menu_id = val
      console.log("catagory selected value"+val)
    },
    parserSelect(){
      console.log(this.formInfo.types )
      this.formInfo.types.trim()
      this.types= this.formInfo.types.split(",")
      delete this.types[0]
      console.log(this.types)
    },
    test(){
      console.log(this.types)
      this.formInfo.types = this.types.join(",")
      console.log(this.formInfo.types )
    },
    //   获取下拉框
    getOpt() {
      getCategories().then(resp=>{
        this.options = resp.data
        console.log(this.options)
      })
    },
    // 保存操作
    submitForm(formName) {
      const that = this;
      console.log("submit-->>>>",JSON.stringify(this.formInfo))
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formInfo.is_add == true){
            addBanner(this.formInfo).then(response => {
              this.list = response.data
              this.listLoading = false
              that.$message({
                      message: "操作成功！",
                      type: "success"
                  });
                  that.closeDialog(1);
            })
        }else {
          updateBanner(this.formInfo).then(response => {
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
