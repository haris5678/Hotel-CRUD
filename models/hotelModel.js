const mongoos = require("mongoose");

const HotelSchema = new mongoos.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  createdBy: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

module.exports = mongoos.model("Hotel", HotelSchema);
