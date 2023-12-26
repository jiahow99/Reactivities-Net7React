import Activity from "./Activity"

const Stories = () => {
  return (
    <div className="mt-5 flex flex-col gap-4 pb-5 border-b border-gray-700">
        <h1 className="text-tertiary tracking-wider font-medium px-5">Recent</h1>
        <Activity image={'https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/lgx9iwkaq3ttklc3llhr.png'} username='Wilson' />
        <Activity image={'https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/uhe1lcvyzeuedlti6hh5.png'} username='Robert Dan' />
        <Activity image={'https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/susyt9ln29c5jhws029o.png'} username='Jane' />
    </div>
  )
}

export default Stories