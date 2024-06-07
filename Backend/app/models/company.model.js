module.exports = mongoose => {
  const Company = mongoose.model
  ("company",  mongoose.Schema(
    {
      companyName: {
        type: String,
        required: true,
      },
      companyEmail: {
        type: String,
      },
      password:{
        type: String,  
      },
      companyDescription: {
        type: String,
      },
      companyLink: {
        type: String,
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
    },
    {
      timestamps: true,
    }
  )
  );
  return Company;
};