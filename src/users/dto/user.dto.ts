import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserDto {
    @Field(() => ID)
    id: number;
    
    @Field()
    firstName: string;
    
    @Field()
    lastName: string;
    
    @Field()
    email: string;
}