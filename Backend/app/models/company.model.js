module.exports = mongoose => {
  const Company = mongoose.model
  ("company",  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
  );
  return Company;
};