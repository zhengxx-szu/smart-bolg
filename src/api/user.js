import axios from 'axios'
import commonFetch from '@/api/util'

export function getUserInfo(params) {
	const url = 'http://localhost:3000/user/getUserInfo'
	return commonFetch(url, params)
}

export function getCollectList(params) {
	const url = 'http://localhost:3000/user/getCollectList'
	return commonFetch(url, params)
}

export function getTransmitList(params) {
	const url = 'http://localhost:3000/user/getTransmitList'
	return commonFetch(url, params)
}

export function getFollowList(params) {
	const url = 'http://localhost:3000/user/getFollowList'
	return commonFetch(url, params)
}

export function getFansList(params) {
	const url = 'http://localhost:3000/user/getFansList'
	return commonFetch(url, params)
}

export function sendFollow(params) {
	const url = 'http://localhost:3000/user/sendFollow'
	return commonFetch(url, params)
}

export function updateInfo(params) {
	const url = 'http://localhost:3000/user/updateInfo'
	return commonFetch(url, params, 'POST')
}

export function sendAvatar(params) {
	const url = 'http://localhost:3000/user/sendAvatar'
	const option = {
		method: 'post',
		body: params
	}
	return fetch(url, option).then(res => res.json())
}