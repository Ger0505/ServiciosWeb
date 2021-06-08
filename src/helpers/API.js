import Session from "./Session";
const URL = "https://servicios-api.herokuapp.com/";
const URLFile = "https://servicios-file.herokuapp.com/upload";
const URL_ROOT = "https://servicios-app.herokuapp.com/#/login";

// const URL = "https://servicios-api.herokuapp.com/";
// const URLFile = "http://localhost:3002/upload/";
//const URL_ROOT = "http://localhost:3000/#/login";

class API {
  async getLogin(url, body) {
    let jsonObj = JSON.stringify(body);
    const query = await fetch(URL + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonObj,
    });
    const data = query.json();
    return data;
  }

  async getBody(url, method, body) {
    let jsonObj = JSON.stringify(body);
    const token = Session.getToken();
    if (!token) window.location = URL_ROOT;
    const query = await fetch(URL + url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: jsonObj,
    });
    const data = query.json();
    return data;
  }

  async getData(url, method) {
    const token = Session.getToken();
    if (!token) window.location = URL_ROOT;
    const query = await fetch(URL + url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = query.json();
    return data;
  }

  async getFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    fetch(URLFile, { method: "POST", body: formData });
  }
}

export default new API();
