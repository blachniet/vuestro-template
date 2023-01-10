<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-danger)">
      <template #heading>
        <span>Users</span>
        <vuestro-container gutter="none" grow="0">
          <vuestro-button pill variant="success" value @click="$refs.userModal.openCreate()">
            <template #icon>
              <vuestro-icon name="plus"></vuestro-icon>
            </template>
            New
          </vuestro-button>
          <vuestro-button pill no-border @click="loadUsers">
            <template #icon>
              <vuestro-icon name="sync-alt"></vuestro-icon>
            </template>
            Refresh
          </vuestro-button>
          <vuestro-button pill no-border variant="info" @click="vuestroDownloadAsJson(users, 'users.json')">
            <template #icon>
              <vuestro-icon name="download"></vuestro-icon>
            </template>
            Export
          </vuestro-button>
        </vuestro-container>
      </template>
      <template #subheading>Manage user accounts</template>
      <template #description>Each user below is assigned one or more Roles which allow the User access different parts of the Dashboard</template>
      <vuestro-panel>
        <vuestro-table :options="options" :data="users">
          <!--ROW-->
          <template #row="{ item }">
            <td>
              <div class="user-avatar">
                <img v-if="item.avatar" :src="item.avatar"/>
                <img v-else src="@/assets/default-user.jpg"/>
              </div>
            </td>
            <td class="vuestro-text-bold">{{ item.fullname }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>
              <vuestro-container gutter="none" v-if="item.role_ids.length > 0">
                <template v-for="r in item.role_ids">
                  <vuestro-pill geopattern :key="r" v-if="$store.getters['roles/rolesGetById'](r)">
                    <template #title>{{ rolesGetById(r).name }}</template>
                  </vuestro-pill>
                </template>
              </vuestro-container>
            </td>
            <td>
              {{ item.lastLogin | vuestroDate }}
            </td>
            <td>
              <vuestro-check-or-x :value="item.enabled"></vuestro-check-or-x>
            </td>
          </template>
          <!--BUTTONS-->
          <template #row-buttons="{ item }">
            <vuestro-button round no-border @click="$refs.userModal.openView(item)">
              <vuestro-icon name="eye"></vuestro-icon>
            </vuestro-button>
            <vuestro-button round no-border @click="$refs.userModal.openEdit(item)">
              <vuestro-icon name="edit"></vuestro-icon>
            </vuestro-button>
            <vuestro-confirm @confirm="deleteUser(item)"></vuestro-confirm>
          </template>
        </vuestro-table>
      </vuestro-panel>
    </vuestro-card>
    <user-modal ref="userModal"></user-modal>
  </vuestro-container>
</template>

<script>

/* global Vuex, Vue */
import UserModal from '@/components/admin/UserModal';

export default {
  name: 'AdminUsers',
  components: {
    UserModal,
  },
  data() {
    return {
      search: '',
      options: {
        scroll: true,
        columns: [
          {}, // avatar column
          {
            title: 'Full Name',
            field: 'fullname',
            sortable: true,
          },
          {
            title: 'Username',
            field: 'username',
            sortable: true,
          },
          {
            title: 'Email',
            field: 'email',
            sortable: true,
          },
          {
            title: 'Roles',
            field: 'role_ids',
          },
          {
            title: 'Last Login',
            field: 'lastLogin',
            sortable: true,
          },
          {
            title: 'Enabled',
            field: 'enabled',
            sortable: true,
            align: 'center',
          },
        ],
      },
    };
  },
  computed: {
    ...Vuex.mapGetters('admin', ['users']),
    ...Vuex.mapGetters('roles', ['rolesGetById']),
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    ...Vuex.mapActions('admin', ['loadUsers', 'deleteUser']),
  },
};

</script>

<style scoped>

.vuestro-table >>> .name {
  font-weight: 500;
}
.vuestro-table >>> .email {
  color: var(--vuestro-text-color-muted);
  font-weight: 500;
}
.vuestro-table >>> .role {
  font-size: 0.8em;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--vuestro-text-color-muted);
}
.vuestro-table >>> .date {
  color: var(--vuestro-text-color-muted);
  font-size: 0.9em;
  white-space: nowrap;
}

.user-avatar {
  margin-left: 0.4em;
}

.user-avatar >>> img {
  height: 1.5em;
  width: 1.5em;
  border-radius: 50%;
}


</style>