<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6"><el-button type="primary" size="small" @click="addItem">新加</el-button></el-col>
      <el-col :span="6"> <el-input v-model="title" label="搜索"></el-input></el-col>
      <el-col :span="6"><el-button type="primary" size="small" @click="search">标题搜索</el-button></el-col>
    </el-row>

    <el-table
    :data="categories"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'index'}">
    <el-table-column
      prop="id"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="index"
      label="地址">
    </el-table-column>
    <el-table-column label="操作" width="150">
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
import { getCategories,getSubCategories } from '@/api/table'

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
      categories:[],
      subcategories:[],

        tableData1: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    
  },
  created() {
    this.getCategory()
  },
  methods: {
    fetchData() {
      this.getCategory();
    },
    getCategory(){
      getCategories().then(resp=>{
        this.categories = resp.data
        this.categories.forEach((e,index) => {
          if(e.super_id>0){
            e.hasChildren= true
            this.categories[index] = e
          }
        });
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
          url: '',
          theme_url:'',
          id:0,
          desc:"",
          category:"",
          actor:"",
          types:"",
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