import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { inject, NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

export function createApollo(): ApolloClientOptions<any> {
  const uri = '4000'; // <-- add the URL of the GraphQL server here
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [provideApollo(createApollo)],
})
export class GraphQLModule {}
