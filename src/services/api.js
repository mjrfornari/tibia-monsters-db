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
        api.get('/creature/' + id)
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

api.updateCreature = async (id, creature) => {
    return new Promise(async (resolve, reject) => {
        api.put('/creature/' + id, creature)
            .then(response => {
                if (response.status === 200) resolve(response.data)
                else reject(response.statusText)
            })
            .catch(error => reject(error))
    })
}

api.deleteCreature = async id => {
    return new Promise(async (resolve, reject) => {
        api.delete('/creature/' + id)
            .then(response => {
                if (response.status === 200) resolve(response.data)
                else reject(response.statusText)
            })
            .catch(error => reject(error))
    })
}

export default api
