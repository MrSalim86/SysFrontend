const apiUrl = "http://localhost:8080/sysproject";

function makeOptions(method, body) {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function fetchData(url) {
  return fetch(`${apiUrl}${url}`, makeOptions("GET")).then(handleHttpErrors);
}

function postData(url, data) {
  return fetch(`${apiUrl}${url}`, makeOptions("POST", data)).then(
    handleHttpErrors
  );
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const facade = { fetchData, postData };

export default facade;
