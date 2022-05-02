import zangodb from "zangodb";

// init db
const idb = new zangodb.Db("Life-Advise", {
  advises: ["advises"],
  ids: ["ids"],
});



const useIndexDB = (collectionName) => {
  var db = new localDB({ namespace: "myDB" }, () => {
    console.log('success');
    db.addCollection("advises")
    console.log(idb.collections, "collections");


  }, () => {
    console.log('error');
  })
  const collection = db.advises;

  const insertM = (doc) => {
    db.advises.upsert(doc, () => {
      console.log("insert successed");
    }, () => {
      return new Error("error when inserting data")
    })
  }

  


  // APIs
  // to fetch one doc selector could be _id or any property
  const fetchOne = (selector) => {
    return collection.findOne(selector);
  };

  // to fetch all docs in specific collection
  const fetchAll = async () => {
    const array = collection.find({}).toArray();
    return array;
  };

  // to insert doc or multiple docs to specific collection
  const insert = (docs) => {
    collection
      .insert(docs)
      .then((result) => { })
      .catch((err) => { });
  };

  // update specific (whole object or certain field)
  // selector could be _id or any property , newValue is the value to update to
  const update = (selector, newValu) => {
    collection
      .update(selector, newValu)
      .then((result) => { })
      .catch((err) => { });
  };

  // to remove specific doc from collection
  const remove = (selector) => {
    collection
      .remove(selector)
      .then((result) => { })
      .catch((err) => { });
  };
  return collection, { insertM, findM, findOneM, removeM, updateM, };
};
export { useIndexDB };
/**
|--------------------------------------------------
| import zangodb from "zangodb";
import React from "react";

export default function useIndexDB(collectionName) {
  // init db
  const db = new zangodb.Db("Life-Advise", { collectionName: [] });
  const collection = db.collection(collectionName);

  // APIs
  // to fetch one doc selector could be _id or any property
  const fetchOne = (selector) => {
  };

  // to fetch all docs in specific collection
  const fetchAll = () => {
  };

  // to insert doc or multiple docs to specific collection
  const insert = (docs) => {
    collection
      .insert(docs)
      .then((result) => {
      })
      .catch((err) => {
      });
  };

  // update specific (whole object or certain field)
  // selector could be _id or any property , newValue is the value to update to
  const update = (selector, newValu) => {
    collection
      .update(selector, newValu)
      .then((result) => {
      })
      .catch((err) => {
      });
  };

  // to remove specific doc from collection
  const remove = (selector) => {
    collection
      .remove(selector)
      .then((result) => {
      })
      .catch((err) => {
      });
  };
  return { insert, fetchAll, fetchOne, remove, update, collection };
}


|--------------------------------------------------
*/




const useCollection = (name) => {
  let collection
  if (name === "advises") {
    collection = idb.advises
    return collection
  } else {
    collection = idb.ids
  }
}
// adding ids and advises collections
// expose the CRUD APIs
// test it in cloud