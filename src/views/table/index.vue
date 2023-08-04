<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6"><el-button type="primary" size="small" @click="addItem">新加</el-button></el-col>
      <el-col :span="6"> <el-input v-model="title" label="搜索"></el-input></el-col>
      <el-col :span="6"><el-button type="primary" size="small" @click="search">标题搜索</el-button></el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%; margin-top: 20px;"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Url">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
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
      <el-table-column label="封面图片" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.theme_url }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.row.status==1?"禁用":"正常" }}
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit( scope.row,0)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleEdit( scope.row,1)">删除</el-button>
      </template>
    </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="Display_time" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column> -->
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
import { getList,deleteBillboard,searchBillboardByTitle } from '@/api/table'
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
      showDialog: false,
      title:null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    handleDelete(id,data){
      console.log('id-->>'+id+'data--->>'+data)
      deleteBillboard({'id':data.id}).then(response => {
        console.log(response)
        this.fetchData()
      })
    },
          // 编辑操作
      handleEdit(row,state) {
        if(state==0){
          row.isDel=0
          row.is_add=false
          this.tableItem = row;
          this.dialogTitle = "编辑数据";
          this.showDialog = true;
          this.$nextTick(() => {
              this.$refs["dialogComponent"].showDialog = true;
          });
        }else{
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
             row.isDel=1
             this.tableItem = row;

             deleteBillboard({'id':row.id}).then(response => {
                console.log(response)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                  });
                this.fetchData()
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        }
      },
    closeDialog(flag) {
        if (flag) {
          // 重新刷新表格内容
          this.fetchData();
        }
        this.showDialog = false;
      },
      addItem() {
        
        this.tableItem = {
          title:'',
          url: '',
          theme_url:'',
          id:0,
          desc:"",
          category_id:0,
          author:"admin",
          is_add:true
        };
        this.dialogTitle = "添加新数据";
        this.showDialog = true;
        this.$nextTick(() => {
          this.$refs["dialogComponent"].showDialog = true;
        });
      },
      search(){
        searchBillboardByTitle({'title':this.title}).then(response => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '成功!'
            });
          this.fetchData()
        })
      }
  }
}
</script>
<style scoped lang="scss">
.app-container {
  padding: 20px;
}
</style>