import { prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Favorite model" })
export class Favorite {
  @Field()
  public get id(): string {
    return this._id.toHexString();
  }

  @Property()
  public _id: ObjectId;

  @Field()
  @Property({ required: true })
  itemId: string;

  @Field()
  @Property({ required: true })
  userId: string;
}
