
let timeout = 7000;
let timeoutMsg = "Server timeout";
export const mutateGraph = function (apolloClient, vars, scheme) {
  return new Promise(function (resolve, reject) {
    let timeoutCallMutate = setTimeout(() => {
      clearTimeout(timeoutCallMutate);
      reject(timeoutMsg);
    }, timeout);
    apolloClient
      .mutate({
        fetchPolicy: "no-cache",
        mutation: scheme,
        variables: vars,
      })
      .then((res) => {
        clearTimeout(timeoutCallMutate);
        resolve(res.data);
      })
      .catch((err) => {
        clearTimeout(timeoutCallMutate);
        reject(err);
      });
  });
};

export const queryGraph = function (apolloClient, vars = {}, scheme, fetch_Policy) {
  return new Promise(function (resolve, reject) {
    let timeoutCall = setTimeout(() => {
      clearTimeout(timeoutCall);
      reject(timeoutMsg);
    }, timeout);
    apolloClient
      .query({
        fetchPolicy: fetch_Policy || "no-cache",
        query: scheme,
        variables: vars,
      })
      .then((res) => {
        clearTimeout(timeoutCall);
        resolve(res.data);
      })
      .catch((err) => {
        console.log("ERROR", err)
        clearTimeout(timeoutCall);
        if (err.networkError != null && err.networkError.result != null && err.networkError.result.errors != null)
          reject(err.networkError.result.errors[0].message);
        else
          reject('Error')
      });
  });
};
