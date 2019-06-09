<template>
  <svg :class="[
    svgClass,
    inputSize ? 'svg-icon--' + inputSize : '',
    type ? 'svg-icon--' + type : '',
    {
      'is-pointer': pointer,
      'is-reverse': reverse,
      'is-stroke': stroke,
      'svg-icon--icon': isIcon,
    }
  ]" aria-hidden="true">
    <use :xlink:href="iconName"></use>
    <slot></slot>
  </svg>
</template>

<script>

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('@/assets/svg', true, /\.svg$/);
requireAll(req);

export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    pointer: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    isIcon: {
      type: Boolean,
      default: true,
    },
    stroke: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return `svg-icon ${this.className}`;
      }
      return 'svg-icon';
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
  },
};
</script>

<style lang="scss">
  $--svg-color-default: $white-color !default;

  $--svg-color: (
    'primary': $primary-color,
    'info': #b4bdca,
    'black-light': #cbcbcb,
    'warning' : $warning-color,
    'danger' : $danger-color,
    'success' : $success-color,
    'black' : $black-color,
    'white' : $white-color,
  );

  $--svg-size: (
    'minimum' : (
      width: 10px,
      height: 10px,
    ),
    'mini' : (
      width:  12px,
      height: 12px,
    ),
    'small' : (
      width: 15px,
      height: 20px,
    ),
    'partial' : (
      width: 23px,
      height: 26px,
    ),
    'medium' : (
      width: 30px,
      height: 30px,
    ),
    'large' : (
      width: 60px,
      height: 60px,
    ),
  );

  .svg-icon {
    position: relative;
    overflow: hidden;
    fill: $--svg-color-default;
  }

  @each $svg-color-name, $value in $--svg-color {
    .svg-icon--#{$svg-color-name} {
      fill: $value;
    }
  }

  @each $svg-size-name, $value in $--svg-size {
    .svg-icon--#{$svg-size-name} {
      width: 20px;
      height: map-get($value, 'height');
    }
  }
</style>
