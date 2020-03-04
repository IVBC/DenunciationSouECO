export const environment = {
  production: true,
  URL_API: window["env"]['apiUrl'] || "http://localhost:3333",
  debug: window["env"]["debug"] || false // http://localhost:3333' // http://206.189.194.249
};
