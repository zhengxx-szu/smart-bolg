import axios from 'axios'
import commonFetch from '@/api/util'

export function getHotNews() {
	const url = 'http://localhost:3000/api/getHotNews'
	const data = Object.assign({}, {
		containerid: '100803'
	})
	return commonFetch(url, data)
}

export function getBlogList(type) {
	const url = 'http://localhost:3000/api/getBlogList'
	const data = Object.assign({}, {
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