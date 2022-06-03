import React from 'react'
import { ITweet } from '../../typings';

interface IProps {
  tweet:ITweet;
}

export default function Tweet({ tweet}:IProps) {
  return (
    <div>{tweet.text}</div>
  )
}
