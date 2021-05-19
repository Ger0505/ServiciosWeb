const URL = "https://servicios-api.herokuapp.com/";
// const URLFile = "http://localhost:3002/upload/";
const URLFile = "https://servicios-file.herokuapp.com/upload";

class API {
  async getBody(url, method, body) {
    let jsonObj = JSON.stringify(body);
    const query = await fetch(URL + url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonObj,
    });
    const data = query.json();
    return data;
  }

  async getData(url, method) {
    const query = await fetch(URL + url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
