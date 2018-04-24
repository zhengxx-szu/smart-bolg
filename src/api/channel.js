import axios from 'axios'
import commonFetch from '@/api/util'

export function getHotNews() {
	const url = 'http://localhost:3000/api/getHotNews'
	const data = Object.assign({}, {
		containerid: '100803'
	})
	return commonFetch(url, data)
}

export function getBlogList(type, page, token) {
	const url = 'http://localhost:3000/article/getBlogList'
	const data = Object.assign({}, {
		page: page || 0,
		tag: type
	})
	if (token) {
		data.token = token
	}
	return commonFetch(url, data)
}

export function getHotTopic() {
	const url = 'http://localhost:3000/api/getHotTopic'
	return commonFetch(url, {})
}

export function getBlogDetail(id) {
	const url = 'http://localhost:3000/api/getBlogDetail'
	const data = Object.assign({}, {
		id
	})
	return commonFetch(url, data)
}

export function addFavor(params) {
	const url = 'http://localhost:3000/article/addFavor'
	return commonFetch(url, params)
}

export function addCollect(params) {
	const url = 'http://localhost:3000/user/addCollect'
	return commonFetch(url, params)
}

export function getBlogInfo(params) {
	const url = 'http://localhost:3000/article/articleInfo'
	return commonFetch(url, params)
}

export function sendComment(params) {
	const url = 'http://localhost:3000/article/sendComment'
	return commonFetch(url, params, 'POST')
}

export function getComment(params) {
	const url = 'http://localhost:3000/article/getComment'
	return commonFetch(url, params)
}

export function sendTransmit(params) {
	const url = 'http://localhost:3000/user/sendTransmit'
	return commonFetch(url, params)
}