var fs = require('fs');
var AV = require('leanengine');
var ejs = require('ejs')
  , fs = require('fs')
  // , path = __dirname + '/functions.ejs'
  , str = fs.readFileSync('./report.ejs', 'utf8');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID || 'JppVTp1E3NxhFhfpRpoTwDco-gzGzoHsz',
  appKey: process.env.LEANCLOUD_APP_KEY || '5bkthPBiagLdabY4kl5cwbsj',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'XazG91yjNdqan9mWoSFQlxaf'
});
// 你可以使用 useMasterKey 在云引擎中开启 masterKey 权限，将会跳过 ACL 和其他权限限制。
AV.Cloud.useMasterKey();

var query = new AV.Query('Customer');
query.find().then(function (customers) {
  customers.forEach(function(customer) {
    var content = ejs.render(str,{
      name: customer.attributes.name,
      choice_test_before: customer.attributes.choice_test_before,
      choice_test_after: customer.attributes.choice_test_after,
      relation_person1_me: customer.attributes.relation_person1_me,
      relation_person1_opposite: customer.attributes.relation_person1_opposite,
      relation_person2_me: customer.attributes.relation_person2_me,
      relation_person2_opposite: customer.attributes.relation_person2_opposite,
      relation_person3_me: customer.attributes.relation_person3_me,
      relation_person3_opposite: customer.attributes.relation_person3_opposite,
      relation_person4_me: customer.attributes.relation_person4_me,
      relation_person4_opposite: customer.attributes.relation_person4_opposite,
      change_chair_test_before: customer.attributes.change_chair_test_before,
      change_chair_test_after: customer.attributes.change_chair_test_after,
      // phone: customer.attributes.phone_number,
      time:  customer.updatedAt.toLocaleDateString(),
    }, './');
    console.log(customer.attributes.choice_test_before)
    fs.writeFile('./dest/' + customer.attributes.name + '.html', content, function() {
      // console.log('haha')
    })
  });
})
