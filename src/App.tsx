import React, { useState, useEffect } from 'react';

import Header from './components/Header'
import MainContent, { ContentType } from './components/MainContent'
import withAuth from './utils/withAuth'

function App() {
  const [collectionType, setCollectionType] = useState(ContentType.Tour)

  useEffect(() => setCollectionType(ContentType.Tour), [])

  const handleCollectionTypeChange = (t: ContentType) => {
    setCollectionType(t)
  }

  return <>
    <Header collectionType={collectionType} onCollectionTypeChange={handleCollectionTypeChange} />

    <MainContent tableType={collectionType} />

  </>
}

export default withAuth(App);
