as feature
/**
|--------------------------------------------------
| Meteor.call("fetchOneEnAdvise", skip || 0, (err, res) => {
      if (err)
        throw new Error(
          "occured when fetching advise , check the skip arg",
          err
        );
      if (res === undefined) {
        seteEnd(true);
      } else {
        setAdvise((prev) => {
          return [...new Set([...prev, res])];
        });
      }
    });
    Meteor.call("fetchOneArAdvise", skip || 0, (err, res) => {
      if (err)
        throw new Error(
          "occured when fetching advise , check the skip arg",
          err
        );
      if (res === undefined) {
        seteEnd(true);
      } else {
        setAdvise((prev) => {
          return [...new Set([...prev, res])];
        });
      }
    });
|--------------------------------------------------
*/