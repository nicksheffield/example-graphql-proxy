export default (_, { id }, { dataSources: { RestAPI } }) => RestAPI.getCase(id)
