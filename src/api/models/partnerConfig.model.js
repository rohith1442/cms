import mongoose from "mongoose";
const { Schema, model } = mongoose;
class PartnerConfigModel {
  static get schema() {
    return new Schema({
      partnerName: {
        type: String,
        required: true,
      },
      headersMapping: {
        type: Object,
        required: true,
      },
      partnerId: {
        type: String,
        required: true,
      },
    });
  }
}

const PartnerConfig = model("partnerconfig", PartnerConfigModel.schema);
export default PartnerConfig;
