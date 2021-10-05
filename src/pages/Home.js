import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import api from '../services/api'

import './styles/Home.css'

function Home () {
    const [data, setData] = useState([])

    const mapItems = (item, index) => {
        return (
            <Link
                to={{
                    pathname: '/creature',
                    search: '?id=' + item.id,
                }}
                className='Home__link'
                key={item.id}
            >
                <ListGroupItem className='Home__user-item'>
                    <div className='creature-item__avatar'>
                        <img
                            className='avatar'
                            src={item.avatar_url}
                            alt={item.name + '_avatar'}
                        ></img>
                    </div>
                    <div className='creature-item__data'>
                        <span>{item.name}</span>
                    </div>
                </ListGroupItem>
            </Link>
        )
    }

    let listedItems = data.map(mapItems)

    return (
        <div className='page--content'>
            <div className='Home'>
                <h2>Creatures</h2>
                <div className='Home__users-list'>
                    <ListGroup>{listedItems}</ListGroup>
                </div>
            </div>
        </div>
    )
}

export default Home
