
function objToString(obj, arr = [], idx = 0) {
	for (let item in obj) {
		arr[idx++] = [item, obj[item]]
	}
	return new URLSearchParams(arr).toString()
}

function commonFetch(url, options, method = 'GET') {
	const searchStr = objToString(options)
	let obj = {}
	if (method === 'GET') { 
		url += '?' + searchStr
		obj = {
			method: method,
			mode: 'cors'
		}
	} else {
		obj = {
			method: method,
			mode: 'cors',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: searchStr
		}
	}
	return fetch(url, obj).then(res => res.json())
}

export default commonFetch