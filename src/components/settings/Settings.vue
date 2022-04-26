<template>
  <vuestro-container no-wrap>
    <vuestro-card cols="6">
      <vuestro-panel>
        <template #title>Profile</template>
        <my-first-component></my-first-component>
      </vuestro-panel>
    </vuestro-card>
    <vuestro-card cols="6">
      <vuestro-panel>
        <template #title>Preferences</template>

      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

import MyFirstComponent from '@/components/MyFirstComponent';

export default {
  name: 'Settings',
  components: {
    MyFirstComponent,
  },
};

</script>

<style scoped>

</style>