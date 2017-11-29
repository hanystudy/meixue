<template>
  <pre>
    {{ text }}
  </pre>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
  }
}
</script>

<style scoped>
pre {
  flex: 1;
  margin: 5px;
  overflow: scroll;
}
</style>
