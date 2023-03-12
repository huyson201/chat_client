import React, { useEffect, useState } from 'react'
import styles from './RequestFriendList.module.scss'
import bindClass from 'classnames/bind'
import { format } from 'timeago.js'
import { useLoaderData } from 'react-router-dom'
import { RequestFriend } from '../../types/RequestFriend'
import friendApis from '@apis/Friend.api'

const cx = bindClass.bind(styles)

const RequestFriendList = () => {
  let resData = useLoaderData() as RequestFriend[]
  const [data, setData] = useState<RequestFriend[]>()

  useEffect(() => {
    setData(resData)
  }, [resData])

  const handleClickAccept = (item: RequestFriend) => {
    friendApis.updateRequestFriend(item._id, "accepted").then(() => {
      if (data) {
        let cloneData = data
        cloneData.splice(resData.indexOf(item), 1)
        setData([...cloneData])
      }
    })

  }

  const handleClickCancel = (item: RequestFriend) => {
    friendApis.updateRequestFriend(item._id, "rejected").then(() => {
      if (data) {
        let cloneData = data
        cloneData.splice(resData.indexOf(item), 1)
        setData([...cloneData])
      }
    })
  }



  return (
    <>
      <div className={cx("content-title")}>Lời mời kết bạn <span className="count">({resData.length})</span></div>
      <div className={cx("list-items")}>
        {
          data && data.map(item => {
            return <RequestFriendItem data={item} onClickCancel={() => handleClickCancel(item)} onClickAccept={() => handleClickAccept(item)} key={item._id} />
          })
        }
      </div>
    </>
  )
}

export interface RequestFriendItemProps {
  data: RequestFriend,
  onClickAccept?: () => void
  onClickCancel?: () => void
}

const RequestFriendItem = ({ data, onClickAccept, onClickCancel }: RequestFriendItemProps) => {
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
        <button className={cx("cancel", "btn")} onClick={onClickCancel}>Cancel</button>
        <button className={cx("accept", "btn")} onClick={onClickAccept}>Accept</button>
      </div>
    </div>
  )
}
export default RequestFriendList



