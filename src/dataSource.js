import { RESTDataSource } from 'apollo-datasource-rest'
require('dotenv').config()

class RestAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = process.env.API_URL
	}

	willSendRequest(request) {
		request.headers.set('Authorization', this.context.authorization)
		request.headers.set('Registry', process.env.REGISTRY)
	}

	async getUser(id) {
		return this.get(`Users/${id}`)
	}

	async getCase(id) {
		return this.get(`Cases/${id}`)
	}

	async getCases(pageNumber, pageSize, orderBy) {
		let order = undefined
		let orderDirection = undefined

		switch (orderBy) {
			case 'created_ASC':
				order = 'created'
				orderDirection = 1
				break
			case 'created_DESC':
				order = 'created'
				orderDirection = 2
				break
		}

		const data = await this.get('Cases', {
			pageNumber,
			pageSize,
			orderBy: order,
			orderDirection,
		})

		return data
	}
}

export default RestAPI
