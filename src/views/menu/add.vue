<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="TitleEN">
        <el-input v-model="form.title_en" />
      </el-form-item>
      <el-form-item label="Desc">
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item label="Role">
        <el-input v-model="form.role" />
      </el-form-item>
      <el-form-item label="Position">
        <el-input v-model="form.position" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="选择状态">
          <el-option label="启用" :value=1 />
          <el-option label="关闭" :value=2 />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addMune } from '@/api/table'

export default {
  data() {
    return {
      form: {
        position: 1,
        role: 1,
        title:'',
        desc: '',
        status:0,
      }
    }
  },
  methods: {
    onSubmit() {
      // this.$message('submit!')
      this.listLoading = true

      addMune(this.form).then(response => {
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

