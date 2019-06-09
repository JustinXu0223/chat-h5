<template>
    <div class="demo-page-container">
      <Header />
        测试页面
      <oc-button
        type="primary"
        @click="onClickBack"
      >
        返回
      </oc-button>

      <br />
      Value: {{ count }}
      <button @click="onIncrement">-</button>
      <button @click="onDecrement">+</button>
      <hr />
      {{theme}}
      <button @click="onChangeTheme(theme === 'light' ? 'dark' : 'light')">切换主题</button>
      <hr />
      <DemoItem>
        <template slot="item" slot-scope="{row}">
          <li>{{row}}</li>
        </template>
      </DemoItem>
      <chart :options="polar" :style="{width: '100%'}" />
    </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

import ECharts from 'vue-echarts/dist/vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/polar';

// constants
import * as demoTypes from '@/store/types/demo';
import * as globalTypes from '@/store/types/global';

// components
import Header from '@/components/layout/header';
import DemoItem from './components/demo-item';

export default {
  name: 'demo-page',
  mixins: [],
  components: {
    Header,
    DemoItem,
    chart: ECharts,
  },
  data() {
    return {
      polar: {
        grid: {
          left: '13%',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        }],
        animation: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      count: demoTypes.GET_COUNT,
      theme: globalTypes.GET_THEME,
    }),
  },
  methods: {
    ...mapActions({
      onIncrement: demoTypes.INCREMENT_REQ,
      onDecrement: demoTypes.DECREMENT_REQ,
    }),
    ...mapMutations({
      onChangeTheme: globalTypes.UPDATE_THEME,
    }),
    onClickBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  .demo-page-container {
    padding-top: $header-height;
    height: 100%;

    @include themify() {
      color: themed('primary-color');
    }
  }
</style>
