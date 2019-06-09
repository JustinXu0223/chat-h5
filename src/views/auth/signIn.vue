<template>
  <div class="sign-in-page">
    <oc-header>
      <span slot="center">
        <div>登录</div>
      </span>
    </oc-header>
    登陆页面
  </div>
</template>
<script>
export default {
  name: 'sign-in-page',
  mixins: [],
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  .sign-in-page {
    height: 100%;
    padding-top: $header-height;
  }
</style>
