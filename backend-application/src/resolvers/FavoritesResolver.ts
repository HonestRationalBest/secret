import { Arg, Query, Mutation, Resolver } from "type-graphql";
import { getModelForClass } from "@typegoose/typegoose";
import { Favorite } from "../entities/Favorite";

const FavoriteModel = getModelForClass(Favorite);

@Resolver()
export class FavoriteResolver {
  @Query(() => [Favorite])
  async getFavorites(@Arg("userId") userId: string): Promise<Favorite[]> {
    return await FavoriteModel.find({ userId });
  }

  @Mutation(() => Favorite)
  async createFavorite(
    @Arg("itemId") itemId: string,
    @Arg("userId") userId: string
  ): Promise<Favorite> {
    const favorite = new FavoriteModel({ itemId, user: userId });
    await favorite.save();
    return favorite;
  }
}
