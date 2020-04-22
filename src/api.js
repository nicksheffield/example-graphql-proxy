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
		console.log('GET', config.url)
		// Do something before request is sent
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

export default api
