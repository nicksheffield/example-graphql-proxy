import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './types'
import RestAPI from './dataSource'

import CaseQuery from './queries/CaseQuery'
import CasesQuery from './queries/CasesQuery'

import User from './resolvers/User'
import Case from './resolvers/Case'

const resolvers = {
	Query: {
		case: CaseQuery,
		cases: CasesQuery,
	},
	User,
	Case,
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => {
		return {
			RestAPI: new RestAPI(),
		}
	},
	context: integrationContext => {
		return { authorization: integrationContext.req.headers.authorization }
	},
})

const app = express()

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
	console.log(`server listening on http://localhost:4000${server.graphqlPath}`)
})
