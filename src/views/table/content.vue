<template>
  <transition name="dialog-fade">
    <el-dialog
      v-if="showDialog"
      :title="dialogTitle"
      class="dialog-component"
      :visible.sync="showDialog"
      width="600px"
      @close="closeDialog(0)"
    >
      <el-form ref="formInfo" :rules="rules" :model="formInfo" class="demo-form-inline" label-width="150px">
        <el-form-item label="视频标题：" prop="title" required>
          <el-input v-model="formInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="视频链接：" prop="url" required>
          <el-input v-model="formInfo.url"></el-input>
          <!-- <el-button @click="addDomain">连续剧添加多个url</el-button> -->
        </el-form-item>
        <!-- <el-form-item
        v-for="(url, index) in urls"
        :label="'url' + index+1"
        :key="url.key"
        prop="urls_prop"
      >
    <el-input v-model="url.val" @change="urlsChanged"></el-input><el-button @click.prevent="removeDomain(url)">删除</el-button>
  </el-form-item> -->
        <el-form-item label="描述：" prop="desc" required>
          <el-input v-model="formInfo.desc"></el-input>
        </el-form-item>
      <el-form-item label="视频的缩略图链接：" prop="theme_url" >
        <el-input v-model="formInfo.theme_url"></el-input>
      </el-form-item>
      <el-form-item label="视频的作者：" prop="actor" >
        <el-input v-model="formInfo.actor"></el-input>
      </el-form-item>
      <el-form-item label="视频的评分：" prop="actor" >
        <el-input v-model="formInfo.rate"></el-input>
      </el-form-item>
      <el-form-item label="视频的年份：" prop="actor" >
        <el-input v-model.number="formInfo.years"></el-input>
      </el-form-item>
      <el-form-item  label="视频的类型：" prop="types" >
        <el-select multiple collapse-tags v-model="types" placeholder="例如动作，剧情" @change="test">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.title"
              :value="item.title"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item  label="视频的主分类：" prop="menu"  >
        <el-select v-model="formInfo.menu_title" placeholder="例如电视剧，电影"  @change="changedMenu">
            <el-option
              v-for="item in menus"
              :key="item.id"
              :label="item.title"
              :value="item"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item  label="视频的子分类：" prop="category"  >
        <el-select v-model="category" placeholder="例如电视剧，电影"  @change="selectedCategory">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.title"
              :value="item"
            ></el-option>
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
import { addBillboard,updateBillboard,getMuneList,getCategoryMuneList } from '@/api/table'
import { getTypes } from '@/api/table'

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
      menus:null,
      categories:null,
      types:[],
      urls:[],
      url:'',
      category:"",
      showDialog: false,
      formInfo: JSON.parse(JSON.stringify(this.itemInfo))
    };
  },
  mounted() {
    this.getMenu();
    this.getOpt();
    this.parserSelect();
  },
  methods: {
    parserSelect(){
      console.log(this.formInfo.types )
    },
    test(val){
      console.log("change types --->>",val)
      this.formInfo.types = this.types.join(",")
    },
    changedMenu(val){
      console.log("changed menu -->>",val)
      this.formInfo.menu_title = val.title
      this.getMenuCategory(val.id)
    },
    selectedCategory(val){
      console.log("changed category menu -->>",val)
      this.category = val.title
      this.formInfo.category_id = val.id
    },
    urlsChanged(val){
      console.log("input value--->",val)
      this.urls.push({
          value: val,
          key: Date.now()
        });
        console.log("input value--->",this.urls)
        this.formInfo.urls.push(val.value)
    },
    addDomain(url) {
        this.urls.push({
          value: url,
          key: Date.now()
        });
      },
      removeDomain(item) {
        var index = this.urls.indexOf(item)
        if (index !== -1) {
          this.urls.splice(index, 1)
        }
      },
    //   获取下拉框
    getOpt() {
      getTypes().then(resp=>{
        this.options = resp.data
        console.log(this.options)
      })
    },
    getMenu(){
      getMuneList().then(resp=>{
        if(resp.data == []){
          this.menus = []
        }else{
          this.menus = resp.data
        }
        console.log(this.menus)
      })
    },
    getMenuCategory(id){
      getCategoryMuneList(id).then(resp=>{
        if(resp.data == []){
          this.categories = []
        }else{
          this.categories = resp.data
        }
        console.log(this.menus)
      })
    },
    // 保存操作
    submitForm(formName) {
      const that = this;
      console.log("submit-->>>>",JSON.stringify(this.formInfo))
      this.formInfo.urls.unshift(this.formInfo.url)
      console.log("urls -->>",this.urls)
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
