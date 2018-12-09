export class Doc {
  constructor (client, dataset, id) {
    this.client = client
    this.dataset = dataset
    this.id = id
  }

  async get () {
    try {
      const res = await this.client.get(`/${this.dataset}/${this.id}`)
      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  async set (obj) {
    try {
      const res = await this.client.put(`/${this.dataset}/${this.id}`, obj)
      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  delete () {
    return this.client.delete(`/${this.dataset}/${this.id}`)
  }
}

export class Collection {
  constructor (client, dataset) {
    this.client = client
    this.dataset = dataset
  }

  doc (id) {
    return new Doc(this.client, this.dataset, id)
  }

  async get () {
    try {
      const res = await this.client.get(`/${this.dataset}`)
      console.info(`fetched ${this.dataset} from Cosmo`)
      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  async add (obj) {
    try {
      const res = await this.client.post(`/${this.dataset}`, obj)
      console.info(`added ${this.dataset} to Cosmo`)
      return res.data
    } catch (e) {
      console.error(e)
    }
  }
}

import axiosBase from 'axios';

export class Client {
  constructor (host, port) {
    this.baseURL = `http://${host}:${port}`
  }

  axios () {
    return axiosBase.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Ontology-Subject': 'AecaeSEBkt5GcBCxwz1F41TvdjX3dnKBkJ',
      },
      responseType: 'json',
    })
  }

  collection (dataset) {
    return new Collection(this.axios(), dataset)
  }
}

export const db = new Client('127.0.0.1', 21982)
