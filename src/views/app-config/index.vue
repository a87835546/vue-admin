<template>
  <div class="app-container">

    <el-button type="primary" size="small" @click="addItem">添加新数据</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="index" width="95">
        <template slot-scope="scope">
          {{ scope.row.index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-form-item label="类型名称英语：" prop="title_en" required>
          <el-input v-model="formInfo.title_en"></el-input>
        </el-form-item>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center" width="60">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <dialog-component
        v-if="showDialog"
        ref="dialogComponent"
        :dialog-title="dialogTitle"
        :item-info="tableItem"
        @closeDialog="closeDialog"
      ></dialog-component>
  </div>
</template>

<script>
import { configTabbarList,deletetype } from '@/api/app'
import DialogComponent from "./content.vue";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: { DialogComponent },
  data() {
    return {
      list: null,
      listLoading: true,
      showDialog:false,
      dialogTitle: "添加数据",
      tableItem: {
          assetName:'',
          assetClassifyId: "",
          assetCount:''
        },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      configTabbarList().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    handleDelete(id,data){
      console.log('id-->>'+data.id+'data--->>'+data)
      deletetype({'id':data.id}).then(response => {
        console.log(response)
        this.fetchData()
      })
    },
    addItem(){
      this.showDialog = true
    },
    closeDialog(){
      this.showDialog = false
    }
  }
}
</script>
