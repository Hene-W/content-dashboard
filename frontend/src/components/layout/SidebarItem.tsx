import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarItem = ({title, to, icon}: {title: string, to: string, icon: React.ReactNode}) => {
  return (
    <NavLink to={to} end className={({ isActive }) => 
      `p-2 px-4 flex gap-2 items-center rounded-xl ${isActive ? 'bg-primary text-white font-semibold' : 'hover:bg-slate-100'}`
    }>
        <span className="text-lg">
          {icon}
        </span>
      {title}
    </NavLink>
  )
}

export default SidebarItem