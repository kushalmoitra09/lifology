
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
        reject(err.networkError.result.errors[0].message);
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
        clearTimeout(timeoutCall);
        // reject(err.networkError.result.errors[0].message);
      });
  });
};
