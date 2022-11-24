import mongoose from 'mongoose';
import { MemberType } from '../../types';

const MembersSchema = new mongoose.Schema<MemberType>({
  active: Boolean,
  mandate: String,
  memberOption: String,
  email: String,
  go_cardless_id: String,
  first_name: String,
  last_name: String,
  address: String,
});
// string must match collection name
module.exports =
  mongoose.models.Members || mongoose.model('Members', MembersSchema);

