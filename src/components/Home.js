import React from 'react';
import Notes from './Notes';


export default function Home(props) {
  const {alertMessage}=props;
  return (
    <>
    <Notes alertMessage={alertMessage}/>
    </>

  )
}
