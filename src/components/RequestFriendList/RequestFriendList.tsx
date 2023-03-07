import React, { useEffect } from 'react'
import styles from './RequestFriendList.module.scss'
import bindClass from 'classnames/bind'
import avatar from '@assets/images/Userpic.jpg'
import { format } from 'timeago.js'
import { useLoaderData } from 'react-router-dom'
import { RequestFriend } from '../../types/RequestFriend'

const cx = bindClass.bind(styles)

const RequestFriendList = () => {
  let resData = useLoaderData() as RequestFriend[]
  return (
    <>
      <div className={cx("content-title")}>Lời mời kết bạn <span className="count">(34)</span></div>
      <div className={cx("list-items")}>
        {
          resData && resData.map(item => {
            return <RequestFriendItem data={item} key={item._id} />
          })
        }
      </div>
    </>
  )
}

export interface RequestFriendItemProps {
  data: RequestFriend
}

const RequestFriendItem = ({ data }: RequestFriendItemProps) => {
  return (
    <div className={cx("request-items")}>
      <div className={cx("avatar-row")}>
        <div className={cx("avatar")}>
          <img src={data.requester.avatar_url} alt="avatar" />
        </div>
        <div className={cx("name")}>
          {`${data.requester.first_name} ${data.requester.last_name}`}
          <div className={cx("time")}>{format(data.createdAt)}</div>
        </div>
      </div>
      <div className={cx("request-text")}>
        {data.request_text || " Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum."}
      </div>
      <div className={cx("btn-actions")}>
        <button className={cx("cancel", "btn")}>Cancel</button>
        <button className={cx("accept", "btn")}>Accept</button>
      </div>
    </div>
  )
}
export default RequestFriendList



