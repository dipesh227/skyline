'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Link from 'next/link'
import { GripVertical } from 'lucide-react'

export default function SortableTeamRow({ member, onToggle, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: member.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <tr ref={setNodeRef} style={style} className="border-b hover:bg-gray-50">
      <td className="p-3"><div {...attributes} {...listeners} className="cursor-grab"><GripVertical size={20} /></div></td>
      <td className="p-3"><img src={member.image_url || '/images/logo/logo.png'} alt={member.name} className="w-10 h-10 rounded-full object-cover" /></td>
      <td className="p-3 font-medium">{member.name}</td>
      <td className="p-3">{member.role}</td>
      <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${member.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{member.is_active ? 'Active' : 'Inactive'}</span></td>
      <td className="p-3 text-center space-x-2">
        <Link href={`/admin/team/edit/${member.id}`} className="text-blue-600 hover:underline">Edit</Link>
        <button onClick={() => onToggle(member.id, member.is_active)} className="text-yellow-600 hover:underline">{member.is_active ? 'Deactivate' : 'Activate'}</button>
        <button onClick={() => onDelete(member.id)} className="text-red-600 hover:underline">Delete</button>
      </td>
    </tr>
  )
}
