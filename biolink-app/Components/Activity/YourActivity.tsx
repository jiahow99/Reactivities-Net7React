import ActivityDetail from "./ActivityDetail"

const YourActivity = () => {
  return (
    <div className="w-5/12 my-5 py-3 px-5 bg-primary h-fit">
        <h1 className="text-xl text-tertiary font-semibold">Your Activities</h1>
        <div className="flex flex-col gap-2 mt-2">
            <ActivityDetail name="Metaverse Speech" venue="New Jersey" />
            <ActivityDetail name="Web 3 Intro" venue="Singapore" />
            <ActivityDetail name="Smart Contract" venue="Malaysia" />
        </div>
    </div>
  )
}

export default YourActivity