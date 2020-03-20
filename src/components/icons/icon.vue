<template>
    <svg xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        :width="width"
        :height="height"
        :aria-labelledby="name"
    >
        <g>
            <dynamic-icon :type="name" :data="data" />
        </g>

    </svg>
</template>

<script>

import DynamicIcon from './vue-icons/index'

export default {

    components: {
        'dynamic-icon' : DynamicIcon
    },

    props: {
        name: {
            type: String,
            default: 'search'
        },
        viewBox: {
            type: String,
            default: '0 0 24 24'
        },
        width: {
            type: [Number, String],
            default: 24
        },
        height: {
            type: [Number, String],
            default: 24
        },
        data: {
            type: Object,
            default: () => {}
        }
    }

}

</script>

<style scoped>

svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px;
}

</style>
