import Contact from "./Contact"

export const Contacts = () => {
  return (
    <div className="mt-5 flex flex-col gap-4">
        <h1 className="text-tertiary tracking-wider font-medium px-5">Contacts</h1>
        <Contact image={'https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/susyt9ln29c5jhws029o.png'} username='Jane' />
        <Contact image={'https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/lgx9iwkaq3ttklc3llhr.png'} username='Wilson' />
        <Contact image={'https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/uhe1lcvyzeuedlti6hh5.png'} username='Robert Dan' />
    </div>
  )
}
