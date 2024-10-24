
export default function DynamicRoute({params}:any) {
  return (
    <div className='flex flex-col gap-3 justify-center items-center py-2 min-h-screen'>
      
        <h1 className='font-semibold text-2xl text-violet-600'>Profile Page</h1>

        <h1 className="bg-blue-500 p-2 rounded-lg text-black font-bold">{params.id}</h1>

    </div>
  )
}

