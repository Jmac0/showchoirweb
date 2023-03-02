import mongoose from 'mongoose';
import { MemberType } from '../../../types';

export const MembersSchema = new mongoose.Schema<MemberType>({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true }, // `email` must be unique,
  post_code: String,
  phone_number: String,
  street_address: String,
  town_city: String,
  county: String,
  age_confirm: Boolean,
  home_choir: String,
  consent: Boolean,
  active_mandate: Boolean,
  mandate: String,
  membership_type: String,
  go_cardless_id: String,
});
// string must match collection name
module.exports =
  mongoose.models.Members || mongoose.model('Members', MembersSchema);
