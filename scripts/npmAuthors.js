const search = require("libnpmsearch")
async function run() {
  console.log(await search("author:dudesamld"))
}

run()
