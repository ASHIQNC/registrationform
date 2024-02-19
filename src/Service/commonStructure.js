import axios from "axios";

export const commonStructure = async (method, url, body, header) => {
  let config = {
    method,
    url,
    data: body,
    header: header ? header : "application/json",
  };
  return await axios(config)
    .then((response) => {
      return response;
    })
    .catch((response) => {
      return response;
    });
};
