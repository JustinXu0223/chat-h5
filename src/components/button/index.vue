<template>
  <div
    class="oc-button-view"
    :style="{
      opacity,
      height: px2rem(height),
    }"
    :class="{
      'disabled-view': disabled,
      [`button-${this.type}-view`]: type,
      'shadow-view': shadow && !disabled,
    }"
    v-focus
    @click="onClick"
    @keydown.enter="onClick"
    tabIndex="0"
  >
    <Loading
      class="loading-view"
      type="spinner"
      :size="`${height / 3}px`"
      v-if="hasLoading"
    ></Loading>
    <slot></slot>
  </div>
</template>
<script>

import { Loading } from 'vant';

export default {
  name: 'oc-button',
  props: {
    height: {
      type: Number,
      default: 50,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'primary', // primary / text / ghost
    },
  },
  components: {
    Loading,
  },
  data() {
    return {};
  },
  computed: {
    opacity() {
      if (this.loading) return 0.69;
      return 1;
    },
    hasLoading() {
      return this.loading && this.type !== 'text';
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    onClick(event) {
      if (this.loading || this.disabled) return;
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  .oc-button-view {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary-color;
    border: 1px solid $primary-color;
    border-radius: 2px;
    font-size: 17px;
    color: $button-text-color;
    transition: all 0.38s;

    :global(.loading-view) {
      margin-right: 6px;

      :global(.van-loading) {
        color: $button-text-color !important;
      }
    }

    &.button-ghost-view {
      background-color: $button-text-color;
      border: 1px solid rgba(156, 168, 182, 0.76);
      color: rgba(0, 0, 0, 0.9);

      :global(.van-loading) {
        color: rgba(0, 0, 0, 0.9) !important;
      }
    }

    &.button-text-view {
      background-color: transparent;
      border: 1px solid transparent;
      color: $blue-color;
    }

    &.disabled-view {
      background-color: $button-disabled-color;
      border: 1px solid $button-disabled-color;
    }

    &.shadow-view {
      box-shadow: 0 20px 20px -10px rgba(151, 38, 38, 0.5);
    }
  }
</style>
