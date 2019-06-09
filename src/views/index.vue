<template>
  <div class="app-layout" :class="getThemeName">
    <div
      class="section-view"
      :class="getSectionClassName"
    >
      <transition
        :name="getViewTransition.name"
        :mode="getViewTransition.mode"
      >
        <keep-alive v-if="hasKeepAlive">
          <router-view />
        </keep-alive>
        <router-view v-else />
      </transition>
    </div>
    <TabBar v-if="tabBarVisible"/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

// constants
import * as globalTypes from '@/store/types/global';

// components
import TabBar from '@/components/layout/tab-bar';

export default {
  name: 'app-layout',
  mixins: [],
  components: {
    TabBar,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      currDirection: globalTypes.GET_DIRECTION,
      theme: globalTypes.GET_THEME,
    }),
    ...mapState({
      tabBarVisible: state => state.route.meta.footer,
    }),
    hasKeepAlive() {
      return this.$route.meta.keepAlive;
    },
    getViewTransition() {
      if (!this.currDirection) return { name: 'fade', mode: 'out-in' };
      return {
        name: `office-pop-${this.currDirection === 'forward' ? 'in' : 'out'}`,
        mode: '',
      };
    },
    getSectionClassName() {
      return this.tabBarVisible ? 'paddingBottom' : '';
    },
    getThemeName() {
      return `theme-${this.theme}`;
    },
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  .app-layout {
    width: 100%;
    margin: 0 auto;
    flex: 1;
    font-size: 14px;
  }

  .section-view {
    flex: 1;

    &.paddingBottom {
      padding-bottom: $tab-bar-height;
    }
  }
</style>
