import api from '../api'

export default {
	fullName: root => {
		return [root.firstName, root.middleName, root.lastName].filter(x => x).join(' ')
	},
	physicalAddress: async (root, {}, { authorization }) => {
		if (root.physicalAddress) {
			return root.physicalAddress
		} else {
			const res = await api.get(`/Users/${root.id}`, {
				headers: { authorization },
			})

			return res.data.physicalAddress
		}
	},
}
