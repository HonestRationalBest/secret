import { getModelForClass } from "@typegoose/typegoose";
import { Favorite } from "../entities/Favorite";

const FavoriteModel = getModelForClass(Favorite);

export { FavoriteModel };
