import mongoose from "mongoose";
import { WithId } from "mongodb";
import { BlogType } from "../../models/blogsTypes";

export const BlogSchema = new mongoose.Schema<WithId<BlogType>>({
  id: { type: String, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  websiteUrl: { type: String, require: true },
  createdAt: { type: String, require: true },
  isMembership: { type: Boolean, require: true },
});
export const BlogModel = mongoose.model<BlogType>("blogs", BlogSchema);
