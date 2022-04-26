<template>
  <vuestro-grid :layout="layout" local-storage-key="dashboard">
    <template #default="{ item }">
      <component :is="item.component" :data="item.data" :options="item.options"></component>
    </template>
    <template #footer>
      <div class="grid-footer">
        <vuestro-button pill @click="showAddWidgetModal = true">
          <vuestro-icon name="plus"></vuestro-icon>
        </vuestro-button>
      </div>
      <vuestro-modal :active.sync="showAddWidgetModal">
        <template #title>Add Widget</template>
        <vuestro-container>
          Fill this space with widget options
        </vuestro-container>
      </vuestro-modal>
    </template>
  </vuestro-grid>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      exampleData: [{
        stat: 0,
      }],
      layout: [],
      showAddWidgetModal: false,
    };
  },
  created() {
    this.loadDefaultLayout();
  },
  mounted() {
    setInterval(() => {
      this.exampleData.push({
        stat: this.exampleData[this.exampleData.length-1].stat++
      });
    }, 1000);
  },
  methods: {
    loadDefaultLayout() {
      this.layout = [
        {
          id: 'w0',
          component: 'vuestro-stat-panel',
          data: this.exampleData,
          options: {
            title: 'Users',
            color: 'var(--vuestro-primary)',
            icon: 'users',
            clickRoute: 'buttons',
          },
          position: {
            x: 0,
            y: 0,
            w: 3,
            h: 1,
          }
        },
        {
          id: 'w1',
          component: 'vuestro-stat-panel',
          data: [{ stat: 13328}],
          options: {
            title: 'Sales',
            color: 'var(--vuestro-purple)',
            icon: 'cash-register',
          },
          position: {
            x: 3,
            y: 0,
            w: 3,
            h: 1,
          }
        },
        {
          id: 'w2',
          component: 'vuestro-stat-panel',
          data: [{ stat: 2373}],
          options: {
            title: 'Logs',
            color: 'var(--vuestro-cyan)',
            icon: 'warehouse',
          },
          position: {
            x: 6,
            y: 0,
            w: 3,
            h: 1,
          }
        },
        {
          id: 'w3',
          component: 'vuestro-stat-panel',
          data: [{ stat: 'running'}],
          options: {
            title: 'Status',
            color: 'var(--vuestro-danger)',
            icon: 'exclamation'
          },
          position: {
            x: 9,
            y: 0,
            w: 3,
            h: 1,
          }
        },
        {
          id: 'w4',
          component: 'vuestro-chart-panel',
          data: this.getForceGraphData(),
          options: {
            title: 'Force Graph',
            component: 'vuestro-force-graph',
          },
          position: {
            x: 0,
            y: 1,
            w: 6,
            h: 3,
          }
        },
        {
          id: 'w6',
          component: 'vuestro-chart-panel',
          data: this.getAreaChart(),
          options: {
            title: 'Area Chart',
            component: 'vuestro-area-chart',
            series: [
              {
                title: 'Series 1',
                field: 'value1',
              },
              {
                title: 'Series 2',
                field: 'value2',
                render(d) {
                  return d.toFixed(2);
                },
              },
              {
                title: 'Series 3',
                field: 'value3',
              },
            ],
          },
          position: {
            x: 6,
            y: 1,
            w: 6,
            h: 3,
          }
        }
      ];
    },
    getAreaChart() {
      return [
        {
          key: '2019-10-01T00:00:00Z',
          value1: 2,
          value2: 12,
          value3: 8,
        },
        {
          key: '2019-10-01T01:00:00Z',
          value1: 2,
          value2: 6,
          value3: 19,
        },
        {
          key: '2019-10-01T02:00:00Z',
          value1: 3,
          value2: 33,
          value3: 8,
        },
        {
          key: '2019-10-01T03:00:00Z',
          value1: 6,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T04:00:00Z',
          value1: 1,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T05:00:00Z',
          value1: 1,
          value2: 13,
          value3: -2,
        },
        {
          key: '2019-10-01T06:00:00Z',
          value1: 32,
          value2: 13,
          value3: 2,
        },
      ];
    },
    getForceGraphData() {
      return {"nodes":
        [
          {"name":"Agricultural 'waste'"},
          {"name":"Bio-conversion"},
          {"name":"Liquid"},
          {"name":"Losses"},
          {"name":"Solid"},
          {"name":"Gas"},
          {"name":"Biofuel imports"},
          {"name":"Biomass imports"},
          {"name":"Coal imports"},
          {"name":"Coal"},
          {"name":"Coal reserves"},
          {"name":"District heating"},
          {"name":"Industry"},
          {"name":"Heating and cooling - commercial"},
          {"name":"Heating and cooling - homes"},
          {"name":"Electricity grid"},
          {"name":"Over generation / exports"},
          {"name":"H2 conversion"},
          {"name":"Road transport"},
          {"name":"Agriculture"},
          {"name":"Rail transport"},
          {"name":"Lighting & appliances - commercial"},
          {"name":"Lighting & appliances - homes"},
          {"name":"Gas imports"},
          {"name":"Ngas"},
          {"name":"Gas reserves"},
          {"name":"Thermal generation"},
          {"name":"Geothermal"},
          {"name":"H2"},
          {"name":"Hydro"},
          {"name":"International shipping"},
          {"name":"Domestic aviation"},
          {"name":"International aviation"},
          {"name":"National navigation"},
          {"name":"Marine algae"},
          {"name":"Nuclear"},
          {"name":"Oil imports"},
          {"name":"Oil"},
          {"name":"Oil reserves"},
          {"name":"Other waste"},
          {"name":"Pumped heat"},
          {"name":"Solar PV"},
          {"name":"Solar Thermal"},
          {"name":"Solar"},
          {"name":"Tidal"},
          {"name":"UK land based bioenergy"},
          {"name":"Wave"},
          {"name":"Wind"}
        ],
        "links": [
          {"source":0,"target":1,"value":124.729},
          {"source":1,"target":2,"value":0.597},
          {"source":1,"target":3,"value":26.862},
          {"source":1,"target":4,"value":280.322},
          {"source":1,"target":5,"value":81.144},
          {"source":6,"target":2,"value":35},
          {"source":7,"target":4,"value":35},
          {"source":8,"target":9,"value":11.606},
          {"source":10,"target":9,"value":63.965},
          {"source":9,"target":4,"value":75.571},
          {"source":11,"target":12,"value":10.639},
          {"source":11,"target":13,"value":22.505},
          {"source":11,"target":14,"value":46.184},
          {"source":15,"target":16,"value":104.453},
          {"source":15,"target":14,"value":113.726},
          {"source":15,"target":17,"value":27.14},
          {"source":15,"target":12,"value":342.165},
          {"source":15,"target":18,"value":37.797},
          {"source":15,"target":19,"value":4.412},
          {"source":15,"target":13,"value":40.858},
          {"source":15,"target":3,"value":56.691},
          {"source":15,"target":20,"value":7.863},
          {"source":15,"target":21,"value":90.008},
          {"source":15,"target":22,"value":93.494},
          {"source":23,"target":24,"value":40.719},
          {"source":25,"target":24,"value":82.233},
          {"source":5,"target":13,"value":0.129},
          {"source":5,"target":3,"value":1.401},
          {"source":5,"target":26,"value":151.891},
          {"source":5,"target":19,"value":2.096},
          {"source":5,"target":12,"value":48.58},
          {"source":27,"target":15,"value":7.013},
          {"source":17,"target":28,"value":20.897},
          {"source":17,"target":3,"value":6.242},
          {"source":28,"target":18,"value":20.897},
          {"source":29,"target":15,"value":6.995},
          {"source":2,"target":12,"value":121.066},
          {"source":2,"target":30,"value":128.69},
          {"source":2,"target":18,"value":135.835},
          {"source":2,"target":31,"value":14.458},
          {"source":2,"target":32,"value":206.267},
          {"source":2,"target":19,"value":3.64},
          {"source":2,"target":33,"value":33.218},
          {"source":2,"target":20,"value":4.413},
          {"source":34,"target":1,"value":4.375},
          {"source":24,"target":5,"value":122.952},
          {"source":35,"target":26,"value":839.978},
          {"source":36,"target":37,"value":504.287},
          {"source":38,"target":37,"value":107.703},
          {"source":37,"target":2,"value":611.99},
          {"source":39,"target":4,"value":56.587},
          {"source":39,"target":1,"value":77.81},
          {"source":40,"target":14,"value":193.026},
          {"source":40,"target":13,"value":70.672},
          {"source":41,"target":15,"value":59.901},
          {"source":42,"target":14,"value":19.263},
          {"source":43,"target":42,"value":19.263},
          {"source":43,"target":41,"value":59.901},
          {"source":4,"target":19,"value":0.882},
          {"source":4,"target":26,"value":400.12},
          {"source":4,"target":12,"value":46.477},
          {"source":26,"target":15,"value":525.531},
          {"source":26,"target":3,"value":787.129},
          {"source":26,"target":11,"value":79.329},
          {"source":44,"target":15,"value":9.452},
          {"source":45,"target":1,"value":182.01},
          {"source":46,"target":15,"value":19.013},
          {"source":47,"target":15,"value":289.366}
        ]
      };
    }
  }
};

</script>


<style scoped>


.drag {
  cursor: move;
}

.grid-footer {
  margin-left: 20px;
}

</style>