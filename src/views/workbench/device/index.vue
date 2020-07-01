<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">查询搜索</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="设备ID/设备名/地址/描述"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        size="mini"
        class="btn-add"
        @click="handleAdd()"
        style="margin-left: 20px"
        type="primary"
      >添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="deviceTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="设备号" width="150" align="center">
          <template slot-scope="scope">{{scope.row.deviceId}}</template>
        </el-table-column>
        <el-table-column label="设备名" width="200" align="center">
          <template slot-scope="scope">{{scope.row.deviceName}}</template>
        </el-table-column>
        <el-table-column label="经度" width="140" align="center">
          <template slot-scope="scope">{{scope.row.longitude}}</template>
        </el-table-column>
        <el-table-column label="纬度" width="140" align="center">
          <template slot-scope="scope">{{scope.row.latitude}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="修改时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.updateTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="描述" width="200" align="center">
          <template slot-scope="scope">{{scope.row.deviceDesc}}</template>
        </el-table-column>
        <el-table-column label="地址" width="200" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="版本号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.softVersion}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              title="编辑"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleUpdate(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              title="删除"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" width="40%">
      <el-form :model="temp" ref="dataForm" :rules="rules" label-width="150px" size="small">
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-model="temp.deviceId" />
        </el-form-item>
        <el-form-item label="设备名" prop="deviceName">
          <el-input v-model="temp.deviceName" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="temp.longitude" />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="temp.latitude" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="temp.deviceDesc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getList, addDevice, updateDevice, deleteDevice } from "@/api/device";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};
const defaultTemp = {};
export default {
  name: "deviceList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      dialogStatus: "",
      temp: {},
      textMap: {
        update: "编辑设备",
        create: "创建设备",
        version: "升级设备"
      },
      rules: {
        deviceId: [
          { required: true, message: "设备ID必须填写", trigger: "change" }
        ],
        deviceName: [
          { required: true, message: "设备名称必须填写", trigger: "change" }
        ],
        longitude: [
          { required: true, message: "设备纬度必须填写", trigger: "change" }
        ],
        latitude: [
          { required: true, message: "设备经度必须填写", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogStatus = "create";
      this.temp = Object.assign({}, defaultTemp);
    },

    handleDelete(index, row) {
      this.$confirm("是否要删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteDevice(row.id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.dialogStatus = "update";
      this.temp = Object.assign({}, row);
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          addDevice(this.temp).then(() => {
            this.getList();
            this.dialogVisible = false;
            this.$message({
              message: "添加成功！",
              type: "success"
            });
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          updateDevice(this.temp.id, this.temp).then(() => {
            this.getList();
            this.dialogVisible = false;
            this.$message({
              message: "添加成功！",
              type: "success"
            });
          });
        }
      });
    },
    getList() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    }
  }
};
</script>
<style></style>