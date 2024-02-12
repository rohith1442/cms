import mongoose from "mongoose";
const { Schema, model } = mongoose;
class CaseModel {
  static get schema() {
    return new Schema(
      {
        bankName: {
          type: String,
          required: true,
        },
        propertyName: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        borrowerName: {
          type: String,
          required: true,
        },
        institutionName: {
          type: String,
          required: true,
        },
        propertyType: { type: String, required: true },
        partnerId: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );
  }
}
const Case = model("case", CaseModel.schema);
export default Case;
