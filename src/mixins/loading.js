import { Toast } from 'vant';

export default {

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    startLoading() {
      this.$nextTick(() => {
        this.loading = true;
        Toast.loading({
          mask: true,
          message: '',
          duration: 3000,
          forbidClick: true,
        });
      });
    },

    closeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        setTimeout(() => {
          Toast.clear();
        }, 300);
      });
    },
  },
};
