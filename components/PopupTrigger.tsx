'use client'
import { useEffect } from 'react'
import { usePopup } from '@/context/PopupContext'
export default function PopupTrigger() {
  const { openPopup } = usePopup()
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.open-popup-trigger')) {
        e.preventDefault(); openPopup()
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [openPopup])
  return null
}
