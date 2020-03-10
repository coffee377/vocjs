import * as client from '../src';

client.config({ host: '192.168.44.84', password: 'KYLIN', rawData: false });

test('Node Test', async () => {
  const result = await client.query({
    project: 'hospital_project',
    sql:
      'select quarter,sum(amount) as 销售额,count(*) as 刷卡次数, sum(amount)/count(*) as 次均消费 from ncms_hospital_ana_2' +
      ' where date_year = 2019 group by quarter order by quarter asc',
  });
  console.log(result);
});

test('Web Test', () => {});
