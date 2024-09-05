const BaseJoi = require("joi");

const JoiConfig = BaseJoi.defaults((schema) => {
  return schema.options({
    convert: false,
    abortEarly: false,
    stripUnknown: false,
  });
});

module.exports = JoiConfig;
