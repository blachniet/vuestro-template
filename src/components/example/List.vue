<template>
  <vuestro-container no-wrap>
    <vuestro-card cols=3 color="var(--vuestro-orange)">
      <template #heading>
        <span>Sidebar List</span>
        <vuestro-container grow="0" gutter="none" justify="flex-end">
					<vuestro-button pill @click="$refs.exampleModal.openCreate()" variant="success" value>
					  <template #icon>
  						<vuestro-icon name="plus"></vuestro-icon>
						</template>
						New
					</vuestro-button>
					<vuestro-button round no-border @click="loadExampleData">
						<vuestro-icon name="sync-alt" :pulse="!isExampleDataLoaded"></vuestro-icon>
					</vuestro-button>
				</vuestro-container>
      </template>
      <template v-if="exampleData.length > 0">
        <vuestro-list-item v-for="item in exampleData" :key="item.name"
                           :selected="selectedId == item._id"
                           @click="onSelectItem(item)">
          <template #title>{{ item.name }}</template>
          <template #description>{{ item.description }}</template>
          <template #buttons>
            <vuestro-button round no-border size="sm" @click="$refs.exampleModal.openEdit(item)">
              <vuestro-icon name="pen"></vuestro-icon>
            </vuestro-button>
            <vuestro-confirm size="sm" @confirm="deleteExampleItem(item)"></vuestro-confirm>
          </template>
        </vuestro-list-item>
      </template>
      <vuestro-no-data v-else>
        No items
      </vuestro-no-data>
    </vuestro-card>
    <vuestro-card cols=9>
      <vuestro-panel>
        <template #title>Details</template>
        <template #toolbar>
          <vuestro-button v-if="selectedId"
                          pill no-border size="sm" variant="info"
                          @click="vuestroDownloadAsJson(selectedItem, 'data.json')">
            <template #icon>
              <vuestro-icon name="download"></vuestro-icon>
            </template>
            Export
          </vuestro-button>
        </template>
        <vuestro-container>
          <vuestro-object-browser v-if="selectedId"
                                  :data="selectedItem">
          </vuestro-object-browser>
          <div v-else>Select a data item</div>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>
    <example-modal ref="exampleModal"></example-modal>
  </vuestro-container>
</template>

<script>

/* global Vuex */

import ExampleModal from '@/components/example/ExampleModal';

export default {
  name: 'List',
  components: {
    ExampleModal,
  },
  data() {
    return {
      selectedId: null, // the _id of the selected item
    };
  },
  computed: {
    ...Vuex.mapGetters('example', ['exampleData',
                                   'isExampleDataLoaded',
                                   'exampleDataById']),
    // this is a computed prop which always returns the selected item
    // (or undefined if selectedId hasn't been set yet)
    selectedItem() {
      return this.exampleDataById(this.selectedId);
    },
  },
  methods: {
    ...Vuex.mapActions('example', ['loadExampleData',
                                   'deleteExampleItem']),
    onSelectItem(item) {
      // we only assign the id here to make us use Vuex for the item data
      // ...we don't want copies of the data lying around
      this.selectedId = item._id;
    },
  },
};

</script>

<style scoped>

</style>