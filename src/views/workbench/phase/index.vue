<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="grid-content bg-purple">
          <br />
          <span>当前设备ID</span>
          <el-input v-model="device_id" placeholder="当前设备" :readonly="true" />
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="grid-content bg-purple">
          <br />
          <span>设备采集时间</span>
          <el-input v-model="deviceData.createTime" placeholder="设备采集时间" :readonly="true" />
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <mentA :chart-data="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <mentB :chart-data="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <mentC :chart-data="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
          <span class="center">一路空开</span>
          <switchA :chart-data="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
          <span>二路空开</span>
          <switchB :chart-data="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple-light">
          <span>三路空开</span>
          <switchC :chart-data="deviceData" height="100%" width="100%" />
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>一路漏电电流值</span>
          <el-input v-model="deviceData.leakageCurrent1" placeholder="1路漏电电流" :readonly="true" />
          <span>阈值</span>
          <el-input v-model="valueData.leakageCurrentSet1" placeholder="阈值" :readonly="true" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>二路漏电电流值</span>
          <el-input v-model="deviceData.leakageCurrent2" placeholder="2路漏电电流" :readonly="true" />
          <span>阈值</span>
          <el-input v-model="valueData.leakageCurrentSet2" placeholder="阈值" :readonly="true" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>三路漏电电流值</span>
          <br />
          <el-input v-model="deviceData.leakageCurrent3" placeholder="1路漏电电流" :readonly="true" />
          <br />
          <span>阈值</span>
          <el-input v-model="valueData.leakageCurrentSet3" placeholder="阈值" :readonly="true" />
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>功率因数</span>
          <el-input v-model="deviceData.powerFactor1" placeholder="功率因数" :rreadonly="true">功率因数</el-input>
          <span>阈值</span>
          <el-input v-model="valueData.powerFactorSet1" placeholder="阈值" :readonly="true" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>CT变比</span>
          <el-input
            v-model="valueData.ctVarValue"
            placeholder="CT变比"
            :readonly="true"
            prefix="halo"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="grid-content bg-purple">
          <span>三相不平衡度</span>
          <el-input
            v-model="deviceData.unbalancedState1"
            placeholder="三相不平衡度"
            :readonly="true"
            class="center"
            maxlength="10"
            show-word-limit
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import PanThumb from '@/components/PanThumb'
import { getData } from "@/api/device_data";
import { getValue } from "@/api/value";
import switchA from "./switch/switchA";
import switchB from "./switch/switchB";
import switchC from "./switch/switchC";
import mentA from "./ment/mentA";
import mentB from "./ment/mentB";
import mentC from "./ment/mentC";
import leakage from "./leakage/leakage";
export default {
  components: {
    switchA,
    switchB,
    switchC,
    mentA,
    mentB,
    mentC
  },
  data() {
    return {
      deviceData: {},
      valueData: {}
    };
  },
  computed: {
    device_id() {
      return this.$store.getters.device_id;
    }
  },
  watch: {
    // device_id:{
    //   handler(){
    //     this.device_id = this.$store.getters.device_id
    //   },
    //   immediate: true
    // }
  },
  mounted() {
    // 定时获取服务器设备数据
    // this.device_id = this.$store.getters.device_id
    // console.log(this.$store.getters.device_id)
    this.getDeviceData();
    this.getValueData();
    this.times = window.setInterval(() => {
      setTimeout(this.getDeviceData, 0);
      setTimeout(this.getValueData, 0);
    }, 5 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.times);
  },

  methods: {
    // 获取最新设备数据
    getDeviceData() {
      let data = this.device_id;
      if (this.device_id) {
        getData(this.device_id).then(Response => {
          this.deviceData = Response.data;
        });
      } else {
        this.$message.error("请在地图页面选择设备");
      }
    },
    // 获取设备最新阈值
    getValueData() {
      const device_id = this.$store.getters.device_id;
      if (device_id) {
        getValue(device_id).then(Reponse => {
          if (Reponse.data == "") {
            // console.log("无此条设备阈值")
          } else {
            this.valueData = Reponse.data;
          }
        });
      } 
    }
  }
};
</script>

<style  scoped>
.el-col {
  border-radius: 10px;
}
.bg-purple-dark {
  background: #f0f1f3;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #eaeaea;
}
.grid-content {
  text-align: center;
  border-radius: 20px;
  min-height: 36px;
}
.bg-brue {
  background: #8faef8;
}
.center {
  text-align: center;
}
.el-input {
  text-align: center;
}
</style>
