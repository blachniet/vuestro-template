<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-danger)">
      <template #heading>
        <span>Table Example</span>
        <vuestro-container gutter="none" grow="0">
          <vuestro-button pill
                          variant="success"
                          value
                          @click="$refs.exampleModal.openCreate()">
            <template #icon>
              <vuestro-icon name="plus"></vuestro-icon>
            </template>
            New
          </vuestro-button>
          <vuestro-button pill no-border @click="loadExampleData">
            <template #icon>
              <vuestro-icon name="sync-alt" :pulse="!isExampleDataLoaded"></vuestro-icon>
            </template>
            Refresh
          </vuestro-button>
          <vuestro-button pill no-border variant="info" @click="vuestroDownloadAsJson(exampleData, 'data.json')">
            <template #icon>
              <vuestro-icon name="download"></vuestro-icon>
            </template>
            Export
          </vuestro-button>
        </vuestro-container>
      </template>
      <template #description>This table is wired up to use volante-template as a backend for CRUD operations on example data.</template>
      <vuestro-panel>
        <vuestro-table :options="options"
                       :data="exampleData">
          <template #row-buttons="{ item }">
            <vuestro-button round no-border @click="$refs.exampleModal.openView(item)">
              <vuestro-icon name="eye"></vuestro-icon>
            </vuestro-button>
            <vuestro-button round no-border @click="$refs.exampleModal.openEdit(item)">
              <vuestro-icon name="edit"></vuestro-icon>
            </vuestro-button>
            <vuestro-confirm size="sm" @confirm="deleteExampleItem(item)"></vuestro-confirm>
          </template>
          <template #no-data>
            No Example Data Items
          </template>
        </vuestro-table>
      </vuestro-panel>
    </vuestro-card>
    <example-modal ref="exampleModal"></example-modal>
  </vuestro-container>
</template>

<script>

/* global Vuex */

import ExampleModal from '@/components/example/ExampleModal';
import CheckOrX from '@/components/example/CheckOrX';

export default {
  name: 'Table',
  components: {
    ExampleModal,
    CheckOrX,
  },
  data() {
    return {
      search: '',
      options: {
        columns: [
          {
            title: 'Name',
            field: 'name',
            sortable: true,
          },
          {
            title: 'Description',
            field: 'description',
          },
          {
            title: 'Age',
            field: 'age',
            sortable: true,
          },
          {
            title: 'Subscribed',
            field: 'subscribed',
            component: CheckOrX
          },
        ],
      },
    };
  },
  computed: {
    ...Vuex.mapGetters('example', ['exampleData', 'isExampleDataLoaded']),
  },
  methods: {
    ...Vuex.mapActions('example', ['loadExampleData', 'deleteExampleItem']),
  },
};

</script>

<style scoped>

.vuestro-table td {
  padding-left: 12px;
}

</style>