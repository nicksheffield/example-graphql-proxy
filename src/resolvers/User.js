export default {
	fullName: root => {
		return [root.firstName, root.middleName, root.lastName].filter(x => x).join(' ')
	},
	physicalAddress: async (root, {}, { dataSources: { RestAPI } }) => {
		if (root.physicalAddress) {
			return root.physicalAddress
		} else {
			const res = await RestAPI.getUser(root.id)

			return res.physicalAddress
		}
	},
}
