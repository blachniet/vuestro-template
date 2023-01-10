<template>
  <vuestro-container>
    <vuestro-card>
      <template #heading>Traditional dropdown</template>
      <vuestro-dropdown close-on-content-click>
        <template #title>
          {{ selectedString }}
        </template>
        <template #default>
          <vuestro-pill @click="selectedString = 'Xylophone'">
            <template #value>Xylophone</template>
          </vuestro-pill>
          <vuestro-list-button @click="setString('Menu Item 1')">Menu Item 1</vuestro-list-button>
          <vuestro-list-button @click="setString('Menu Item 2')">Menu Item 2</vuestro-list-button>
        </template>
      </vuestro-dropdown>
    </vuestro-card>
    <vuestro-card>
      <template #heading>Button dropdown</template>
      <vuestro-dropdown close-on-content-click>
        <template #button>
          <vuestro-button>{{ selectedString }}</vuestro-button>
        </template>
        <template #default>
          <vuestro-pill @click="selectedString = 'Xylophone'">
            <template #value>Xylophone</template>
          </vuestro-pill>
          <vuestro-list-button @click="setString('Menu Item 1')">Menu Item 1</vuestro-list-button>
          <vuestro-list-button @click="setString('Menu Item 2')">Menu Item 2</vuestro-list-button>
        </template>
      </vuestro-dropdown>
    </vuestro-card>
    <vuestro-card>
      <template #heading>Text field dropdown</template>
      <vuestro-text-field :value="selectedString" variant="outline">
        <template #dropdown="{ closeDropdown }">
          <vuestro-list-button @click="setString('Menu Item 1', closeDropdown)">Menu Item 1</vuestro-list-button>
          <vuestro-list-button @click="setString('Menu Item 2', closeDropdown)">Menu Item 2</vuestro-list-button>
        </template>
      </vuestro-text-field>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'Dropdown',
  data() {
    return {
      selectedString: 'Click Me',
    };
  },
  methods: {
    setString(s, callback) {
      this.selectedString = s;
      callback && callback();
    },
  },
};

</script>

<style scoped>


</style>