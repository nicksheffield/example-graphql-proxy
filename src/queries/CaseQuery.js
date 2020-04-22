import api from '../api'

export default async (_, { id }, { authorization }) => {
	const res = await api.get(`/Cases/${id}`, {
		headers: { authorization },
	})

	return res.data
}
