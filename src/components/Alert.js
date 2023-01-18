import React from 'react'

export default function Alert(props) {
  const capitalize = s => s && s[0].toUpperCase() + s.slice(1)
  return (
    <div className="my-3"style={{height:"50px"}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show container`} role="alert">
    <strong>{capitalize(props.alert.type)}!</strong> {capitalize(props.alert.msg)}
    </div>}
    </div>
  )
}