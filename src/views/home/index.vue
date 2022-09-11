// 这是主页内容
<template>
  
    <el-row class="el-row1" :gutter="20">
      <el-col class="el-col1" :span="8" >
        <el-card>
          <div class="user">
            <img :src="userImg"  class="userImg" >
            <div class="uesrInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <hr class="xian">
          <div class="login-info">
            <p>上次登录时间：<span style="magin-left:30px">2022-2-5</span></p>
            <p>上次登录地点：<span>成都</span></p>
          </div>
        </el-card>
        <el-card class="spbiaoge">
          <el-table :data="tableData">
            <el-table-column
            v-for="(val, key) in tableLable"
            :key="key"
            :prop="key"
            :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    <el-col :span="16" >
      <div class="num">
        <el-card class="box-card" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="nums">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card  style="height: 210px">
        <div style="height: 210px" ref="echarts"></div>
      </el-card>
        <div class="graph">
          <el-card style="height: 180px">
            <div style="height: 200px" ref="userEcharts"></div>
          </el-card>
          <el-card style="height: 180px">
            <div style="height: 150px" ref="videoEcharts"></div>
          </el-card>
        </div>
      </el-col> 
    </el-row>
    
</template>

<script>
import { getData } from '../../../api/data.js'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      userImg: require('../../assets/imgas/user.jpg'),
      tableData: [],
      tableLable: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: "star-on",
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: "s-goods",
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: "success",
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: '本月支付订单',
          value: 210,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ]
    }
  },
  mounted() {
    getData().then(res => {
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const keyArray = Object.keys(order.data[0])
        const xData = order.date
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })

        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)
        // 用户图
        const userOption = {
                legend: {
                  // 图例文字颜色
                  textStyle: {
                    color: "#333",
                  },
                },
                grid: {
                  left: "20%",
                },
                // 提示框
                tooltip: {
                  trigger: "axis",
                },
                xAxis: {
                  type: "category", // 类目轴
                  data: data.userData.map(item => item.date),
                  axisLine: {
                    lineStyle: {
                      color: "#17b3a3",
                    },
                  },
                  axisLabel: {
                    interval: 0,
                    color: "#333",
                  },
                },
                yAxis: [
                  {
                    type: "value",
                    axisLine: {
                      lineStyle: {
                        color: "#17b3a3",
                      },
                    },
                  },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                  {
                    name: '新增用户',
                    data: data.userData.map(item => item.new),
                    type: 'bar'
                  },
                  {
                    name: '活跃用户',
                    data: data.userData.map(item => item.active),
                    type: 'bar'
                  }
                ],
        } 
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)
        // 饼图
        const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: data.videoData,
              type: 'pie'
            }
          ],
        }
        const Y = echarts.init(this.$refs.videoEcharts)
        Y.setOption(videoOption)
      }
      console.log(res);
     })
  }
}
</script>



<style lang="less" scoped>
.spbiaoge{
  margin-top: 20px;
  height: 380px;
  .icon{
    margin-right: 0;
  }
}
.graph {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .el-card {
        width: 48%;
      }
    }
.num {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-card {
        width: 32%;
        margin-bottom: 20px;
      }
      .icon {
        font-size: 30px;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .nums { 
          font-size: 30px;
          margin-bottom: 5px;
          margin-top: 5px;
        }
        .txt {
          font-size: 14px;
          margin-top: 5px;
          margin-bottom: 5px;
          text-align: center;
          color: #999999;
        }
      }
    }
.user{
  display: flex;
    .userImg{
      padding-top: 10px;
      width: 80px;
      height: 80px;
  }
  .uesrInfo{
    margin-left: 70px;
    .name{
      font-size: larger;
      font-weight: 700;
    }
    .access{
      font-size: small;
      color: rgb(180, 169, 169);
    }
  }
}
.login-info{
  font-size: small;
  color: rgb(180, 169, 169);
}
</style>