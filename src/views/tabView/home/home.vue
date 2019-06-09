<template>
  <div class="home-page">
    首页
    <oc-header
      :show-left="false"
    >
      <span slot="center">
        <div>主页</div>
      </span>
    </oc-header>
    <oc-button>
      <router-link
        class="footer-item-view"
        :to="routerId.demo"
      >
        去demo
      </router-link>
    </oc-button>
    <hr />
    <oc-button>
      <router-link
        class="footer-item-view"
        :to="routerId.signIn"
      >
        去登陆
      </router-link>
    </oc-button>

    <svg-icon icon-class="eye" type='danger' size='large'></svg-icon>
  </div>
</template>
<script>

export default {
  name: 'home-page',
  mixins: [],
  components: {
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickLeft() {
      console.log(123);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  .home-page {
    height: 100%;
    padding-top: $header-height;
  }
</style>
