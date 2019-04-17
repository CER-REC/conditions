const graphQLEndPoint = (process.env.NODE_ENV === 'production')
  ? '/conditions/graphql'
  : 'http://178.128.239.141/conditions/graphql';
export default graphQLEndPoint;
