export const fetchUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        lists {
          items {
              id
              title
              items {
                  items {
                      id
                      name
                      category
                      checked
                  }
              }
          }
        }
      }
      nextToken
    }
  }
`;

export const fetchLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        items {
          items {
              id
              name
              category
              checked 
          }
        }
      }
      nextToken
    }
  }
`;

