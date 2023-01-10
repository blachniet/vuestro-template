<template>
  <vuestro-app title="vuestro"
               :authenticated="isLoggedIn"
               :loading="!isSettingsLoaded || !profileLoaded"
               :dark="isDarkUI">
    <template #navbar>
      <vuestro-navbar :routes="$router.options.routes">
        <template #logo>
          <div class="logo">vuestro</div>
        </template>
        <template #logo-separator>
          <vuestro-vr></vuestro-vr>
        </template>
        <template #default>
          <!--DEMO WIDGET-->
          <vuestro-text-field variant="search"
                              stretch
                              size="lg">
            <template #dropdown>
              <vuestro-container no-wrap gutter="none">
                <vuestro-card cols="4" color='var(--vuestro-purple)'>
                  <template #heading>Search Tools</template>
                  <vuestro-list-button>Lots</vuestro-list-button>
                  <vuestro-list-button>of</vuestro-list-button>
                  <vuestro-list-button>Tools</vuestro-list-button>
                </vuestro-card>
                <vuestro-card cols="8">
                  <template #heading>You can put anything in here to help users search...</template>
                  <vuestro-container gutter="none">
                    <vuestro-button v-for="b in 10" :key="b" @click="exampleText = `Button ${b}`">Button {{ b }}</vuestro-button>
                  </vuestro-container>
                </vuestro-card>
              </vuestro-container>
            </template>
          </vuestro-text-field>
        </template>
        <template #buttons>
          <vuestro-notifications grouped></vuestro-notifications>
          <vuestro-button no-border
                          size="lg"
                          show-slot-on-hover
                          variant="text"
                          @click="logout">
            <template #icon>
              <vuestro-icon name="sign-out-alt"></vuestro-icon>
            </template>
            Logout
          </vuestro-button>
        </template>
      </vuestro-navbar>
    </template>

    <template #sidebar>
      <vuestro-sidebar :mini="isSidebarMini"
                       :role="permissions"
                       @update:mini="onSetSidebar">
        <template #header="{ mini }">
          <vuestro-user-button variant="sidebar"
                               :user="profile.username"
                               :role="profile.fullname"
                               :avatar="profile.avatar"
                               :hideText="mini"
                               @click="onUserImgClick">
          </vuestro-user-button>
        </template>
      </vuestro-sidebar>
    </template>

    <template #login>
      <login :version="version"/>
    </template>

    <template #loading>
      <loading/>
    </template>

    <template #footer>
      <p class="default-footer">Vuestro ❤ Vue</p>
    </template>

  </vuestro-app>
</template>

<script>

/* global VERSION, Vuex */
import Login from '@/components/framework/Login';
import Loading from '@/components/framework/Loading';

export default {
  name: 'App',
  components: {
    Login,
    Loading,
  },
  data() {
    return {
      version: VERSION,
      search: '',
    };
  },
  computed: {
    ...Vuex.mapGetters('auth', ['isLoggingIn',
                                'isLoggedIn']),
    ...Vuex.mapGetters('profile', ['profileLoaded',
                                   'profile',
                                   'permissions']),
    ...Vuex.mapGetters('settings', ['isSettingsLoaded',
                                    'isSidebarMini',
                                    'isDarkUI']),
  },
  watch: {
    isLoggedIn(newVal) {
      newVal && this.preloadStores();
    },
  },
  beforeMount() {
    if (this.isLoggedIn) {
      this.preloadStores();
    }
  },
  methods: {
    ...Vuex.mapActions('auth', ['logout']),
    // pre-load any Vuex data here
    preloadStores() {
      console.info('pre-loading certain Vuex stores');
      this.$store.dispatch('auth/checkToken');
      this.$store.dispatch('profile/load');
      this.$store.dispatch('roles/load');
      this.$store.dispatch('settings/load');
      this.$store.dispatch('example/loadExampleData');
    },
    onUserImgClick() {
    },
    onSetSidebar(d) {
      this.$store.dispatch('settings/setSidebarMini', d);
    },
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
