<template>
  <vuestro-container column no-wrap>
    <vuestro-container grow="0">
      <vuestro-card color="var(--vuestro-cyan)">
        <template #heading>Settings</template>
      </vuestro-card>
    </vuestro-container>
    <vuestro-container no-wrap>
      <!--LEFT COLUMN-->
      <vuestro-card cols="6">
        <!--PROFILE-->
        <vuestro-panel no-stretch>
          <template #title>Profile</template>
          <template #toolbar>
            <span class="vuestro-text-muted vuestro-text-smaller">
              User ID: {{ profile._id }}
            </span>
          </template>
          <vuestro-container>
            <vuestro-card>
              <template #description>Email</template>
              {{ profile.email || 'None' }}
            </vuestro-card>
            <vuestro-card>
              <template #description>Roles</template>
              <vuestro-container gutter="none">
                <vuestro-pill geopattern v-for="r of profile.roles" :key="r.name">
                  <template #value>{{ r.name }}</template>
                </vuestro-pill>
              </vuestro-container>
            </vuestro-card>
            <vuestro-card v-if="profile.permissions.length > 0">
              <template #description>Consolidated Permissions From All Roles</template>
              <vuestro-container gutter="none">
                <vuestro-pill geopattern v-for="p of profile.permissions" :key="p">
                  <template #title>{{ rolesGetPermissionTitleByValue(p) }}</template>
                </vuestro-pill>
              </vuestro-container>
            </vuestro-card>
            <vuestro-card>
              <template #description>First Login</template>
              {{ profile.firstLogin | vuestroDate }}
            </vuestro-card>
            <vuestro-card>
              <template #description>Last Login</template>
              {{ profile.lastLogin | vuestroDate }}
            </vuestro-card>
            <vuestro-card>
              <template #description>Remaining Session</template>
              {{ authSessionRemainingSeconds | vuestroHMS }}
            </vuestro-card>
            <vuestro-card>
              <!--TOKEN-->
              <vuestro-panel collapsible collapsed variant="shaded">
                <template #title>Show API Token</template>
                <div class="token">{{ token }}</div>
              </vuestro-panel>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>

      </vuestro-card>
      <!--RIGHT COLUMN-->
      <vuestro-card cols="6">
        <vuestro-panel no-stretch>
          <template #title>UI</template>
          <vuestro-container items-start column>
            <vuestro-button checkbox :value="isDarkUI" @click="toggleIsDarkUI">Dark UI</vuestro-button>
            <vuestro-button checkbox :value="isSidebarMini" @click="setSidebarMini(!isSidebarMini)">Mini Sidebar</vuestro-button>
          </vuestro-container>
        </vuestro-panel>


      </vuestro-card>
    </vuestro-container>
  </vuestro-container>
</template>

<script>

/* global Vuex */

export default {
  name: 'Settings',
  computed: {
    ...Vuex.mapGetters('settings', ['isDarkUI', 'isSidebarMini']),
    ...Vuex.mapGetters('auth', ['token', 'authSessionRemainingSeconds']),
    ...Vuex.mapGetters('profile', ['profile']),
    ...Vuex.mapGetters('roles', ['rolesGetPermissionTitleByValue']),
  },
  methods: {
    ...Vuex.mapActions('settings', ['toggleIsDarkUI', 'setSidebarMini']),
  }
};

</script>

<style scoped>

.token {
  margin: 0.4em;
  word-break: break-all;
  white-space: pre-wrap;
  font-family: monospace;
}


</style>