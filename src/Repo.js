import React from 'react'
import emoji from 'node-emoji'

import {
  Colors,
  Button
} from '@blueprintjs/core'

export const Repo = ({name, description, stars, forks, updatedAt, forked, disabled}) => (
  <div className='Card pt-card pt-elevation-3'>
    <div className='Repo'>
      <div className='Repo__container'>
        <div className='Repo__headline-container'>
          <span className='Repo__name'>
            <span className={`pt-icon-standard ${forked ? 'pt-icon-git-branch' : 'pt-icon-git-repo'} Repo__icon`} />
            <b>{name}</b>
            { forked && <span className='pt-tag pt-intent-warning Repo__tag'>Fork</span> }
          </span>
          <span style={{color: Colors.GRAY1}}className='Repo__description'>{description ? emoji.emojify(description) : ''}</span>
        </div>
        <div className='Repo__metadata-container'>
          <span className='Repo__stars'><b>{stars}</b> stars</span>
          <span className='Repo__forks'><b>{forks}</b> forks</span>
        </div>
      </div>
      <div className='Repo__container'>
        <span className='Repo__latest-update'>Last Updated: <b>{new Date(updatedAt).toDateString()}</b></span>
        <div className='Repo__actions-container pt-button-group'>
          <Button iconName='download'> Download </Button>
          <Button className='pt-intent-danger' iconName='delete' disabled={disabled}> Delete </Button>
        </div>
      </div>
    </div>
  </div>
)
