<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="4">
        <div class="grid-content bg-purple">
          <div class="component-item">
            <mallki class-name="mallki-text" text="当前设备ID" />
          </div>
          <el-input v-model="device_id" placeholder="当前设备" />
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>1路开关</span>
          <br />
          <el-switch
            v-model="dSwitch1"
            :width="100"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setSwitch1"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
          <span>2路开关</span>
          <br />
          <el-switch
            v-model="dSwitch2"
            :width="100"
            :active-value="1"
            :sinactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setSwitch2"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>3路开关</span>
          <br />
          <el-switch
            v-model="dSwitch3"
            :width="100"
            :active-value="1"
            :sinactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setSwitch3"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>1路漏电阈值</span>
          <br />
          <el-input-number
            v-model="valueData.leakageCurrentSet1"
            placeholder="请选择漏电阈值"
            :max="800"
            :min="100"
            :step="100"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
          <span>2路漏电阈值</span>
          <br />
          <el-input-number
            v-model="valueData.leakageCurrentSet2"
            placeholder="请选择漏电阈值"
            :max="800"
            :min="100"
            :step="100"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>3路漏电阈值</span>
          <br />
          <el-input-number
            v-model="valueData.leakageCurrentSet3"
            placeholder="请选择漏电阈值"
            :max="800"
            :min="100"
            :step="100"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>功率因素阈值</span>
          <br />
          <el-input-number
            v-model="valueData.powerFactorSet1"
            placeholder="功率因素阈值"
            :max="2.5"
            :min="0"
            :step="0.5"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
          <span>CT变比</span>
          <br />
          <el-input-number v-model="valueData.ctVarValue" placeholder="CT变比" :step="10" />
        </div>
      </el-col>
    </el-row>

    <el-button class="pan-btn pink-btn" type="primary" @click="setValueData">设置阈值</el-button>
  </div>
</template>

<script>
import Mallki from "@/components/TextHoverEffect/Mallki";
import { getValue, setValue } from "@/api/value";
import { setControl } from "@/api/control";
export default {
  components: {
    Mallki
  },
  data() {
    return {
      // value: false,
      dSwitch1: 0,
      dSwitch2: 0,
      dSwitch3: 0,
      valueData: {},
      options: [
        {
          value: "100",
          label: "100"
        },
        {
          value: "200",
          label: "200"
        },
        {
          value: "300",
          label: "300"
        },
        {
          value: "400",
          label: "400"
        },
        {
          value: "500",
          label: "500"
        },
        {
          value: "600",
          label: "600"
        },
        {
          value: "700",
          label: "700"
        },
        {
          value: "800",
          label: "800"
        }
      ],
      temp: {}
    };
  },
  computed: {
    device_id() {
      return this.$store.getters.device_id;
    }
  },
  watch: {
    device_id(val, oldVal) {
      // console.log(val, oldVal);
      if (val != oldVal) {
        getValue(val).then(Reponse => {
          if (Reponse.data == "") {
            console.log("无此条设备阈值");
          } else {
            this.valueData = Reponse.data;
          }
        });
      }
    }
  },
  mounted() {
    this.getValueData();
  },
  methods: {
    handleData() {
      this.temp.device_id = this.$store.getters.device_id;
      this.temp.deviceId = this.valueData.deviceId;
      this.temp.operator = this.$store.getters.name;
      this.temp.switchSet1 = this.dSwitch1;
      this.temp.switchSet2 = this.dSwitch2;
      this.temp.switchSet3 = this.dSwitch3;
      this.temp.leakageCurrentSet1 = this.valueData.leakageCurrentSet1;
      this.temp.leakageCurrentSet2 = this.valueData.leakageCurrentSet2;
      this.temp.leakageCurrentSet3 = this.valueData.leakageCurrentSet3;
      this.temp.powerFactorSet1 = this.valueData.powerFactorSet1;
      this.temp.ctVarValue = this.valueData.ctVarValue;
    },
    //下发至MQTT服务器，并填入控制表记录
    setSwitch1(val) {
      // console.log(typeof val);
      this.handleData();
      this.temp.switchSet2 = 0;
      this.temp.switchSet3 = 0;
      const tempData = Object.assign({}, this.temp);
      console.log(tempData);
      if (val == 1) {
        this.$confirm("闭合开关1?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (this.temp.device_id == "") {
              this.$message.error("请选择设备！");
            } else {
              console.log(this.temp.device_id, this.temp.operator);
              // 上传操作到数据库
              setControl( tempData).then(Response => {
                this.$message({
                  type: "success",
                  message: Response.message
                });
              });
            }
            this.dSwitch1 = 0;
          })
          .catch(() => {
            this.dSwitch1 = 0;
            this.$message({
              type: "info",
              message: "已取消开关1操作"
            });
          });
      }
    },
    setSwitch2(val) {
      this.handleData();
      // 由于单片机设备每次都需要接收全部参数，所以要这样写！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      this.temp.switchSet1 = 0;
      this.temp.switchSet3 = 0;
      const tempData = Object.assign({}, this.temp);
      console.log(tempData);
      if (val == 1) {
        this.$confirm("闭合开关1?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (this.temp.device_id == "") {
              this.$message.error("请选择设备！");
            } else {
              // 上传操作到数据库
              setControl(tempData).then(Response => {
                this.$message({
                  type: "success",
                  message: Response.message
                });
              });
            }
            this.dSwitch2 = 0;
          })
          .catch(() => {
            this.dSwitch2 = 0;
            this.$message({
              type: "info",
              message: "已取消开关2操作"
            });
          });
      }
    },
    setSwitch3(val) {
      this.handleData();
      this.temp.switchSet1 = 0;
      this.temp.switchSet2 = 0;
      const tempData = Object.assign({}, this.temp);
      console.log(tempData);
      if (val == 1) {
        this.$confirm("闭合开关1?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (this.temp.device_id == "") {
              this.$message.error("请选择设备！");
            } else {
              console.log(this.temp.device_id, this.temp.operator);
              // 上传操作到数据库
              setControl(tempData).then(Response => {
                this.$message({
                  type: "success",
                  message: Response.message
                });
              });
            }
            this.dSwitch3 = 0;
          })
          .catch(() => {
            this.dSwitch3 = 0;
            this.$message({
              type: "info",
              message: "已取消开关3操作"
            });
          });
      }
    },
    //设置阈值，并记录到控制表且更新阈值表的对应数据
    setValueData() {
      this.handleData();
      this.temp.switchSet1 = 0;
      this.temp.switchSet2 = 0;
      this.temp.switchSet3 = 0;
      const tempData = Object.assign({}, this.temp);
      this.$confirm("设置阈值？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.temp.device_id == "") {
            this.$message.error("请选择设备！");
          } else {
            // 上传操作到数据库
            setControl(tempData).then(Response => {
              this.$message({
                type: "success",
                message: Response.message
              });
              //更新或者创建到阈值表
              tempData.id = this.valueData.id;
              setValue(tempData).then(Response => {});
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消阈值设置"
          });
        });
    },
    getValueData() {
      let device_id = this.$store.getters.device_id;
      console.log(this.$store.getters.device_id, "默认");
      if (device_id) {
        getValue(device_id).then(Reponse => {
          if (Reponse.data == null) {
            // console.log("无此条设备阈值");
          } else {
            this.valueData = Reponse.data;
          }
        });
      } else {
        this.$message.error("请在地图页面选择设备");
      }
    }
  }
};
</script>

<style  scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  text-align: center;
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
