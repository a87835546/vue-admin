<template>
    <div class="dialog-demo">
      <el-button type="primary" size="small" @click="addItem">新加</el-button>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 80%; margin-top: 20px;"
        border
      fit
      highlight-current-row
      >
        <el-table-column prop="title" label="电影分类名称"></el-table-column>
        <el-table-column prop="title_en" label="电影分类名称en"> </el-table-column>
        <el-table-column prop="index" label="排序索引"> </el-table-column>
        <el-table-column prop="super_title" label="所属分类"> </el-table-column>
        <el-table-column prop="desc" label="描述"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click.native.prevent="editRow(scope.row,0)">
              编辑
            </el-button>
              <el-button type="danger" size="small" @click.native.prevent="editRow(scope.row,1)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
       <!-- <page-ination :totalCount="totalCount" :queryParam="queryParam" @getList="fetchData"></page-ination> -->
   
      <!--弹框组件开始-----------------------start-->
      <dialog-component
        v-if="showDialog"
        ref="dialogComponent"
        :dialog-title="dialogTitle"
        :item-info="tableItem"
        @closeDialog="closeDialog"
      ></dialog-component>
      <!--弹框组件开始-----------------------end-->
    </div>
  </template>
   
  <script>
  import DialogComponent from "./content.vue";
  import { configTabbarList,deletetype } from '@/api/app'

  export default {
    name: "DialogDemo",
    components: { DialogComponent },
    data() {
      return {
        totalCount:0,
        queryParam: {
          pageNo: 1,
          pageSize: 10
        },
        tableLoading: false,
        showDialog: false,
        dialogTitle: "添加新数据",
        showCategory:false,
        tableData: [],
        tableItem: {
          title:'',
          desc: "",
          index:'',
          id:'',
          super_title:'',
        
        },
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
      this.listLoading = true
      configTabbarList().then(response => {
        console.log(response)
        this.tableData = response.data
        this.listLoading = false
      })
      this.tableLoading=false

    },

      // 添加操作
      addItem() {
        this.tableItem = {
          assetName:'',
          assetClassifyId: '',
          assetCount:''
        };
        this.dialogTitle = "添加新数据";
        this.showDialog = true;
        this.$nextTick(() => {
          this.$refs["dialogComponent"].showDialog = true;
        });
      },
      // 编辑操作
      editRow(row,state) {
        if(state==0){
          row.isDel=0
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
             this.postRequest("/asset/setAsset", this.tableItem).then(res => {
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
      // // 删除操作
      // delRow(row){
  
      // },
      // 关闭操作
      closeDialog(flag) {
        if (flag) {
          // 重新刷新表格内容
          this.fetchData();
        }
        this.showDialog = false;
      },
    },
  };
  </script>
   
  <style scoped lang="scss">
  .dialog-demo {
    padding: 20px;
    .instructions {
      font-size: 14px;
      padding: 10px 0;
      color: #304455;
    }
    .desc-list {
      padding: 10px 0 30px 40px;
      line-height: 30px;
      font-size: 14px;
      color: #606266;
      list-style-type: disc;
    }
  }
  </style>