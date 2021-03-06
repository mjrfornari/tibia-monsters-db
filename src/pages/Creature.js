import React, { useEffect, useState } from 'react'
import { Icon } from 'react-icons-kit'
import { save } from 'react-icons-kit/fa/save'
import { undo2 } from 'react-icons-kit/icomoon/undo2'
import Swal from 'sweetalert2'

import api from '../services/api'

import './styles/Creature.css'

function Creature () {
    const [creature, setCreature] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(window.location.search)
            if (query.get('id')) {
                try {
                    let editCreature = await api.getCreature(query.get('id'))
                    if (editCreature) {
                        console.log(editCreature)
                        setCreature(editCreature)
                    } else {
                        Swal.fire(
                            'Something went wrong',
                            'The creature could not be found.',
                            'error'
                        ).then(value => (window.location.href = '/'))
                    }
                } catch (e) {
                    Swal.fire(
                        'Something went wrong',
                        'The creature could not be found.',
                        'error'
                    ).then(value => (window.location.href = '/'))
                }
            }
        }

        fetchData()
    }, [])

    const handleBack = e => {
        e.preventDefault()
        window.history.back()
    }

    const handleChange = e => {
        e.preventDefault()
        const creatureData = { ...creature }
        creatureData[e.target.name] = e.target.value
        setCreature(creatureData)
    }

    const submitData = async e => {
        e.preventDefault()
        const query = new URLSearchParams(window.location.search)
        if (query.get('id')) {
            try {
                const updatedCreature = await api.updateCreature(
                    query.get('id'),
                    creature
                )
                if (updatedCreature.id) {
                    Swal.fire(
                        'Creature updated',
                        'The creature has been updated succesfully.',
                        'success'
                    ).then(value => (window.location.href = '/'))
                } else {
                    Swal.fire(
                        'Something went wrong',
                        'The creature could not be updated.',
                        'error'
                    )
                }
            } catch (e) {
                Swal.fire(
                    'Something went wrong',
                    'The creature could not be updated.',
                    'error'
                )
            }
        } else {
            try {
                const addedCreature = await api.addCreature(creature)
                if (addedCreature.id) {
                    Swal.fire(
                        'Creature added',
                        'The creature has been added succesfully.',
                        'success'
                    ).then(value => (window.location.href = '/'))
                } else {
                    Swal.fire(
                        'Something went wrong',
                        'The creature could not be added.',
                        'error'
                    )
                }
            } catch (e) {
                Swal.fire(
                    'Something went wrong',
                    'The creature could not be added.',
                    'error'
                )
            }
        }
    }

    return (
        <div className='page--content'>
            <div className='Creature'>
                <div className='Creature__user-data'>
                    <div className='creature-data'>
                        <img
                            className='avatar'
                            src={
                                creature.avatar_url ||
                                'https://www.3bscientific.com.br/thumblibrary/A35-3/A35-3_06_1200_1200_Tibia.jpg'
                            }
                            alt={creature.login + '_avatar'}
                        ></img>
                        <hr className='creature-line' />
                        <span
                            style={{
                                display: creature.id ? 'block' : 'none',
                                marginBottom: creature.id ? '20px' : '0',
                            }}
                        >
                            Id: {creature.id}
                        </span>

                        <span>Name:</span>
                        <input
                            name='name'
                            onChange={handleChange}
                            value={creature.name}
                        />

                        <span>Life:</span>
                        <input
                            name='life'
                            onChange={handleChange}
                            value={creature.life}
                        />

                        <span>Experience:</span>
                        <input
                            name='exp'
                            onChange={handleChange}
                            value={creature.exp}
                        />

                        <div className='Creature__button-container'>
                            <button
                                className='Creature__save-button'
                                onClick={submitData}
                            >
                                <Icon
                                    style={{
                                        marginTop: '-1px',
                                        marginRight: '10px',
                                    }}
                                    size={12}
                                    icon={save}
                                />{' '}
                                Save
                            </button>
                            <button
                                className='Creature__back-button'
                                onClick={handleBack}
                            >
                                <Icon
                                    style={{
                                        marginTop: '-1px',
                                        marginRight: '10px',
                                    }}
                                    size={12}
                                    icon={undo2}
                                />{' '}
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Creature
