<template lang="pug">
  div
    div(v-if="!data || data.length > 0")
      slot
    div(v-else)
      el-empty(:description="description")
</template>

<script>
  export default {
    name: 'NoData',
    props: {
      data: Array | null | undefined,
      description: { type: String, default: 'Sem dados até o momento', }
    },
  }
</script>