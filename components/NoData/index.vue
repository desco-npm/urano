<template lang="pug">
  div
    div(v-if="data || !data.length === 0")
      el-empty(:description="description")
    div(v-else)
      slot
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