export default async (_, { pageNumber, pageSize, orderBy }, { dataSources: { RestAPI } }) => {
	let res = await RestAPI.getCases(pageNumber, pageSize, orderBy)

	return {
		edges: res.items.map(node => ({
			node,
		})),
		pageInfo: {
			...res,
			count: res.items.length,
		},
	}
}
