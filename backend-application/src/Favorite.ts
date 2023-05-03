import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { prop as Property } from "@typegoose/typegoose";

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
