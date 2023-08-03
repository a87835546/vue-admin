<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item label="index">
        <el-input v-model.number="form.index" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { modifyConfig } from '@/api/app'

export default {
  data() {
    return {
      form: {
        title:'',
        desc: '',
        index:0,
      }
    }
  },
  methods: {
    onSubmit() {
      // this.$message('submit!')
      this.listLoading = true
      console.log("add app tabbar "+JSON.stringify(this.form))
      modifyConfig(this.form).then(response => {
        this.list = response.data
        this.listLoading = false
        this.$message({message:"添加成功",type:'successful'})
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

