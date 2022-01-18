import zangodb from "zangodb";
// init db
const db = new zangodb.Db("Life-Advise", 3, {
  advises: ["advises"],
  ids: ["ids"],
});

const useIndexDB = (collectionName) => {
  const collection = db.collection(collectionName);
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
      .then((result) => {})
      .catch((err) => {});
  };

  // update specific (whole object or certain field)
  // selector could be _id or any property , newValue is the value to update to
  const update = (selector, newValu) => {
    collection
      .update(selector, newValu)
      .then((result) => {})
      .catch((err) => {});
  };

  // to remove specific doc from collection
  const remove = (selector) => {
    collection
      .remove(selector)
      .then((result) => {})
      .catch((err) => {});
  };
  return collection, { insert, fetchAll, fetchOne, remove, update };
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
