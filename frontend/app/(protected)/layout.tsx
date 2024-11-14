import React from 'react'

const ProtetedLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="p-6">{children}</div>
  )
}

export default ProtetedLayout