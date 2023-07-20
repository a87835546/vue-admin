<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item label="Url">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="类别">
        <el-input v-model="form.category_id" type="number"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="选择状态">
          <el-option label="启用" :value=1 />
          <el-option label="关闭" :value=2 />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addBillboard } from '@/api/table'

export default {
  data() {
    return {
      form: {
        url: '',
        role: 1,
        title:'',
        desc: '',
        status:0,
        category_id:0
      }
    }
  },
  methods: {
    onSubmit() {
      // this.$message('submit!')
      this.listLoading = true
      addBillboard(this.form).then(response => {
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

