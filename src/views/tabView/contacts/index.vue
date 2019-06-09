<template>
  <div class="contacts-page">
    联系人
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
  name: 'contacts-page',
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
  .contacts-page {
    height: 100%;
    padding-top: $header-height;
  }
</style>
