#! /usr/bin/env node

const code = require('../dist/code');

const runCode = async () => {
  const result = await code.run('<h1>Here is a sample template {{=it.func.camel(it.foo,true)}}</h1>', {
    foo: 'with doT coffee_hello_377',
  });
  console.log(`====>${result} `);
};

runCode();
const result = 'HelloWord'.replace(/([A-Z])/g, '_$1');
console.log(result.startsWith('_') ? result.substring(1) : result);

const data =   {
  id: '1',
  name: 'Preset1',
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: 'repeat(2,320px)',
    gridRowGap: '30px',
    gridColumnGap: '30px',
  },
  containerStyle: {
    width: '90vw',
    height: '100%',
    margin: '30px auto 0',
  },
  item: [
    {
      id: '1',
      index: 1,
      columnStart: 1,
      rowStart: 1,
      component: 'FinePlugin'
    },
    {
      id: '2',
      index: 2,
      columnStart: 2,
      rowStart: 1,
      component: {
        name: 'FineConfig',
      },
    },
    {
      id: '3',
      index: 3,
      columnStart: 3,
      rowStart: 1,
      component: {
        name: 'KylinAPIClient',
      },
    },
    {
      id: '4',
      index: 4,
      columnStart: 4,
      rowStart: 1,
      component: {
        name: 'DemoOne',
      },
    },
    {
      id: '5',
      index: 5,
      columnStart: 1,
      rowStart: 2,
      component: {
        name: 'DemoTwo',
      },
    },
    {
      id: '6',
      index: 6,
      columnStart: 2,
      rowStart: 2,
      component: {
        name: 'DemoGrid',
      },
    },
    {
      id: '7',
      index: 7,
      columnStart: 3,
      rowStart: 2,
      component: {
        name: 'BackgroundManagement',
      },
    },
    {
      id: '8',
      index: 8,
      columnStart: 4,
      rowStart: 2,
      component: {
        name: 'WorkPlan',
      },
    },
  ],
  itemStyle: { border: '1px #888 dashed', borderRadius: '16px' },
};
