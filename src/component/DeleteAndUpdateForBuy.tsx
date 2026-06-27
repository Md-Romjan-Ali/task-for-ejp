"use client"
import { deleteData } from '@/lib/deletebuy';
import { updateData } from '@/lib/update';
import React from 'react';
import { UpdateModal } from './UpdateModal';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
interface GetIdProps {
    id: string
}
const DeleteAndUpdateForBuy = ({ id }: GetIdProps) => {
    const router = useRouter()
    const deleteHandle = async () => {
        const deleted = await deleteData(id)
        router.refresh()
        toast.error('Delete Data parmanently')
        console.log(deleted, 'from delte handle');
    }

    return (
        <div className='flex gap-1 items-center'>
            <UpdateModal id={id} />
            <Button onClick={deleteHandle} variant="danger-soft">Delete</Button>

        </div>
    );
};

export default DeleteAndUpdateForBuy;