import axios from 'axios'
import commonFetch from '@/api/util'

export function reportDetail(params) {
	const url = 'http://localhost:3000/ubt/reportDetail'
	return commonFetch(url, params)
}

export function reportFavor(params) {
	const url = 'http://localhost:3000/ubt/reportFavor'
	return commonFetch(url, params)
}

export function reportCollect(params) {
	const url = 'http://localhost:3000/ubt/reportCollect'
	return commonFetch(url, params)
}

export function reportTransmit(params) {
	const url = 'http://localhost:3000/ubt/reportTransmit'
	return commonFetch(url, params)
}

export function reportComment(params) {
	const url = 'http://localhost:3000/ubt/reportComment'
	return commonFetch(url, params)
}