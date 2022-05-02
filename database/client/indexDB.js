
import { Meteor } from "meteor/meteor";
import Dexie from "dexie";

Meteor.isClient(() => {
  var db = new Dexie('mydb');
  db.version(1).stores({ foo: 'id' });

  unique.id = parseInt(localStorage.getItem('count'))
  function unique() {
    localStorage.setItem('count', unique.id)
    return unique.id++
  }

  const insert = (doc) => {
    // delete(doc._id)
    db.foo.put({ id: unique(), ...doc }).then(id => {
      console.log(id);
    })
  }

  const findOne = (selector) => {
    return db.foo.get(selector)
  }

  const find = async () => {
    try {
      let res = await db.foo.toArray()
      console.log(res, 'hoooo');
      return res
    } catch {

    }
  }

  const update = (id, newValu) => {
    db.foo.update(id, newValu)
  }

  const remove = (selector) => {
    db.foo.delete(selector)
  }
  const useIndexDB = (collectionName) => {
    return { insert, remove, find, findOne, update }
  }

  export { useIndexDB }
})
