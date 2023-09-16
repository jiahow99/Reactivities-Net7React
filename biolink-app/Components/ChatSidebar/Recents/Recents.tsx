import Activity from "./Activity"

const Stories = () => {
  return (
    <div className="mt-5 flex flex-col gap-4 pb-5 border-b border-gray-700">
        <h1 className="text-tertiary tracking-wider font-medium px-5">Recent</h1>
        <Activity />
        <Activity />
        <Activity />
    </div>
  )
}

export default Stories