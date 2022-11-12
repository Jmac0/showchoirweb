import mongoose from 'mongoose';

type Members = {
  active: boolean;
  email: string;
  go_cardless_id: string;
  first_name: string;
  last_name: string;
  address: string;
};

const MembersSchema = new mongoose.Schema<Members>({
  active: Boolean,
  email: String,
  go_cardless_id: String,
  first_name: String,
  last_name: String,
  address: String,
});
// string must match collection name
module.exports =
  mongoose.models.Members || mongoose.model('Members', MembersSchema);
