<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6"><el-button type="primary" size="small" @click="addItem">新加</el-button></el-col>
      <el-select multiple v-model="selectedOption" collapse-tags @change="selected" placeholder="选择类型">
        <el-option v-for="option in options" :key="option.id" :label="option.desc" :value="option.id"></el-option>
      </el-select>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="TitleEN">
        <template slot-scope="scope">
          {{ scope.row.title_en }}
        </template>
      </el-table-column>
      <el-table-column label="Desc">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="Role" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Position" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.position}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="图片url" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.status}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      
      
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
import { getMuneList,deleteMune,getMuneListById } from '@/api/table'
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
      title:"",
      selectedOption:[],
      options:[]
    }
  },
  created() {
    this.fetchData()
    this.load()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getMuneList().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    load(){
      getMuneListById({"id":0}).then(response => {
        console.log(response)
        this.options = response.data
        this.listLoading = false
      })
    },
    selected(val){
      var temp = []
      val.forEach(e => {
        temp.push(e)
      });
      console.log(temp)
      getMuneListById({"id":val.toString()}).then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    handleDelete(id,data){
      console.log('id-->>'+id+'data--->>'+data)
      deleteMune({'id':data.id}).then(response => {
        console.log(response)
        this.fetchData()
      })
    },
    closeDialog(flag) {
        if (flag) {
          // 重新刷新表格内容
          this.fetchData();
        }
        this.showDialog = false;
      },
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
    addItem() {
        
        this.tableItem = {
          title:'',
          role:0,
          desc:"",
          position:0,
          is_add:true,
          title_en:''
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
