import Joi from "joi";
Joi.objectId = require('joi-objectid')(Joi)

const locationValidator = Joi.object()
  .keys({
    type: Joi.string()
      .required()
      .valid(["Point"]),
    coordinates: Joi.array().ordered([
      Joi.number()
      .min(-180)
      .max(180)
      .required(),
      Joi.number()
      .min(-90)
      .max(90)
      .required()
    ]).required()
  }) //.required()

const chatroomValidator = Joi.object().keys({
  name: Joi.string()
    .max(60)
    .required(),
  location: locationValidator,
  visibility: Joi.string().valid(["PUBLIC", "PRIVATE"])
  // admin: Joi.objectId().required()
});

const userValidator = Joi.object().keys({
  username: Joi.string()
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  location: locationValidator
});

const userLoginValidator = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});

const chatroomRequestValidator = Joi.object().keys({
  message: Joi.string().required()
});

const validateChatroomRequestValidator = Joi.object().keys({
  request: Joi.objectId().required(),
  status: Joi.string().required().valid(["ACCEPTED", "REJECTED"])
});

const schemas = {
  Chatroom: chatroomValidator,
  User: userValidator,
  UserLogin: userLoginValidator,
  ChatroomRequest: chatroomRequestValidator,
  ValidateChatroomRequest: validateChatroomRequestValidator,
};

export default schemas;