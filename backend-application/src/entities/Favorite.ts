import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType, ID } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType({ description: "The Favorite model" })
export class Favorite {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  itemId: string;

  @Field()
  @Property({ required: true })
  userId: string;
}
