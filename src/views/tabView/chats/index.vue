<template>
  <div class="chats-page">
    聊天
    <oc-header
      :show-left="false"
    >
    </oc-header>
    <router-link
      class="footer-item-view"
      :to="routerId.demo"
    >
      去demo
    </router-link>

  </div>
</template>
<script>

export default {
  name: 'chats-page',
  mixins: [],
  components: {
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  .chats-page {
    height: 100%;
    padding-top: $header-height;
  }
</style>
