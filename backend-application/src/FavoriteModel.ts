import { getModelForClass } from "@typegoose/typegoose";

import { Favorite } from "./Favorite";

const FavoriteModel = getModelForClass(Favorite);

export { FavoriteModel };
