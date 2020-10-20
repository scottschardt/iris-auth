import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreateUserDto {
    @Field()
    firstName: string;
    
    @Field()
    lastName: string;
    
    @Field()
    email: string;
    
    @Field()
    password: string;
}