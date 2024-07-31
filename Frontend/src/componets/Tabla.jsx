import { MdDeleteForever,MdNoteAdd,MdInfo } from "react-icons/md";

const Tabla = () => {
    return (
        <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
            <thead className='bg-gray-800 text-slate-400'>
                <tr>
                    <th className='p-2'>Nombre</th>
                    <th className='p-2'>Apellido</th>
                    <th className='p-2'>Dirección</th>
                    <th className='p-2'>Teléfono</th>
                    <th className='p-2'>Email</th>
                    <th className='p-2'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b hover:bg-gray-300 text-center">
                    <td>Francisco</td>
                    <td>Caero</td>
                    <td>Quito-Ecuador</td>
                    <td>0965450764</td>
                    <td>fjct654@gmail.com</td>
                    <td className='py-2 text-center'>
                        <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"/>

                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"/>

                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"/>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Tabla