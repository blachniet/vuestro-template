<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-danger)">
      <template #heading>
        <span>Roles</span>
        <vuestro-container gutter="none" grow="0" >
          <vuestro-button pill variant="success" value @click="$refs.roleModal.openCreate()">
            <template #icon>
              <vuestro-icon name="plus"></vuestro-icon>
            </template>
            New
          </vuestro-button>
          <vuestro-button pill no-border @click="load">
            <template #icon>
              <vuestro-icon name="sync-alt" :pulse="!rolesLoaded"></vuestro-icon>
            </template>
            Refresh
          </vuestro-button>
          <vuestro-button pill no-border variant="info" @click="vuestroDownloadAsJson(roles, 'roles.json')">
            <template #icon>
              <vuestro-icon name="download"></vuestro-icon>
            </template>
            Export
          </vuestro-button>
        </vuestro-container>
      </template>
      <template #subheading>Manage access to system resources through Permissions</template>
      <template #description>Create a new Role to define a set of Permissions which a user group is allowed to have</template>
      <vuestro-panel>
        <vuestro-table :options="options"
                       :data="roles">
          <template #row="{ item }">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <vuestro-container gutter="none">
                <template v-for="(v, k) in item.permissions">
                  <vuestro-pill geopattern :key="k" v-if="v">
                    <template #title>{{ rolesGetPermissionTitleByValue(k) }}</template>
                  </vuestro-pill>
                </template>
              </vuestro-container>
            </td>
          </template>
          <template #row-buttons="{ item }">
            <vuestro-button round no-border @click="$refs.roleModal.openView(item)">
              <vuestro-icon name="eye"></vuestro-icon>
            </vuestro-button>
            <vuestro-button v-if="item.name !== 'Administrator'"
                            round
                            no-border
                            @click="$refs.roleModal.openEdit(item)">
              <vuestro-icon name="edit"></vuestro-icon>
            </vuestro-button>
            <vuestro-confirm v-if="item.name !== 'Administrator'"
                                    @confirm="deleteRole(item)">
            </vuestro-confirm>
          </template>
        </vuestro-table>
      </vuestro-panel>
    </vuestro-card>
    <role-modal ref="roleModal"></role-modal>
  </vuestro-container>
</template>

<script>

/* global Vuex */

import RoleModal from '@/components/admin/RoleModal';

export default {
  name: 'AdminRoles',
  components: {
    RoleModal,
  },
  data() {
    return {
      search: '',
      options: {
        columns: [
          {
            title: 'Role Name',
            sortable: true,
          },
          {
            title: 'Description',
          },
          {
            title: 'Permissions',
          },
        ],
      },
    };
  },
  computed: {
    ...Vuex.mapGetters('roles', ['roles', 'rolesLoaded', 'rolesGetPermissionTitleByValue']),
  },
  methods: {
    ...Vuex.mapActions('roles', ['load', 'deleteRole']),
  },

};

</script>

<style scoped>

.vuestro-table td {
  padding-left: 12px;
}

</style>