<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6"><el-button type="primary" size="small" @click="addItem">新加</el-button></el-col>
      <el-col :span="6"> <el-input v-model="title" label="搜索"></el-input></el-col>
      <el-col :span="6"><el-button type="primary" size="small" @click="search">标题搜索</el-button></el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="types"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="英语标题">
        <template slot-scope="scope">
          {{ scope.row.title_en }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column> -->
      
      
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row,0)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleEdit(scope.row,1)">删除</el-button>
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
import { getTypes,getSubCategories } from '@/api/table'
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
      listLoading: true,
      showDialog: false,
      title:null,
      types:[],
      options:[]
      }
    
  },
  created() {
    this.getTypes()
  },
  methods: {
    fetchData() {
      this.getTypes();
    },
 
    getTypes(){
      getTypes().then(resp=>{
        this.types = resp.data
        this.listLoading = false
        console.log("category--->>>",this.categories)

      })
    },
    getSubCategory(id){
      getSubCategories({'id':id}).then(resp=>{
        console.log("sub category",id)
        if(resp.data!=null){
          this.subcategories = resp.data
        }
        this.listLoading = false
        console.log("sub category--->>>",this.subcategories)

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
          title_en:'',
          author:"admin",
          is_add:true,
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
      },
      load(row, treeNode, resolve) {
        this.getSubCategory(row.id)
        console.log("id--->",this.subcategories)
        setTimeout(() => {
          resolve(this.subcategories)
        }, 1000);
      }
      
  }
}
</script>
<style scoped lang="scss">
.app-container {
  padding: 20px;
}
</style>