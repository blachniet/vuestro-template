<template>
  <vuestro-container no-wrap>
    <vuestro-card cols=3 color="var(--vuestro-orange)">
      <template #heading>
        <span>Sidebar List</span>
        <vuestro-container grow="0" gutter="none">
					<vuestro-button pill @click="$refs.exampleModal.openCreate()" variant="success" value>
					  <template #icon>
  						<vuestro-icon name="plus"></vuestro-icon>
						</template>
						New
					</vuestro-button>
					<vuestro-button round no-border @click="loadExampleData">
						<vuestro-icon name="sync-alt" :pulse="loading"></vuestro-icon>
					</vuestro-button>
				</vuestro-container>
      </template>
      <template v-if="exampleData.length > 0">
        <vuestro-list-item v-for="i in exampleData" :key="i.name" :selected="selectedItem == i" @click="onClick(i)">
          <template #title>{{ i.name }}</template>
          <template #description>{{ i.description }}</template>
          <template #buttons>
            <vuestro-button round no-border size="sm" @click="$refs.exampleModal.openEdit(i)">
              <vuestro-icon name="pen"></vuestro-icon>
            </vuestro-button>
            <vuestro-tooltip rounded position="left" no-wrap>
              <template #content>
                Are you sure?
                <vuestro-button stretch dark rounded value variant="danger" @click="deleteExampleItem(item)">
                    Delete
                </vuestro-button>
              </template>
              <vuestro-button round no-border size="sm" variant="danger">
                <vuestro-icon name="trash"></vuestro-icon>
              </vuestro-button>
            </vuestro-tooltip>
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
          <vuestro-button v-if="selectedItem" pill no-border size="sm" variant="info" @click="vuestroDownloadAsJson(selectedItem, 'data.json')">
            <template #icon>
              <vuestro-icon name="download"></vuestro-icon>
            </template>
            Export
          </vuestro-button>
        </template>
        <vuestro-container>
          <vuestro-object-browser v-if="selectedItem" :data="selectedItem"></vuestro-object-browser>
          <div v-else>Select a data item</div>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>
    <example-modal ref="exampleModal"></example-modal>
  </vuestro-container>
</template>

<script>

/* global Vuex */

import ExampleModal from '@/components/ExampleModal';

export default {
  name: 'Objects',
  components: {
    ExampleModal,
  },
  data() {
    return {
      selectedItem: null,
    };
  },
  computed: {
    ...Vuex.mapGetters(['exampleData', 'isExampleDataLoaded']),
  },
  methods: {
    ...Vuex.mapActions(['loadExampleData', 'deleteExampleItem']),
    onClick(i) {
      this.selectedItem = i;
    },
  },
};

</script>

<style scoped>

</style>