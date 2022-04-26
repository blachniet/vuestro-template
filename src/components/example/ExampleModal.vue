<template>
  <vuestro-modal :active.sync="open" @after-open="$refs.name.focus()">
    <template #title>{{ mode }} Example Data</template>
    <vuestro-container v-if="liveItem">
      <vuestro-card cols="6">
        <vuestro-text-field ref="name"
                            size="lg"
                            variant="outline"
                            placeholder="Name"
                            v-model="liveItem.name"
                            :readonly="isReadOnly">
        </vuestro-text-field>
      </vuestro-card>
      <vuestro-card cols="6">
        <vuestro-text-field ref="description"
                            size="lg"
                            variant="outline"
                            placeholder="Description"
                            v-model="liveItem.description"
                            :readonly="isReadOnly">
        </vuestro-text-field>
      </vuestro-card>
      <vuestro-card cols="6">
        <vuestro-text-field ref="age"
                            size="lg"
                            variant="outline"
                            placeholder="Age"
                            :validate="isNumber"
                            v-model="liveItem.age"
                            :readonly="isReadOnly">
        </vuestro-text-field>
      </vuestro-card>
    </vuestro-container>
    <template #buttons>
      <div class="footer-left">
        <vuestro-button checkbox size="sm" :disabled="isReadOnly" v-model="liveItem.subscribed">
          Subscribed
        </vuestro-button>
      </div>
      <vuestro-button @click="open = false">Cancel</vuestro-button>
      <vuestro-button v-if="!isReadOnly" variant="success" value @click="onSave" :disabled="!valid">Save</vuestro-button>
    </template>
  </vuestro-modal>
</template>

<script>

/* global _, Vuex */

export default {
  name: 'ExampleModal',
  data() {
    return {
      open: false,
      mode: null,
      liveItem: {},
      // the default item
      defaultItem: {
        name: '',
        description: '',
        age: null,
        subscribed: true,
      },
    };
  },
  computed: {
    isReadOnly() {
      return this.mode === 'View';
    },
    valid() {
      return this.liveItem.name.length > 0 &&
             this.liveItem.description.length > 0 &&
             this.isNumber(this.liveItem.age) === true;
    },
  },
  methods: {
    ...Vuex.mapActions('example', ['addExampleItem', 'updateExampleItem']),
    isNumber(d) {
      return _.isFinite(_.toNumber(d)) || 'should be number';
    },
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
      if (this.mode === 'Create') {
        this.addExampleItem(_.cloneDeep(this.liveItem));
      } else {
        this.updateExampleItem(_.cloneDeep(this.liveItem));
      }
      this.open = false;
    },
  }
};

</script>

<style scoped>

.footer-left {
  margin-left: 0.4em;
  margin-right: auto;
}

</style>