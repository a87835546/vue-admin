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
      class="tableBox"
    >
      <el-table-column label="标题" width="100px" height="100px">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="封面图片" align="center"  width="100px" height="100px">
        <template slot-scope="scope">
          <img :src=scope.row.theme_url style="width:100px;height:100px;"> 
        </template>
      </el-table-column>
      <el-table-column label="电影链接" width="100"  height="100px">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center"  height="100px">
        <template slot-scope="scope" class="myNote">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center"  height="100px">
        <template slot-scope="scope" class="myNote">
          {{ scope.row.actor }}
        </template>
      </el-table-column>
      <el-table-column label="电影的年份" align="center" width="60">
        <template slot-scope="scope">
          {{ scope.row.years }}
        </template>
      </el-table-column>
      <el-table-column label="电影的评分" align="center" width="60">
        <template slot-scope="scope">
          {{ scope.row.rate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" style="height:100px;">
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
    <el-pagination
    align="center"
    layout="prev, pager, next"
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="currentPage"
    :total="1000">
  </el-pagination>
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
      currentPage:1,
      pageNum:10
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.currentPage,this.pageNum).then(response => {
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
    sizeChange(val){
      console.log("size changed "+val)
    },
    currentChange(val){
      this.currentPage = val
      this.fetchData();
      console.log("current changed "+val)
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
          urls:[],
          theme_url:'',
          id:0,
          desc:"",
          category_id:0,
          actor:"",
          types:[],
          author:"admin",
          is_add:true,
          rate:"0.0",
          menu_title:""
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
.myNote{
  display:-webkit-box;
  text-overflow:ellipsis;
  overflow:hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient:vertical;
}

.tableBox {
     th {
       padding: 0 !important;
       height: 48px;
       line-height: 48px;
     }
     td {
       padding: 0 !important;
       height: 48px;
       line-height: 48px;
     }
   }

</style>