import Dexie from "dexie";

var db = new Dexie('myDB')
db.Version(1).stores({foo:"_id"})
db.foo.put({_id: 1, bar: 'hello rollup'}).then(_id => {
    return db.foo.get(_id);
}).then (item => {
    alert ("Found: " + item.bar);
})