<template>
  <div class="checkorx">
    <vuestro-icon v-if="value" name="check"></vuestro-icon>
    <vuestro-icon v-else name="times"></vuestro-icon>
  </div>
</template>

<script>

export default {
  name: 'CheckOrX',
  props: ['value'],
};

</script>

<style scoped>

.checkorx {
  display: flex;
  margin-left: 1em;
}


</style>