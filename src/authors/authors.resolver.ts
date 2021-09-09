import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { Author } from './models/authors.model';

import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Author)
export class AuthorsResolver {
  @Query(() => Author)
  async getAuthor() {
    const author = new Author();
    author.id = 3;
    pubSub.publish('authorChecked', { authorChecked: author });
    return author;
  }

  @Subscription(() => Author, {
    filter: (payload, variables) => {
      console.log(payload);
      return true;
    },
  })
  async authorChecked() {
    return pubSub.asyncIterator('authorChecked');
  }
}
