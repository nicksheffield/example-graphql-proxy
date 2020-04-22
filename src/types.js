import { gql } from 'apollo-server-express'

const typeDefs = gql`
	type Query {
		case(id: ID!): Case!
		cases(pageNumber: Int!, pageSize: Int!, orderBy: CaseOrderByInput): CaseConnection
	}

	type PageInfo {
		pageNumber: Int
		pageSize: Int
		totalCount: Int
		totalPages: Int
		count: Int!
	}

	type EnumItem {
		id: ID
		name: String
		readable: String
	}

	type Case {
		id: ID!
		caseNumber: String!
		applicant: CaseParty
		advocates: [User] # shortcut for applicant.parties
		respondent: CaseParty # renamed from defendant
		reviewer: CaseParty
		peerReviewer: CaseParty
		mediator: CaseParty
		accClaimNumber: String # actually pulled from an embedded caseField
		applicantName: String # also a casefield
		status: EnumItem # this actually combines status and statusName
		type: EnumItem # this also combines caseType and caseTypeName
	}

	enum CaseOrderByInput {
		created_ASC
		created_DESC
	}

	type CaseConnection {
		edges: [CaseEdge]
		pageInfo: PageInfo!
	}

	type CaseEdge {
		node: Case
	}

	type User {
		id: ID!
		fullName: String! # this is fake, and the value is only supplied by a resolver
		firstName: String!
		middleName: String
		lastName: String!
		email: String!
		phoneNumber: String!
		emailConfirmed: Boolean!
		twoFactorEnabled: Boolean!
		physicalAddress: Address
		organisation: Organisation
	}

	type UserConnection {
		edges: [UserEdge]
		pageInfo: PageInfo!
	}

	type UserEdge {
		node: User
	}

	type CaseParty {
		id: ID!
		user: User
		parties: [User]
	}

	type Address {
		id: ID!
		address1: String!
	}

	type Organisation {
		id: ID!
		name: String!
		email: String!
		phone: String
		address: Address
	}
`

export default typeDefs
