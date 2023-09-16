
const Location = () => {
  return (
    <>
    <form className="border-t border-gray-500 pt-3 duration-200" autoComplete="off">
        <h1 className="text-center text-xl tracking-widest font-semibold">Location Details</h1>
        <div className="flex w-full gap-5 py-4 text-gray-300">
            <div className="flex flex-col w-6/12 gap-2">
                <label htmlFor="venue" className="font-medium tracking-wider">Venue</label>
                <input placeholder="Enter your text..." className="input text-sm" name="venue" type="text"></input>
            </div>

            <div className="flex flex-col w-6/12 gap-2">
                <label htmlFor="venue" className="font-medium tracking-wider">City</label>
                <input placeholder="Enter your text..." className="input text-sm" name="venue" type="text"></input>
            </div>
        </div>
        <div className="flex justify-center">
            <button type="submit" className="create">Save</button>
        </div>
    </form>

    </>
  )
}

export default Location 