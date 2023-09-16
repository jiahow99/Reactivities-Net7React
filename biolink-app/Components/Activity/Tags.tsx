interface Props {
    label: string,
}

const Tags = ({label}: Props) => {
  return (
    <span className="py-1 px-2 text-xs text-gray-400 hover:text-white hover:bg-gray-500 rounded-full tracking-widest font-medium cursor-pointer duration-200">
        { label }
    </span>
  )
}

export default Tags