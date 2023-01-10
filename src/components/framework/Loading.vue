<template>
  <vuestro-container no-wrap justify="center" align="center">
    <div>
      <vuestro-icon name="spinner" pulse scale="3"></vuestro-icon>
      <div class="lead">Loading...</div>
    </div>
  </vuestro-container>
</template>

<script>

export default {
  name: "Loading",
};

</script>

<style scoped>

.vuestro-container {
  background-color: #2f353f;
}

.vuestro-icon {
  margin-bottom: 20px;
}

</style>