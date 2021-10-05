import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Icon } from 'react-icons-kit'
import { pencil } from 'react-icons-kit/iconic/pencil'
import { trash } from 'react-icons-kit/iconic/trash'
import { plus } from 'react-icons-kit/iconic/plus'

import api from '../services/api'

import './styles/Home.css'

function Home () {
    const [data, setData] = useState([])
    const [randomJoke, setRandomJoke] = useState('')

    useEffect(() => {
        const getData = async () => {
            setData(await api.getCreatures())
            axios.get('https://api.chucknorris.io/jokes/random').then(res => {
                setRandomJoke('"' + res.data.value + '" - NORRIS, Chuck.')
            })
        }

        getData()
    }, [])

    const mapItems = (item, index) => {
        return (
            <ListGroupItem className='Home__user-item'>
                <div className='creature-item__avatar'>
                    <img
                        className='avatar'
                        src={
                            item.avatar_url ||
                            'https://www.3bscientific.com.br/thumblibrary/A35-3/A35-3_06_1200_1200_Tibia.jpg'
                        }
                        alt={item.name + '_avatar'}
                    ></img>
                </div>
                <div className='creature-item__data'>
                    <span>{item.name}</span>
                </div>
                <div className='creature-item__actions'>
                    <button>
                        <Icon
                            style={{
                                marginTop: '-1px',
                            }}
                            size={12}
                            icon={pencil}
                        />{' '}
                        Edit
                    </button>
                    <button>
                        <Icon
                            style={{
                                marginTop: '-1px',
                            }}
                            size={12}
                            icon={trash}
                        />{' '}
                        Delete
                    </button>
                </div>
            </ListGroupItem>
        )
    }

    let listedItems = data.map(mapItems)

    return (
        <div className='page--content'>
            <div className='Home'>
                <div className='random-joke'>{randomJoke}</div>
                <h2>Creatures</h2>
                <div className='Home__users-list'>
                    <ListGroup>{listedItems}</ListGroup>
                </div>
                <div className='Home__button-container'>
                    <Link
                        to={{
                            pathname: '/creature',
                        }}
                        className='Home__link'
                    >
                        <button className='Home__add-button'>
                            <Icon
                                style={{
                                    marginTop: '-1px',
                                    marginRight: '10px',
                                }}
                                size={12}
                                icon={plus}
                            />{' '}
                            Add creature
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
