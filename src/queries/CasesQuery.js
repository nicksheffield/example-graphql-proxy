import api from '../api'

export default async (_, { pageNumber, pageSize, orderBy }, { config }) => {
	console.log('orderBy', orderBy)

	let orderStr = ''

	switch (orderBy) {
		case 'created_ASC':
			orderStr = '&orderBy=created&orderDirection=1'
			break
		case 'created_DESC':
			orderStr = '&orderBy=created&orderDirection=2'
			break
	}

	const res = await api.get(`/Cases?pageNumber=${pageNumber}&pageSize=${pageSize}${orderStr}`, config)

	return {
		edges: res.data.items.map(node => ({
			node,
		})),
		pageInfo: {
			...res.data,
			count: res.data.items.length,
		},
	}
}
