import React from 'react'

import {
  NonIdealState
} from '@blueprintjs/core'

export const Empty = ({
    title = 'No repositories have been loaded',
    description = 'In order to show your repositories, you need to authenticate through Github'
}) => (<NonIdealState
  className='Empty'
  visual={<span style={{fontSize: '6em'}} className='pt-icon pt-icon-git-repo' />}
  title={title}
  description={description}
/>)
