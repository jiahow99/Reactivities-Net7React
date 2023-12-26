interface Props {
    date: string
}

const ActivityDate = ({date}: Props) => {
  return (
    <div className="relative w-fit mt-12 mb-5">
        <h1 className="text-2xl ">{ date }</h1>
        <div className="w-full bg-purple-700 h-1 rounded-full absolute -bottom-1 right-0"></div>
    </div>
  )
}

export default ActivityDate