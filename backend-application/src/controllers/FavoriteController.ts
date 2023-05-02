import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Favorite } from "../entities/Favorite";
import { FavoriteModel } from "../models/FavoriteModel";

@Resolver(Favorite)
export class FavoriteController {
  @Query(() => [Favorite])
  async getFavorites(@Arg("userId") userId: string): Promise<Favorite[]> {
    return await FavoriteModel.find({ userId });
  }

  @Mutation(() => Favorite)
  async addFavorite(
    @Arg("userId") userId: string,
    @Arg("itemId") itemId: string,
  ): Promise<Favorite> {
    const favorite = new FavoriteModel({ itemId, userId });
    await favorite.save();
    return favorite;
  }

  @Mutation(() => Boolean)
  async removeFavorite(
    @Arg("userId") userId: string,
    @Arg("itemId") itemId: string,
  ): Promise<boolean> {
    const result = await FavoriteModel.deleteOne({ userId, itemId });
    return result.deletedCount === 1;
  }
}
