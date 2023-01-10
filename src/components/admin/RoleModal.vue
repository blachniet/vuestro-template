<template>
  <vuestro-modal :active.sync="active" @after-open="$refs.first.focus()">
    <template #title>{{ mode }} Role</template>
    <vuestro-container v-if="liveItem">
      <vuestro-card cols="6">
        <vuestro-text-field ref="first"
                            size="lg"
                            variant="outline"
                            placeholder="Role Name"
                            v-model="liveItem.name"
                            :readonly="isReadOnly">
        </vuestro-text-field>
      </vuestro-card>
      <vuestro-card cols="6">
        <vuestro-text-field size="lg"
                            variant="outline"
                            placeholder="Description"
                            v-model="liveItem.description"
                            :readonly="isReadOnly">
        </vuestro-text-field>
      </vuestro-card>
      <vuestro-card>
        <vuestro-panel collapsible>
          <template #title>Permissions</template>
          <vuestro-container>
            <vuestro-card v-for="c in rolesGetPermissions" cols="4" :key="c.category">
              <vuestro-button justify="left" no-margin
                              variant="info" value @click="categoryCheckAll(c)">
                {{ c.category }}
              </vuestro-button>
              <vuestro-container gutter="sm" column>
                <vuestro-button v-for="p in c.items" :key="p.id"
                                checkbox
                                size="sm"
                                v-model="liveItem.permissions[p.id]"
                                :title="p.description"
                                :disabled="isReadOnly">
                  {{ p.title }}
                </vuestro-button>
              </vuestro-container>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
      </vuestro-card>
    </vuestro-container>
    <template #buttons>
      <vuestro-button @click="active = false">Cancel</vuestro-button>
      <vuestro-button v-if="!readonly" variant="success" value @click="onSave" :disabled="!valid">Save</vuestro-button>
    </template>
  </vuestro-modal>
</template>

<script>

/* global _, Vuex */

export default {
  name: 'RoleModal',
  data() {
    return {
      active: false,
      mode: null,
      readonly: false,
      liveItem: null,
      // the default item
      defaultItem: {
        name: '',
        description: '',
        permissions: {},
      },
    };
  },
  computed: {
    ...Vuex.mapGetters('roles', ['rolesGetPermissions']),
    isReadOnly() {
      return this.mode === 'View';
    },
    valid() {
      return this.liveItem.name.length > 0 &&
             this.liveItem.description.length > 0;
    },
  },
  methods: {
    openCreate() {
      this.liveItem = _.defaultsDeep({}, this.defaultItem);
      this.active = true;
      this.readonly = false;
      this.mode = 'Create';
    },
    openView(obj) {
      this.liveItem = _.defaultsDeep({}, obj, this.defaultItem);
      this.active = true;
      this.readonly = true;
      this.mode = 'View';
    },
    openEdit(obj) {
      this.liveItem = _.defaultsDeep({}, obj, this.defaultItem);
      this.active = true;
      this.readonly = false;
      this.mode = 'Edit';
    },
    onSave() {
      this.$nextTick(() => {
        if (this.mode === 'Create') {
          this.$store.dispatch('roles/createRole', _.cloneDeep(this.liveItem));
        } else {
          this.$store.dispatch('roles/updateRole', _.cloneDeep(this.liveItem));
        }
        this.active = false;
      });
    },
    categoryCheckAll(c) {
      for (let p of c.items) {
        // use $set for responsiveness
        this.$set(this.liveItem.permissions, p.id, true);
      }
    },
  }
};

</script>

<style scoped>

</style>