import axios from 'axios'
import commonFetch from '@/api/util'

export function getHotNews() {
	const url = 'http://localhost:3000/api/getHotNews'
	const data = Object.assign({}, {
		containerid: '100803'
	})
	return commonFetch(url, data)
}

export function getBlogList(type, page) {
	const url = 'http://localhost:3000/article/getBlogList'
	const data = Object.assign({}, {
		page: page || 0,
		tag: type,
		ac: 'wap',
		count: 20,
		format: 'json_raw',
		as: 'A1E51ACA72C534F',
		cp: '5AA27543844F9E1',
		min_behot_time: parseInt(new Date().getTime() / 1000)
	})
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