import React from 'react'
import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

const Footer = () => {
    return (
        <>

            <div className='flex justify-center bg-indigo-900 text-white'>
                <div className='container flex flex-col items-center py-4'>
                    <p className='text-x1 front-bold'>Loja de Games Pro | Copyright: </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex grap-2'>
                        <LinkedinLogo size={48} weight='bold' />
                        <InstagramLogo size={48} weight='bold' />
                        <FacebookLogo size={48} weight='bold' />
                    </div>
                </div>
            </div>

        </>


    )
}

export default Footer