'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface Props {
    children: React.ReactNode
}

export const Provider = ({children}: Props) => {
  return (
    <>
        {children}
        <ProgressBar
            height="3px"
            color='#b15bb9'
            options={{ showSpinner: false }}
            shallowRouting
        />
    </>
  )
}

