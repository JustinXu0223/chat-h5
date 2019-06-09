<template>
  <div class="tab-bar-view">
    <router-link
      v-for="item in tabList"
      :to="item.path"
      :key="item.name"
      :class="{
        'footer-item-view': true,
        'active': currentPath === item.path,
      }"
    >
      <van-icon
        :name="item.icon"
        :info="item.info"
      >
      </van-icon>
      <span>{{item.name}}</span>
    </router-link>
  </div>
</template>

<script>

// constants
import routerId from '@/constants/routerId';

const tabList = [
  {
    name: '主页',
    path: routerId.home,
    icon: 'wap-home',
    focusIcon: '',
    info: '',
  },
  {
    name: '聊天',
    path: routerId.chats,
    icon: 'chat',
    focusIcon: '',
    info: '9',
  },
  {
    name: '通讯录',
    path: routerId.contacts,
    icon: 'envelop-o',
    focusIcon: '',
    info: '',
  },
  {
    name: '我',
    path: routerId.mine,
    icon: 'contact',
    focusIcon: '',
    info: '',
  },
];

export default {
  name: 'tab-bar',
  props: {
    tabList: {
      type: Array,
      default: () => tabList,
    },
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
  .tab-bar-view {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: $tab-bar-z-index;
    width: 100%;
    height: $tab-bar-height;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .footer-item-view {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #efefef;
      font-size: 14px;
      color: $text-color;

      :global(i) {
        font-size: 20px;
        color: $text-color;
      }

      &.active {
        color: $primary-color;

        :global(i) {
          color: $primary-color;
        }
      }
    }
  }
</style>
