<template>
  <div class="header-view">
    <div
      class="left-view"
      @click="onClickLeft"
    >
      <slot name="left" v-if="showLeft">
        <img :src="closeIcon" alt="">
      </slot>
    </div>
    <div
      class="center-view"
      @click="onClickCenter"
    >
      <slot name="center"></slot>
    </div>
    <div
      class="right-view"
      @click="onClickRight"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';

// constants
import * as globalTypes from '@/store/types/global';

export default {
  name: 'oc-header',
  props: {
    useCustomClickLeft: {
      type: Boolean,
      default: false,
    },
    showLeft: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      theme: globalTypes.GET_THEME,
    }),
    closeIcon() {
      return require(`@/assets/images/${this.theme}/back.png`);
    },
  },
  methods: {
    onClickLeft() {
      if (!this.showLeft) return;
      if (this.useCustomClickLeft) {
        this.$emit('click-left');
        return;
      }
      this.$router.back();
    },
    onClickCenter() {
      this.$emit('click-center');
    },
    onClickRight() {
      this.$emit('click-right');
    },
  },
};
</script>

<style lang="scss" scoped>
  .header-view {
    height: $header-height;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: $header-z-index;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;

    @include themify() {
      background-color: themed('header-bg-color');
    }

    > div {
      flex-direction: row;
      align-items: center;
    }

    .left-view {
      width: 60px;
      padding-left: 10px;

      img {
        width: 24px;
        height: auto;
      }
    }

    .right-view {
      width: 60px;
      padding-right: 10px;
    }

    .center-view {
      @include office-single-ellipsis();

      @include themify() {
        color: themed('header-text-color');
      }

      padding: 0 5px;
      color: #fff;
      height: $header-height;
      line-height: $header-height;
    }
  }
</style>
