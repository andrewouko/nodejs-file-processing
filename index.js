var fs = require('fs');
const { groupBy } = require('lodash')
var obj;
fs.readFile('data.json', 'utf8', function (err, data) {
  if (err) throw err;
  const obj = JSON.parse(data);
  //   console.log(obj)
  const grouped = groupBy(obj, bank => bank.bank_name)

  console.log(grouped)
  const formatted = Object.keys(grouped).map((v, i) => {
    const branches  = grouped[v].map(branch => {
      return {
        '@attributes': {
          branch_name: branch.branch_name,
          branch_code: branch.branch_code
        }
      }
    })
    return {
      bank_name: v,
      clearing_centre: (i + 1),
      branches: {
        branch: branches
      }
    }
  })
  const file_content = JSON.stringify(formatted, null, 2)
  fs.writeFile("banks.json", file_content, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  })
});