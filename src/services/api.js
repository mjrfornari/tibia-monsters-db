import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
})

api.getCreatures = async () => {
    return new Promise(async (resolve, reject) => {
        api.get('/creatures')
            .then(response => {
                if (response.status === 200) resolve(response.data)
                else reject(response.statusText)
            })
            .catch(error => reject(error))
    })
}

api.getCreature = async id => {
    return new Promise(async (resolve, reject) => {
        return resolve({
            id: 1,
            name: 'Demon',
            life: 8200,
            exp: 6000,
        })
        api.get('/creatures/' + id)
            .then(response => {
                if (response.status === 200) resolve(response.data)
                else reject(response.statusText)
            })
            .catch(error => reject(error))
    })
}

api.addCreature = async creature => {
    return new Promise(async (resolve, reject) => {
        api.post('/create_creature', creature)
            .then(response => {
                if (response.status === 200) resolve(response.data)
                else reject(response.statusText)
            })
            .catch(error => reject(error))
    })
}

api.updateCreature = async (login, page, setLastPage) => {
    return new Promise(async (resolve, reject) => {
        return resolve({
            id: 1,
            name: 'Demon',
            life: 8200,
            exp: 6000,
        })
        api.get('/users/' + login + '/repos', { params: { page } })
            .then(response => {
                if (response?.headers?.link?.indexOf('next') === -1)
                    setLastPage(true)
                if (response.status === 200) resolve(response.data)
                else reject(response.statusText)
            })
            .catch(error => reject(error))
    })
}

api.deleteCreature = async id => {
    return new Promise(async (resolve, reject) => {
        api.get('/creature/' + id)
            .then(response => {
                if (response.status === 200) resolve(response.data)
                else reject(response.statusText)
            })
            .catch(error => reject(error))
    })
}

export default api
