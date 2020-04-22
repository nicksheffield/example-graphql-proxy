import axios from 'axios'
require('dotenv').config()

const api = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		registry: process.env.REGISTRY,
	},
})

api.interceptors.request.use(
	function (config) {
		console.log('GET', config.url) // for logging what http requests get made
		return config
	},
	function (error) {
		return error
	}
)

export default api
