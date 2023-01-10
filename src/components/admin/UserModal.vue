<template>
  <vuestro-modal :active.sync="open" @after-open="$refs.first.focus()">
    <template #title>{{ mode }} User</template>
    <vuestro-container v-if="liveItem">
      <vuestro-card cols="6">
        <vuestro-text-field ref="first"
                            size="lg"
                            variant="outline"
                            placeholder="Full Name"
                            v-model="liveItem.fullname"
                            :readonly="isReadOnly">
        </vuestro-text-field>
      </vuestro-card>
      <vuestro-card cols="6">
        <vuestro-text-field size="lg"
                            variant="outline"
                            placeholder="Username"
                            v-model="liveItem.username"
                            :readonly="isReadOnly">
        </vuestro-text-field>
      </vuestro-card>
      <vuestro-card>
        <vuestro-text-field size="lg"
                            variant="outline"
                            placeholder="Email"
                            v-model="liveItem.email"
                            :readonly="isReadOnly">
        </vuestro-text-field>
      </vuestro-card>
      <!--ONLY SHOW FOR INTEGRATED (STANDALONE) AUTH MODE-->
      <template v-if="isStandaloneAuth">
        <vuestro-card v-if="mode === 'Create'">
          <vuestro-text-field size="lg"
                              variant="outline"
                              placeholder="Password"
                              hint="Temporary password"
                              v-model="liveItem.password">
          </vuestro-text-field>
        </vuestro-card>
        <vuestro-card v-else-if="mode === 'Edit'">
          <vuestro-panel collapsible collapsed>
            <template #title>Reset Password</template>
            <vuestro-container>
              <p>To reset the user's password, enter a temporary password for them here. They will be prompted to change their password when they log in.</p>
              <vuestro-text-field size="lg"
                                stretch
                                variant="outline"
                                placeholder="Temporary Password"
                                v-model="liveItem.password"
                                :readonly="isReadOnly">
              </vuestro-text-field>
            </vuestro-container>
          </vuestro-panel>
        </vuestro-card>
      </template>
      <vuestro-card>
        <vuestro-panel collapsible>
          <template #title>Roles</template>
          <template #toolbar>
            <vuestro-dropdown v-if="!isReadOnly"
                              click-to-open
                              right
                              close-on-content-click>
              <template #button>
                <vuestro-button round no-border size="sm">
                  <vuestro-icon name="plus"></vuestro-icon>
                </vuestro-button>
              </template>
              <vuestro-pill v-for="r in roles" :key="r._id"
                            geopattern clickable
                            @click="onAddRole(r)">
                <template #title>{{ r.name }}</template>
              </vuestro-pill>
            </vuestro-dropdown>
          </template>
          <vuestro-container>
            <div v-if="liveItem.role_ids.length === 0" class="no-roles">
              No roles defined for this user, click + to add a role<hint-arrow></hint-arrow>
            </div>
            <vuestro-pill v-for="r in liveItem.role_ids" :key="r"
                          geopattern
                          :closable="!isReadOnly"
                          @close="onRemoveRole(r)">
              <template #title>{{ rolesGetById(r).name }}</template>
            </vuestro-pill>
          </vuestro-container>
        </vuestro-panel>
      </vuestro-card>
    </vuestro-container>
    <template #buttons>
      <div class="footer-left">
        <vuestro-button v-if="!isReadOnly" checkbox size="sm" v-model="liveItem.enabled">
          User Account Enabled
        </vuestro-button>
        <div v-else>
          Last Login: {{ liveItem.firstLogin || 'Never' }}
        </div>
      </div>
      <vuestro-button @click="open = false">Cancel</vuestro-button>
      <vuestro-button v-if="!isReadOnly" variant="success" value @click="onSave" :disabled="!valid">Save</vuestro-button>
    </template>
  </vuestro-modal>
</template>

<script>

/* global _, Vuex */

export default {
  name: 'UserModal',
  data() {
    return {
      open: false,
      mode: null,
      liveItem: null,
      // the default item
      defaultItem: {
        enabled: true,
        fullname: '',
        username: '',
        email: '',
        password: '',
        role_ids: [],
        firstLogin: null,
        lastLogin: null,
      },
    };
  },
  computed: {
    ...Vuex.mapGetters('roles', ['roles', 'rolesGetById']),
    isReadOnly() {
      return this.mode === 'View';
    },
    valid() {
      return this.liveItem.fullname.length > 0 &&
             this.liveItem.username.length > 0 &&
             this.liveItem.email.length > 0 &&
             (this.mode === 'Edit' || this.liveItem.password.length > 0);
    },
    isStandaloneAuth() {
      return true;
    },
  },
  methods: {
    openCreate() {
      this.liveItem = _.defaultsDeep({}, this.defaultItem);
      this.open = true;
      this.readonly = false;
      this.mode = 'Create';
    },
    openView(obj) {
      this.liveItem = _.defaultsDeep({}, obj, this.defaultItem);
      this.open = true;
      this.readonly = true;
      this.mode = 'View';
    },
    openEdit(obj) {
      this.liveItem = _.defaultsDeep({}, obj, this.defaultItem);
      this.open = true;
      this.readonly = false;
      this.mode = 'Edit';
    },
    onSave() {
      this.$nextTick(() => {
        if (this.mode === 'Create') {
          this.$store.dispatch('admin/createUser', _.cloneDeep(this.liveItem));
        } else {
          this.$store.dispatch('admin/updateUser', _.cloneDeep(this.liveItem));
        }
        this.open = false;
      });
    },
    onAddRole(r) {
      if (this.liveItem.role_ids.indexOf(r._id) < 0) {
        this.liveItem.role_ids.push(r._id);
      }
    },
    onRemoveRole(r_id) {
      let idx = this.liveItem.role_ids.indexOf(r_id);
      if (idx > -1) {
        this.liveItem.role_ids.splice(idx, 1);
      }
    },
  }
};

</script>

<style scoped>

.footer-left {
  margin-left: 0.4em;
  margin-right: auto;
}

.no-roles {
  margin-left: auto;
}
.hint-arrow {
  height: 40px;
  width: 40px;
  margin-left: 0.4em;
  margin-right: -0.1em;
  margin-top: -1em;
  margin-bottom: -0.5em;
}

</style>