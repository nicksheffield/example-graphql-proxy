import api from '../api'

export default async (_, { id }, { config }) => {
	const res = await api.get(`/Cases/${id}`, config)

	return res.data
}
