const graphql = require('graphql');
const Book = require('./../../models/book');
const Author = require('./../../models/author');
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;
const { AuthorType, BookType } = require('./../Type/Book');

exports.RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    booksByAuthorId: {
      type: new GraphQLList(BookType),
      args: {
        authorId: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        const query = {
          authorId: args.authorId
        };
        return Book.find(query);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return [];
      }
    }
  }
});
