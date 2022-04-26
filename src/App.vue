<template>
  <vuestro-app title="vuestro"
               :dark="dark"
               :user="user"
               :user-img="userImg"
               :role="role">
    <template #logo>
    </template>

    <template #navbar></template>
    <template #sidebar></template>
    <template #sidebar-footer></template>

    <template #footer>
      <p class="default-footer">Vuestro ❤ Vue</p>
    </template>

  </vuestro-app>
</template>

<script>

/* global VERSION */

export default {
  name: 'App',
  data() {
    return {
      dark: true,
      version: VERSION,
      user: 'A Vue User',
      userImg: require('@/assets/default-user.jpg'),
      role: 'Admin',
    };
  },
  beforeMount() {
    // pre-load any Vuex data here
    this.$store.dispatch('example/loadExampleData');
  },
};
</script>

<style>

body {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.default-footer {
  text-align: center;
}

</style>
