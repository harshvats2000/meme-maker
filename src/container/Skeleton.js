import React, { Component } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

class SkeletonContainer extends Component {
    render() {
        return (
            <div>
                <Skeleton variant='text' width='50%' height='30px' animation='wave' />
                <Skeleton variant='text' width='100%' height='100px' animation='wave' />
                <Skeleton variant='text' width='100%' height='50px' animation='wave' />

                <Skeleton variant='text' width='50%' height='30px' animation='wave' />
                <Skeleton variant='text' width='100%' height='100px' animation='wave' />
                <Skeleton variant='text' width='100%' height='50px' animation='wave' />

                <Skeleton variant='text' width='50%' height='30px' animation='wave' />
                <Skeleton variant='text' width='100%' height='100px' animation='wave' />
                <Skeleton variant='text' width='100%' height='50px' animation='wave' />

                <Skeleton variant='text' width='50%' height='30px' animation='wave' />
                <Skeleton variant='text' width='100%' height='100px' animation='wave' />
                <Skeleton variant='text' width='100%' height='50px' animation='wave' />
                
                <Skeleton variant='text' width='50%' height='30px' animation='wave' />
                <Skeleton variant='text' width='100%' height='100px' animation='wave' />
                <Skeleton variant='text' width='100%' height='50px' animation='wave' />
            </div>
        )
    }
}

export default SkeletonContainer