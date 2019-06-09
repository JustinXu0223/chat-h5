<template>
  <div class="demo-view">
    <div>这是子组件</div>
    <slot
      v-for="(item, index) in data"
      :row="item"
      :index$="index"
      name="item"
    >
      slot的默认内容
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  props: {
    data: {
      type: Array,
      default: () => ['zhangsan', 'lisi', 'wanwu', 'zhaoliu', 'tianqi', 'xiaoba'],
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
  .demo-view {
    display: flex;
  }
</style>
