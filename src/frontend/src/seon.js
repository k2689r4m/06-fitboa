import axios from "axios";
import store from "./store";

// import router from "./router";

// const _domain = "http://plushdev.com";

// axios.defaults.baseURL = "/api";
axios.defaults.headers.common.Accept = "application/json";

// async function _login(domain) {
//   let maxCnt = 3;

//   while (maxCnt > 0) {
//     try {
//       const re = await axios.post(domain + "/auth", {
//         // UUID: myUUID,
//         GuestId: "2b41q7nkvlft8dc1q7nkvlft8dd",
//       });
//       axios.defaults.headers.common["jwt"] = re.headers.jwt;

//       return re;
//     } catch (e) {
//       maxCnt--;
//     }
//   }
// }
const methods = {
  getCookie: (name) => {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  },
  apiGET: async (path) => {
    let msg = "잠시후 다시 시도 해주세요.";

    try {
      const re = await axios.get(path);
      return re;
    } catch (e) {
      if (
        e.response &&
        e.response.data &&
        e.response.data.message &&
        e.response.status == 400
      ) {
        store.commit("updateError", e.response.data.message);
        return;
      } else if (
        e.response &&
        e.response.data &&
        e.response.data.message &&
        e.response.status == 500
      ) {
        msg = e.response.data.message;
        return;
      } else if (e.response && e.response.data && e.response.data.message) {
        msg = e.response.data.message;
      }
      // alert(msg);
      console.log(msg);
    }
  },

  apiPOST: async (path, param) => {
    let msg = "잠시후 다시 시도 해주세요.";
    try {
      const re = await axios.post(path, param);
      return re;
    } catch (e) {
      if (
        e.response &&
        e.response.data &&
        e.response.data.message &&
        e.response.status == 400
      ) {
        store.commit("updateError", e.response.data.message);
        return;
      } else if (
        e.response &&
        e.response.data &&
        e.response.data.message &&
        e.response.status == 500
      ) {
        msg = e.response.data.message;
        return;
      } else if (e.response && e.response.data && e.response.data.message) {
        msg = e.response.data.message;
      }

      // alert(msg);
      console.log(msg);
    }

    // let maxCnt = 3;
    // let msg = "잠시후 다시 시도 해주세요.";
    // while (maxCnt > 0) {
    //   try {
    //     const re = await axios.post(_domain + path, param);
    //     axios.defaults.headers.common["jwt"] = re.headers.jwt;
    //     return re;
    //   } catch (e) {
    //     if (
    //       (e.response && e.response.status === 418) ||
    //       e.response.status === 401
    //     ) {
    //       await _login(_domain);
    //     } else if (
    //       e.response &&
    //       e.response.data &&
    //       e.response.data.message &&
    //       e.response.status === 400
    //     ) {
    //       const re = { data: { code: e.response.status } };
    //       msg = e.response.data.message;
    //       alert(msg);
    //       return re;
    //       // break;
    //     } else if (e.response && e.response.data && e.response.data.message) {
    //       msg = e.response.data.message;
    //     }
    //     maxCnt--;
    //   }
    // }
    // alert(msg);
  },

  apiFORM: async (path, param, files) => {
    let msg = "잠시후 다시 시도 해주세요.";
    var frm = new FormData();
    // var photoFile = null;

    // if (fb.length > 0) {
    //   photoFile = document.getElementById(byid);
    // }
    // console.log(fb);

    for (let i = 0; i < files.length; i++) {
      if (files[i] != null) {
        frm.append("files", files[i]);
      }
    }

    for (let i = 0; i < Object.keys(param).length; i++) {
      frm.append(Object.keys(param)[i], Object.values(param)[i]);
    }

    for (var pair of frm.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const re = await axios.post(path, frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return re;
    } catch (e) {
      if (
        e.response &&
        e.response.data &&
        e.response.data.message &&
        e.response.status == 400
      ) {
        store.commit("updateError", e.response.data.message);
        return;
      } else if (
        e.response &&
        e.response.data &&
        e.response.data.message &&
        e.response.status == 500
      ) {
        msg = e.response.data.message;
        return;
      } else if (e.response && e.response.data && e.response.data.message) {
        msg = e.response.data.message;
      }

      alert(msg);
    }
  },

  getBodyType: (type) => {
    if (type == 1) {
      return "A";
    } else if (type == 2) {
      return "I";
    } else if (type == 3) {
      return "O";
    } else if (type == 4) {
      return "V";
    } else {
      return false;
    }
  },
};

export default {
  install(Vue) {
    Vue.prototype.$getCookie = methods.getCookie;
    Vue.prototype.$apiGET = methods.apiGET;
    Vue.prototype.$apiPOST = methods.apiPOST;
    Vue.prototype.$apiFORM = methods.apiFORM;
    Vue.prototype.$getBodyType = methods.getBodyType;
  },
};
