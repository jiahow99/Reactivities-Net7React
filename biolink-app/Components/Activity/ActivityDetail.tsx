interface Props {
    name?: string,
    venue?: string,
    datetime?: string
}


const ActivityDetail = ({name, venue, datetime}: Props) => {
  return (
    <div className="flex justify-between items-center">
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <div className="text-xs font-medium tracking-wider">
                <span>{ name } </span>
                <span className="text-gray-500">at </span>
                <span className="text-gray-500">{ venue }</span>
            </div>
        </div>
        <div className="text-xs font-medium">
            <p>10/9/23</p>
            <p>12:00 pm</p>
        </div>
    </div>
  )
}

export default ActivityDetail