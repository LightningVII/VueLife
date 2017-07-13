<template>
    <div class="">
      <span v-for="i in 3">
        <slot></slot>
      </span>
    </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {}
  },
  methods: {
  }
}
</script>