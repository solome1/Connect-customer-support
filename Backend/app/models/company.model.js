const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

module.exports = mongoose => {
  const companySchema = new mongoose.Schema({
    companyName: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    companyDescription: {
      type: String,
    },
    companyLink: {
      type: String,
      required: true
    },
    employeeCount: {
      type: Number,
    },
    companyWebsite: {
      type: String,
    },
    primaryContact: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
  }, {
    timestamps: true,
  });

  companySchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
      expiresIn: "7d",
    });
    return token;
  };

  const Company = mongoose.model("company", companySchema);

  const validate = (data) => {
    const schema = Joi.object({
      companyName: Joi.string().required().label("Company Name"),
      companyEmail: Joi.string().email().required().label("Company Email"),
      password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
  };

  return { Company, validate };
};