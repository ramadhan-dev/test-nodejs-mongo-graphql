const graphql = require("graphql");
const _ = require("lodash");
const Book = require('../models/book');
const Author = require('../models/author');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// struktur dan name table
const BookType = new GraphQLObjectType({
  name: "Book", // nama table
  fields: () => ({
    // nama field
    id: {
      type: GraphQLID //type data
    },
    // nama field
    name: {
      type: GraphQLString //type data
    },
    // nama field
    genre: {
      type: GraphQLString //type data
    },
    authorId: {
      type: GraphQLID //type data
    },
    author: {
      // join table
      type: AuthorType, // nama table
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      }
    }
  })
});

// struktur dan name table
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    //nama field dan type data
    id: {
      type: GraphQLID
    },
    //nama field dan type data
    name: {
      type: GraphQLString
    },
    //nama field dan type data
    age: {
      type: GraphQLInt
    },
    books: {
      // join table
      type: BookType, // nama table
      resolve(parent, args) {
        return Book.find({
          authorId: parent.id
        });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType", // base query
  fields: {
    book: {
      // query book
      type: BookType, // table target
      // argument parameter
      args: {
        // parameter id
        id: {
          type: GraphQLID // type param data id
        }
      },
      resolve(parent, args) {
        return Book.findById(args.id); // query ke database
      }
    },
    author: {
      // query untuk author
      type: AuthorType, // table target
      // argument dan parameter
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Author.findById(args.id); // query ke databse
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
        return [];
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

module.exports = new GraphQLSchema({
  query: RootQuery
});