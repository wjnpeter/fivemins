import React, { useState, useEffect } from 'react';

import Header from './Header'
import MainContent, { ContentType } from './MainContent'
import withAuth from '../utils/withAuth'

function DBPortal() {
  const [collectionType, setCollectionType] = useState(ContentType.Podcast)

  useEffect(() => setCollectionType(ContentType.Podcast), [])

  const handleCollectionTypeChange = (t: ContentType) => {
    setCollectionType(t)
  }

  return <>
    <Header collectionType={collectionType} onCollectionTypeChange={handleCollectionTypeChange} />

    <MainContent tableType={collectionType} />

  </>
}

export default withAuth(DBPortal);
