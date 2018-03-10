import axios from 'axios'
import commonFetch from '@/api/util'
export function toRegister(params) {
	const url = 'http://localhost:3000/user/register'
	return commonFetch(url, params, 'POST')
}