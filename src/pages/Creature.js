import React, { useEffect, useState } from 'react'
import { Icon } from 'react-icons-kit'
import { save } from 'react-icons-kit/fa/save'
import { undo2 } from 'react-icons-kit/icomoon/undo2'
import Swal from 'sweetalert2'

import api from '../services/api'

import './styles/Creature.css'

function Creature () {
    const [creature, setCreature] = useState({})

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
        try {
            const addedCreature = await api.addCreature(creature)
            if (addedCreature.id) {
                Swal.fire(
                    'Creature added',
                    'The creature has been added succesfully.',
                    'success'
                ).then(value => window.history.push('/'))
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
                            }}
                        >
                            Id: {creature.id}
                        </span>

                        <span>Name:</span>
                        <input name='name' onChange={handleChange} />

                        <span>Life:</span>
                        <input name='life' onChange={handleChange} />

                        <span>Experience:</span>
                        <input name='exp' onChange={handleChange} />

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
